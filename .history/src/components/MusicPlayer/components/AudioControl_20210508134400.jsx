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
          <NextIcon onClick={() => {}} />
          <SkipBackwardIcon onClick={() => props.skipTime(10, false)} />
            {!props.isPlaying ?
                <PlayIcon onClick={() => props.playSong()} />
                :
                <PauseIcon onClick={() => props.stopSong()} />
            }
          <SkipForwardIcon onClick={() => props.skipTime(10, true)} />
          <NextIcon onClick={() => {}} />
        </AudioControlSection>
  )
}

const Next = styled(NextIcon)`
& path {
  fill: ${props => props.theme.color.lightgray};
}
`;

const SkipBackward = styled(SkipBackwardIcon)`
  & path {
    fill: ${props => props.theme.color.lightgray};
  }
`;

const SkipForward = styled(SkipForwardIcon)`
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