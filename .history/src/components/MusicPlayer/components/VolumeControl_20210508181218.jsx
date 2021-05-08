import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

const VolumeControl = (props) => {
  const [open, setOpen] = useState(false);

  const [filled, setFilled] = useState(0);
  const [bounds, setBounds] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const invisibleBar = useRef(null);
  const toogle = useRef(null);

  const startToogle = (e) => {
    console.log("START")
    e.stopPropagation()
    e.preventDefault()
    setIsDragging(true);
  }

  const handleToogleMove = (e) => {
    if (isDragging) {
      const _bounds = invisibleBar.current.getBoundingClientRect()
      console.log("those", _bounds);
      let position =  (_bounds.bottom - e.clientY) / _bounds.height;
      setFilled(position * 100);
    }
  }

  const stopToogle = (e) => {
    console.log("STOPPING")
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging) {
      const _bounds = setBounds(invisibleBar.current.getBoundingClientRect());
      let position =  (_bounds.bottom - e.clientY) / _bounds.height;
      props.changeVol(position);
      setIsDragging(false);
    }

  }

  const changePosition = (e) => {
    console.log("changing position");
    let position =  (e.clientY - bounds.top) / bounds.height;
  }

  const checkForToogle = (e) => {
    console.log("clienty", e.clientY);
    console.log("y", toogle.current.getBoundingClientRect())
    if (!isDragging) {
      const toogleBounds = toogle.current.getBoundingClientRect();

      if (e.clientY >= toogleBounds.top && e.clientY <= toogleBounds.bottom)
        startToogle(e);
    }
  
  }

  const checkForDrag = (e) => {
    if (isDragging) {
      console.log("checking for drag")
      handleToogleMove(e);
    }
  }

  useEffect(() => {
    if (!isDragging) 
      setFilled(props.filled)
  }, [props])

  useEffect(() => {
    if (!bounds && invisibleBar) setBounds(invisibleBar.current.getBoundingClientRect());
  }, [])
  return (
        <VolumeControlSection>
          <SelectVolume open={open}>
            <ProgressBar>
              <InvisibleBar ref={invisibleBar}
                onMouseDown={(e) => {checkForToogle(e)}}
                onMouseMove={(e) => {checkForDrag(e)}}
                onMouseUp={(e) => {if (isDragging) stopToogle(e)}}
                onMouseLeave={(e) => {if (isDragging) stopToogle(e)}}
              />
              <Toogle top={filled} ref={toogle} />
              <FillBar filled={filled}/>
            </ProgressBar>
          </SelectVolume>
          <Volume onClick={() => setOpen(!open)}/>
        </VolumeControlSection>
  )
}

const InvisibleBar = styled.div`
  position: absolute;
  z-index: 100;
  width: calc(100% + 5px);
  height: calc(100% + 12px);
  top: -6px;
  left: 0;
  border-radius: 50px;
`;

const Toogle = styled.div`
  position: absolute;
  width: 20px;
  height: 10px;
  background-color: ${props => props.theme.color.lightgray};
  border-radius: 5px;
  left: -1px;
  bottom: calc(${props => props.top + "%"});
`;


const FillBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${props => props.filled + "%"};
  border-radius: 50px;
  background-color: ${props => props.theme.color.lightgray};
`;

const ProgressBar = styled.div`
  position: relative;
  height: 90%;
  width: 10px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue};
`;

const SelectVolume = styled.div`
  position: absolute;
  top: -75px;
  left: 0px;
  width: 30px;
  height: 70px;
  background-color: ${props => props.theme.color.darkBlack};
  border-radius: 5px;

  display: ${props => props.open ? "flex" : "none" };
  flex-direction: column;
  align-items: center;
  justify-content: center;
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