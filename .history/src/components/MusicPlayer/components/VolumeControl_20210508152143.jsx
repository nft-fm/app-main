import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

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
  background-color: ${props => props.theme.}
`;

const Volume = styled(VolumeIcon)`
  width: 20px;
  cursor: pointer;
`;

const VolumeControlSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export default VolumeControl;