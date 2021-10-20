import React from "react";
import styled from "styled-components";

import { ReactComponent as PlayIcon } from '../../../assets/img/icons/listen_play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/img/icons/listen_pause.svg'
import { ReactComponent as NextIcon } from '../../../assets/img/icons/listen_skip.svg'

const AudioControl = (props) => {
  return (
        <AudioControlSection>
          {/*<Prev src={NextIcon} onClick={() => {props.setPrev()}} />*/}
          <SkipBackward onClick={() => {if (!props.isLoading)props.skipTime(10, false)}} />
            {!props.isPlaying ?
                <Play onClick={() => {if (!props.isLoading) props.playSong()}} />
                :
                <Pause onClick={() => {if (!props.isLoading) props.stopSong()}} />
            }
          <SkipForward onClick={() =>  {if (!props.isLoading) props.skipTime(10, true)}} />
          {/*<Next onClick={() => props.setNext()} />*/}
        </AudioControlSection>
  )
}

const SkipForward = styled(NextIcon)`
cursor: pointer;
  width: 18px;
  height: 18px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
  /* &::before {
    content: "\e905";
  } */
`;

const SkipBackward = styled(NextIcon)`
cursor: pointer;
  width: 18px;
  height: 18px;
  transform: scaleX(-1);
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Pause = styled(PauseIcon)`
cursor: pointer;
  width: 36px;
  height: 36px;
  margin: 0 4px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Play = styled(PlayIcon)`
cursor: pointer;
  width: 36px;
  height: 36px;
  margin: 0 4px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const AudioControlSection = styled.div`
  width: 10vw;
  min-width: 140px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: center;
  height: 100%;
  margin-left: 10px;
`;

export default AudioControl;