import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import loading from '../../assets/img/loading.gif';
import xIcon from '../../assets/img/icons/x.svg';
import ProgressBar from "./components/ProgressBar";
import AudioControl from "./components/AudioControl";
import VolumeControl from "./components/VolumeControl";

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const MusicPlayer = (props) => {
  const { nft, setNextNft, setPrevNft, exitPlayer } = props;
  const [buffer, setBuffer] = useState();
  const [bufferSrc, setBufferSrc] = useState();
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

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContextRef = useRef();

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  }

  const getSong = async () => {
     if (bufferSrc) {
      setIsLoading(true);
      bufferSrc.stop();
      bufferSrc.disconnect();
     }
     axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
         .then((_songFile) => {
            startSong(_songFile);  
          }, (e) => { console.log("Error: ", e.err); })
  }

  const startSong = (_songFile) => {
    const _gainNode = audioContextRef.current.createGain();
    _gainNode.gain.value = 0.7; // setting it to 70%
    _gainNode.connect(audioContextRef.current.destination);
    const abSong = toArrayBuffer(_songFile.data.Body.data);
    const _bufferSrc = audioContextRef.current.createBufferSource();
    audioContextRef.current.decodeAudioData(abSong, (_buffer) => {
      _bufferSrc.buffer = _buffer;
      _bufferSrc.connect(_gainNode);
      setStartTime(_bufferSrc.context.currentTime);
      _bufferSrc.start(_bufferSrc.context.currentTime);
      setBuffer(_buffer);
      setDur(_bufferSrc.buffer.duration);
      setBufferSrc(_bufferSrc);
      setIsPlaying(true);
      setIsLoading(false);
      setGainNode(_gainNode);
      props.setPrevBuffer(_songFile);
    });
  }

  const playSong = () => {
   if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
   else audioContextRef.current.start(0);
   setIsPlaying(true);
  }

  const stopSong = () => {
     setIsPlaying(false);
     if ( audioContextRef.current.suspend) {
       audioContextRef.current.suspend();
     }
  }

  const skipTo = (time) => {
   const currentTime = bufferSrc.context.currentTime;
   time = time < 0 ? 0 : time;
   time = time > dur ? dur : time;
   bufferSrc.stop();
   bufferSrc.disconnect();

   let newBufferSrc = audioContextRef.current.createBufferSource();
   newBufferSrc.buffer = buffer;
   newBufferSrc.connect(audioContextRef.current.destination);
   newBufferSrc.start(currentTime, time);

   const {computedSecond, computedMinute} = timeStr(time);
   setMinute(computedMinute);
   setSecond(computedSecond);
   setFilled(time * 100 / dur)
   setCounter(time);
   setBufferSrc(newBufferSrc);
   setStartTime(currentTime - time);
  }

  const skipTime = (howMuch, forward) => {
    howMuch = forward ? howMuch : -howMuch;
    const currentTime = bufferSrc.context.currentTime;
    skipTo(currentTime - startTime + howMuch);
  }

  const changeVol = (howMuch) => {
    howMuch = howMuch < 0.1 ? 0 : howMuch > 1 ? 1 : howMuch;
    gainNode.gain.value = howMuch;
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
    if (!props.nextBuffer)
      getSong();
    else
      startSong(props.nextBuffer)
  }, [nft]);

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        let time = bufferSrc.context.currentTime - startTime;
        if (time >= dur) {
          time = dur;
          stopSong();
          clearInterval(intervalId);
        }
        const {computedSecond, computedMinute} = timeStr(time);
        setSecond(computedSecond);
        setMinute(computedMinute);
        setFilled(time * 100 / dur)
        setCounter(time);
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