import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import VolumeIcon from '../../../assets/img/icons/listen_play.svg';
import PauseIcon from '../../../assets/img/icons/listen_pause.svg'
import SkipForwardIcon from '../../../assets/img/icons/listen_skip_forward.svg'
import SkipBackwardIcon from '../../../assets/img/icons/listen_skip_backward.svg'
import NextIcon from '../../../assets/img/icons/listen_skip.svg'

const VolumeControl = (props) => {

  return (
        <VolumeControlSection>
            <SelectVolume />
            <Volume />
        </VolumeControlSection>
  )
}

const SelectVolume = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 60px;
`;

const Volume = styled(VolumeIcon)`
  width: 20px;
`;

const VolumeControlSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export default VolumeControl;