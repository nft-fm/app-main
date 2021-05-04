import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import loading from '../../assets/img/loading.gif';
import PlayIcon from '../../assets/img/icons/listen_play.svg';
import PauseIcon from '../../assets/img/icons/listen_pause.svg'
import SkipForward from '../../assets/img/icons/listen_skip_forward.svg'
import SkipBackward from '../../assets/img/icons/listen_skip_backward.svg'
import xIcon from '../../assets/img/icons/x.svg';
import ProgressBar from "./components/ProgressBar";

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const MusicPlayer = (props) => {
  const { nft, setNextNft, setPrevNft, exitPlayer } = props;
  const [buffer, setBuffer] = useState();
  const [bufferSrc, setBufferSrc] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState(0);
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
     axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
         .then((_songFile) => {
            console.log(_songFile);
           const abSong = toArrayBuffer(_songFile.data.Body.data);
           const _bufferSrc = audioContextRef.current.createBufferSource();
           audioContextRef.current.decodeAudioData(abSong, (_buffer) => {
                 _bufferSrc.buffer = _buffer;
                 _bufferSrc.connect(audioContextRef.current.destination);
                // source.loop = true;
                  setStartTime(_bufferSrc.context.currentTime);
                 _bufferSrc.start(_bufferSrc.context.currentTime);
                 setBuffer(_buffer);
                 setDur(_bufferSrc.buffer.duration);
                 setBufferSrc(_bufferSrc);
                 setIsPlaying(true);
                 setIsLoading(false);
             }, (e) => { console.log("Error: ", e.err); })
         })
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

  const skipTime = (howMuch, forward) => {
   const currentTime = bufferSrc.context.currentTime;
   howMuch = forward ? howMuch :  -howMuch;
   let time = currentTime - startTime + howMuch;
   time = time < 0 ? 0 : time;
   bufferSrc.stop(currentTime);
   bufferSrc.disconnect();

   let newBufferSrc = audioContextRef.current.createBufferSource();
   newBufferSrc.buffer = buffer;
   newBufferSrc.connect(audioContextRef.current.destination);
   newBufferSrc.start(currentTime, time);

   const {computedSecond, computedMinute} = timeStr(counter + howMuch >= 0 ? counter + howMuch : 0);
   setMinute(computedMinute);
   setSecond(computedSecond);
   setFilled((counter + howMuch >= 0 ? counter + howMuch : 0) * 100 / dur)
   setCounter(counter + howMuch >= 0 ? counter + howMuch : 0);
   setBufferSrc(newBufferSrc);
   setStartTime(startTime - howMuch >= 0 ? startTime - howMuch : 0);
  }

  const timeStr = (time) => {
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
    getSong();
  }, [nft]);

  useEffect(() => {
    let intervalId;

    if (isPlaying && counter < dur) {
      intervalId = setInterval(() => {
        console.log(bufferSrc.context.currentTime);
        const {computedSecond, computedMinute} = timeStr(counter);
        setSecond(computedSecond);
        setMinute(computedMinute);
        setFilled((counter + 1) * 100 / dur)
        setCounter(counter => counter + 1);
        if (counter >= dur) clearInterval(intervalId);
      }, 1000)
    }

    return () => {if (intervalId) clearInterval(intervalId)};
  }, [isPlaying, counter])

  const Duration = () => {
    const {computedSecond, computedMinute} = timeStr(parseInt(dur.toFixed(0)))
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
          <TrackInfoWrapper>
            {TrackInfo()}
          </TrackInfoWrapper>
         <AudioControlSection>
           <img src={SkipBackward} onClick={() => skipTime(10, false)} />
             {!isPlaying ?
                 <img src={PlayIcon} onClick={() => playSong()} />
                 :
                 <img src={PauseIcon} onClick={() => stopSong()} />
             }
           <img src={SkipForward} onClick={() => skipTime(10, true)} />
         </AudioControlSection>
         <AudioProgressionSection>
           <Counter>{minute}:{second}</Counter>
           <ProgressBar filled={filled} skipTime={skipTime} dur={dur} counter={counter}/>
           {Duration()}
         </AudioProgressionSection>
     </Wrapper>
  )
}

const Counter = styled.div`
  width: 60px;

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
  max-width: 50px;
  height: 50px;
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
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  background-color: #262626;
  border-top: 1px solid #232323;
`;
export default MusicPlayer;