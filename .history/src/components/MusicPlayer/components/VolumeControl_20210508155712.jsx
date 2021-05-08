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
  width: 30px;
  height: 100px;
  back
  background-color: ${props => props.theme.color.blue}
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
  flex-direction: row;
  align-items: flex-start;
`;

export default VolumeControl;