import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import loading from '../../assets/img/loading.gif';
import ProgressBar from "./components/ProgressBar";
import AudioControl from "./components/AudioControl";
import VolumeControl from "./components/VolumeControl";
import Swal from "sweetalert2";

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const MusicPlayer = (props) => {
  const { nft, nfts, setNftsCallback, setNextNft, setPrevNft, exitPlayer } = props;
  const [buffer, setBuffer] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [gainNode, setGainNode] = useState();
  const [volume, setVolume] = useState(0.7);
  const [dur, setDur] = useState(0);
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [counter, setCounter] = useState(0);
  const [filled, setFilled] = useState(0);
  const [songFullyLoaded, setSongFullyLoaded] = useState(false);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContextRef = useRef();
  const volumeRef = useRef();
  const bufferSrcRef = useRef();
  const fullBufferSrc = useRef();

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  }

  const getPartialSong = async () => {
    if (bufferSrcRef.current) {
      setIsLoading(true);
      bufferSrcRef.current.stop();
      bufferSrcRef.current.disconnect();
    }
    axios.post("api/nft-type/getPartialSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
        .then((songFile) => {
            console.log("__________________________")
            console.log("GOT PARTIAL SONG");
            startPartialSong(songFile);
    }, (e) => { console.log("Error: ", e.err); })
     
  }

  const startPartialSong = async (songFile) => {
    //Set volume
    const _gainNode = audioContextRef.current.createGain();
    _gainNode.gain.value = volume;
    _gainNode.connect(audioContextRef.current.destination);

    const abSong = toArrayBuffer(songFile.data.Body.data);
    const _bufferSrc = audioContextRef.current.createBufferSource();

    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;
      _bufferSrc.connect(_gainNode);
      _bufferSrc.start(_bufferSrc.context.currentTime);

      //Prepare callback for when buffer finishes and checks if full song is loaded
      //If not, the old buffer will be paused
      _bufferSrc.onended = (e) => {
        if (fullBufferSrc && fullBufferSrc.current) {
          startRemainingSong(e);
          _bufferSrc.stop();
          _bufferSrc.disconnect();
        }
      }
      setStartTime(_bufferSrc.context.currentTime);
      console.log("STARTED SONG");
      setBuffer(_buffer);
      setDur(nft.dur ? nft.dur : 80000);
      bufferSrcRef.current = _bufferSrc;
      playSong();
      setIsLoading(false);
      volumeRef.current = _gainNode;

      //As It starts playing, fetch full song
      await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
            .then((fullFile) => {
            console.log("GOT FULL SONG");
            prepareRemainingSong(fullFile, _bufferSrc);
            props.setCurrentBuffer(fullFile);
          }, (e) => {
            Swal.fire({
              title: 'Sorry, something went wrong',
              text: 'Please reload the page',
              icon: 'error'
            })
            console.log("Error: ", e.err);
          })
      props.fetchPrevNext();
    })
  }

  const startRemainingSong = (data) => {
    console.log("CHECKING FOR REMAINING SONG", data);
    if (fullBufferSrc && fullBufferSrc.current) {
      console.log("NEW SRC STARTS");
      let fullBuffer = fullBufferSrc.current;
      fullBuffer.connect(volumeRef.current);
      fullBuffer.start(0, data.currentTarget.buffer.duration);
      playSong();
    }
    else {
     stopSong();
    }
  }

  const prepareRemainingSong = async (songFile, partialBufferSrc) => {
    const currentTime = partialBufferSrc.context.currentTime;
    const fullTime = partialBufferSrc.buffer.duration;
    console.log("PREPARING NEW BUFFER")
    const abSong = toArrayBuffer(songFile.data.Body.data);
    const _bufferSrc = audioContextRef.current.createBufferSource();
    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;

      setSongFullyLoaded(true)
      fullBufferSrc.current = _bufferSrc;
      bufferSrcRef.current = _bufferSrc;
      //Verify If audio already reached end of preloaded buffer
      //Else the new buffer will only start by the event set in the partialBuffer
      if (fullTime <= currentTime) {
        console.log("STARTING NEW BUFFER AFTER STOPPED")
        _bufferSrc.start(0, fullTime);
        playSong();

        fullBufferSrc.current = _bufferSrc;
        setBuffer(_buffer);
        setDur(_bufferSrc.buffer.duration);
        setIsLoading(false);
      }
      props.fetchPrevNext();
      props.setCurrentBuffer(songFile);
    })
  }

  const startSong = async (songFile) => {
    if (bufferSrcRef.current) {
      bufferSrcRef.current.stop();
      bufferSrcRef.current.disconnect();
     }
    const _gainNode = audioContextRef.current.createGain();
    _gainNode.gain.value = volume;
    _gainNode.connect(audioContextRef.current.destination);
    const abSong = toArrayBuffer(songFile.data.Body.data);
    const _bufferSrc = audioContextRef.current.createBufferSource();
    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;
      _bufferSrc.connect(_gainNode);
      setStartTime(_bufferSrc.context.currentTime);
      _bufferSrc.start(_bufferSrc.context.currentTime);
      setBuffer(_buffer);
      setDur(_bufferSrc.buffer.duration);
      bufferSrcRef.current = _bufferSrc;
      playSong();
      setIsLoading(false);
      volumeRef.current = _gainNode;
      props.fetchPrevNext();
      props.setCurrentBuffer(songFile);
    });
  }

  const playSong = () => {
   if (audioContextRef.current.state === 'suspended' && audioContextRef.current) audioContextRef.current.resume();
   else if (audioContextRef.current && audioContextRef.current.start) audioContextRef.current.start(0);
   setIsPlaying(true);
  }

  const stopSong = () => {
    console.log("STOP SONG");
     setIsPlaying(false);
     if ( audioContextRef.current.suspend) {
       audioContextRef.current.suspend();
     }
  }

  const skipTo = (time) => {
    console.log("bufferSrcRef", bufferSrcRef);
   const originalBuffer = bufferSrcRef.current;
   const currentTime = originalBuffer.context.currentTime;
   time = time < 0 ? 0 : time;
   time = time > dur ? dur : time;
   bufferSrcRef.current.stop();
   bufferSrcRef.current.disconnect();

   let newBufferSrc = audioContextRef.current.createBufferSource();
   newBufferSrc.buffer = originalBuffer.buffer;
   newBufferSrc.connect(volumeRef.current);
   newBufferSrc.start(currentTime, time);

   const {computedSecond, computedMinute} = timeStr(time);
   setMinute(computedMinute);
   setSecond(computedSecond);
   setFilled(time * 100 / dur)
   setCounter(time);
   bufferSrcRef.current = newBufferSrc;
   setStartTime(currentTime - time);
  }

  const skipTime = (howMuch, forward) => {
    howMuch = forward ? howMuch : -howMuch;
    const currentTime = bufferSrcRef.current.context.currentTime;
    skipTo(currentTime - startTime + howMuch);
  }

  const changeVol = (howMuch) => {
    howMuch = howMuch < 0.1 ? 0 : howMuch > 1 ? 1 : howMuch;
    volumeRef.current.gain.value = howMuch;
    setVolume(howMuch);
  }

  const timeStr = (time) => {
    time = Math.floor(time);
    const secondCounter = time % 60;
    const minuteCounter = Math.floor(time / 60);

    const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
    const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
    return ({computedMinute, computedSecond})
  }

  useEffect(() => {
    const audioCtx = new AudioContext();
    // Store context and start suspended
    audioContextRef.current = audioCtx;
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    if (!nft.buffer) {
      getPartialSong();
    } 
    else {
      //Song Fully Preloaded
      startSong(nft.buffer);
    }
  }, [nft]);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        let time = bufferSrcRef.current.context.currentTime - startTime;
        if (time >= dur) {
          time = dur;
          stopSong();
          setNextNft();
          clearInterval(intervalId);
        }
        else {
          const {computedSecond, computedMinute} = timeStr(time);
          setSecond(computedSecond);
          setMinute(computedMinute);
          setFilled(time * 100 / dur)
          setCounter(time);
        }
      }, 1000 / 30)
    }

    return () => {if (intervalId) clearInterval(intervalId)};
  }, [isPlaying, counter])

  const Duration = () => {
    const {computedSecond, computedMinute} = timeStr(dur)
    return <Counter>{computedMinute}:{computedSecond}</Counter>
  }

  const TrackInfo = () => {
    return (
      <TrackInfoWrapper>
        <Image src={nft.imageUrl} />
        <TitleAndArtistSection>
          <Title>{`${nft.title}`}</Title>
          <Artist>{`${nft.artist}`}</Artist>
        </TitleAndArtistSection>
      </TrackInfoWrapper>
    )
  }

  if (isLoading)
    return (
      <Wrapper>
        <Image src={loading} />
      </Wrapper>
    )

  return (
     <Wrapper>
       <AudioControl skipTime={skipTime}
                     playSong={playSong}
                     stopSong={stopSong}
                     setNext={setNextNft}
                     setPrev={setPrevNft}
                     isPlaying={isPlaying}/>
        <AudioProgressionSection>
          <Counter>{minute}:{second}</Counter>
          <ProgressBar filled={filled} skipTo={skipTo} dur={dur}/>
          {Duration()}
        </AudioProgressionSection>
        <VolumeControl filled={volume * 100}
                       changeVol={changeVol}/>
        <TrackInfoWrapper>
          {TrackInfo()}
        </TrackInfoWrapper>
    </Wrapper>
  )
}

const Counter = styled.div`
  width: 60px;
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.color.lightgray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AudioProgressionSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;


const AudioControlSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  
  img {
    width: 40px;
  }
`;

const ExitIcon = styled.img`
  filter: opacity(25%);
  backgroundColor: #5c5c5c;
  height: 35px;
  width: 35px;
  cursor: pointer;
`;

const DummyContainerWide = styled.div`
  width: 30%;
`;

const DummyContainer = styled.div`
  width: 5px;
`;

const Artist = styled.div`
  color: #5c5c5c;
`;

const Title = styled.div`
  color: white;
`;

const TitleAndArtistSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Image = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 5px;
  & path {
    stroke: ${props => props.theme.color.lightgray};
  }
`;

const TrackInfoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    margin-left: 14px;
    display: flex;
    flex-direction: Row;
    color: white;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: ${props => props.theme.color.darkBlack};
`;
export default MusicPlayer;