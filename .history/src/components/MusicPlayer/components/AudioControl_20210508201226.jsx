import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as PlayIcon } from '../../../assets/img/icons/listen_play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/img/icons/listen_pause.svg'
import { ReactComponent as SkipForwardIcon } from '../../../assets/img/icons/listen_skip_forward.svg'
import { ReactComponent as SkipBackwardIcon } from '../../../assets/img/icons/listen_skip_backward.svg'
import { ReactComponent as NextIcon } from '../../../assets/img/icons/listen_skip.svg'

const AudioControl = (props) => {
  return (
        <AudioControlSection>
          <Prev src={NextIcon} onClick={() => {props.setPrev()}} />
          <SkipBackward onClick={() => props.skipTime(10, false)} />
            {!props.isPlaying ?
                <Play onClick={() => props.playSong()} />
                :
                <Pause onClick={() => props.stopSong()} />
            }
          <SkipForward onClick={() => props.skipTime(10, true)} />
          <Next onClick={() => props.setNext()} />
        </AudioControlSection>
  )
}

const SkipForward = styled(SkipForwardIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const SkipBackward = styled(SkipBackwardIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Next = styled(NextIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Prev = styled(NextIcon)`
width: 20px;
height: 20px;
transform: rotate(180deg);
& path {
  fill: ${props => props.theme.color.lightgray};
}
`;

const Pause = styled(PauseIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Play = styled(PlayIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

/*const Next = styled(NextIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const SkipBackward = styled(SkipBackwardIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const SkipForward = styled(SkipForwardIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Pause = styled(PauseIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Play = styled(PlayIcon)`
  width: 20px;
  height: 20px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;*/

const Icon = styled.img`
  width: 24px;
  height: 24px;
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const AudioControlSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export default AudioControl;