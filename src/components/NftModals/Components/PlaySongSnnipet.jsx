import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { ReactComponent as PlayIcon } from '../../../assets/img/icons/listen_play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/img/icons/listen_pause.svg';
import loading from "../../../assets/img/loading.gif";
import Swal from "sweetalert2";

import { useRef } from "react";

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const PlaySongSnnipet = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContextRef = useRef();
  const bufferSrcRef = useRef();

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  }

  const startSong = (songFile) => {
    const _gainNode = audioContextRef.current.createGain();
    _gainNode.gain.value = 0.6;
    _gainNode.connect(audioContextRef.current.destination);

    const abSong = toArrayBuffer(songFile);
    const _bufferSrc = audioContextRef.current.createBufferSource();

    audioContextRef.current.decodeAudioData(abSong, async (_buffer) => {
      _bufferSrc.buffer = _buffer;
      _bufferSrc.connect(_gainNode);
      _bufferSrc.start(0);


      bufferSrcRef.current = _bufferSrc;
      playSong();
      setIsLoading(false);
    })
  }

  const playSong = () => {
    console.log("props", props.partialSong);
    if (!props.partialSong && !bufferSrcRef.current) setIsLoading(true);
    else if(!bufferSrcRef.current) startSong(props.partialSong);
    else if (audioContextRef.current.state === 'suspended' && audioContextRef.current) audioContextRef.current.resume();
    else if (audioContextRef.current && audioContextRef.current.start) audioContextRef.current.start(0);
    setIsPlaying(true);
   }
 
   const stopSong = () => {
      setIsPlaying(false);
      if ( audioContextRef.current.suspend) {
        audioContextRef.current.suspend();
      }
   }
  
  useEffect(() => {
    console.log("props partial song changed")
    if (props.partialSong && isLoading) {
      startSong(props.partialSong);
    }
  }, [props.partialSong])

  useEffect(() => {
    const audioCtx = new AudioContext();
    audioContextRef.current = audioCtx;

    return async () => { await audioCtx.close() };
  }, []);

  return (
    <Wrapper>
      {isLoading ? <Loading src={loading}/> :
      isPlaying ?
      <PauseButton onClick={stopSong}/> :
      <PlayButton onClick={playSong}/>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
`;

const Loading = styled.img`
  width: 30px;
  height: 30px;
  & path {
    stroke: ${props => props.theme.color.lightgray};
  }
`;

const PauseButton = styled(PauseIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
`;

const PlayButton = styled(PlayIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      fill: #20a4fc;
    }
  }
`;

export default PlaySongSnnipet;
