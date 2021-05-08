import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

const VolumeControl = (props) => {
  const [open, setOpen] = useState(true);
  return (
        <VolumeControlSection>
          <SelectVolume open={open}/>
          <Volume onClick={() => setSelect(!select)}/>
        </VolumeControlSection>
  )
}

const SelectVolume = styled.div`
  display: ${props => props.open ? "yellow" : none };
  position: absolute;
  top: -75px;
  left: 0px;
  width: 30px;
  height: 70px;
  background-color: yellow;
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