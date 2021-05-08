import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as PlayIcon } from '../../../assets/img/icons/listen_play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/img/icons/listen_pause.svg'
import { ReactComponent as SkipForwardIcon } from '../../../assets/img/icons/listen_skip_forward.svg'
import { ReactComponent as SkipBackwardIcon } from '../../../assets/img/icons/listen_skip_backward.svg'
import { ReactComponent as NextIcon } from '../../../assets/img/icons/listen_skip.svg'

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

const Skio = styled(PlaySkio)`
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Pause = styled(PauseIcon)`
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const Play = styled(PlayIcon)`
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