import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

const VolumeControl = (props) => {
  return (
        <VolumeControlSection>
            <Volume />
            <SelectVolume />
        </VolumeControlSection>
  )
}

const SelectVolume = styled.div`
  width: 30px;
  height: 100px;
  background-color: ${props => props.theme.color.blue}
  border: 2px solid yellow
  border-radius: 5px;
`;

const Volume = styled(VolumeIcon)`
  width: 20px;
  cursor: pointer;
`;

const VolumeControlSection = styled.div`
  position: relative;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default VolumeControl;