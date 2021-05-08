import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import PlayIcon from '../../../assets/img/icons/listen_play.svg';
import PauseIcon from '../../../assets/img/icons/listen_pause.svg'
import SkipForwardIcon from '../../../assets/img/icons/listen_skip_forward.svg'
import SkipBackwardIcon from '../../../assets/img/icons/listen_skip_backward.svg'
import NextIcon from '../../../assets/img/icons/listen_skip.svg'

const MusicPlayer = (props) => {

  return (
        <AudioControlSection>
          <Icon src={NextIcon} onClick={() => {}} />
          <Icon src={SkipBackwardIcon} onClick={() => props.skipTime(10, false)} />
            {!props.isPlaying ?
                <Icon src={PlayIcon} onClick={() => props.playSong()} />
                :
                <Icon src={PauseIcon} onClick={() => props.stopSong()} />
            }
          <Icon src={SkipForwardIcon} onClick={() => props.skipTime(10, true)} />
          <Icon src={NextIcon} onClick={() => {}} />
        </AudioControlSection>
  )
}

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
`;

const Icon = styled.img`
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const AudioControlSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  
  img {
    width: 40px;
  }
`;

export default MusicPlayer;