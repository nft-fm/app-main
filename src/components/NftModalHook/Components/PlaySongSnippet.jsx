
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as PlayIcon } from "../../../assets/img/icons/listen_play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/img/icons/listen_pause.svg";
import loading from "../../../assets/img/loading.gif";

import { useRef } from "react";
import { usePlaylistConsumer } from "../../../contexts/Playlist";

import AudioProgressBar from "./ProgressBar";
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const PlaySongSnippet = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(0);

  const audioRef = useRef();

  const startSong = (songUrl) => {
    let audio = new Audio(songUrl);
    audio.onended = () => {
      setIsPlaying(false);
      setTime(0);
      audio.currentTime = 0;
    };

    audio.oncanplay = () => {
      let _isLoading;
      setIsLoading((currentState) => {
        _isLoading = currentState;
        return currentState;
      });

      if (_isLoading) {
        setIsLoading(false);
        setIsPlaying(true);
        audio.play();
      }
      setCanPlay(true);
    };

    audioRef.current = audio;
  };

  const skipTo = (pos) => {
    audioRef.current.currentTime = Math.floor(pos);
    setTime(Math.floor(pos));
  };

  const playSong = () => {
    if (canPlay) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const stopSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (props.partialSong) {
      startSong(props.partialSong);
    }
  }, [props.partialSong]);

  useEffect(() => {
    let intervalId;
    if (isPlaying && audioRef.current) {
      intervalId = setInterval(() => {
        let _time = audioRef.current.currentTime || time;
        if (_time >= 30) {
          clearInterval(intervalId);
        } else {
          setTime(_time);
        }
      }, 1);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, time]);

  useEffect(() => {
    return () => {
      if (audioRef && audioRef.current) audioRef.current.pause();
    };
  }, []);
  return (
    <Wrapper>
      <AudioProgressBar time={time} skipTo={skipTo} />
      {isLoading ? (
        <Loading src={loading} />
      ) :
      
      <PlayButton aria-label="play button" onClick={isPlaying ? stopSong : playSong} >

      {isPlaying ? (
        <PauseSVG />
      ) : (
        <PlaySVG />
      )}
      </PlayButton>
      }
    </Wrapper>
  );
};

const PlayButton = styled.button`
background-color: transparent;
padding: 0px;
border: none;
width: min-content;
height: min-content;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Loading = styled.img`
  width: 24px;
  height: 24px;
  & path {
    stroke: ${(props) => props.theme.color.lightgray};
  }
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PauseSVG = styled(PauseIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
  margin-top: 10px;
`;

const PlaySVG = styled(PlayIcon)`
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
  margin-top: 10px;
  @media only screen and (max-width: 776px) {
    margin-top: 0;
  }
`;

export default PlaySongSnippet;