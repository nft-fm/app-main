import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

const VolumeControl = (props) => {
  const [select, setSelect] = useState(true);
  return (
        <VolumeControlSection>
          <SelectVolume />
          <Volume />
        </VolumeControlSection>
  )
}

const SelectVolume = styled.div`
  position: absolute;
  top: -70px;
  left: 0px;
  width: 30px;
  height: 70px;
  background-color: yellow;
  border: 2px solid green;
  border-radius: 5px;
`;

const Volume = styled(VolumeIcon)`
  width: 20px;
  cursor: pointer;
`;

const VolumeControlSection = styled.div`
  position: relative;
  border: 2px solid yellow;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default VolumeControl;