import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as VolumeIcon } from '../../../assets/img/icons/listen_volume.svg';

const VolumeControl = (props) => {
  const [open, setOpen] = useState(false);

  const [filled, setFilled] = useState(0);
  const [bounds, setBounds] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [startDragging, setStartDraggging] = useState(0);
  const invisibleBar = useRef(null);
  const toogle = useRef(null);

  const startToogle = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsDragging(true);
    setStartDraggging(e.clientX);
  }

  const handleToogleMove = (e) => {
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging && bounds) {
      let position =  (e.clientY - bounds.left) / bounds.width;
      setFilled(position * 100);
    }
  }

  const stopToogle = (e) => {
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging) {
      let position =  (e.clientY - bounds.top) / bounds.height;
      props.skipTo(position * props.dur)
       setIsDragging(false);
    }

  }

  const changePosition = (e) => {
    console.log("changing position");
    let position =  (e.clientY - bounds.top) / bounds.height;
    props.skipTo(position * props.dur);
  }

  const checkForToogle = (e) => {
    console.log("clientx", e.clientX);
    console.log("x", toogle.current.getBoundingClientRect())
    if (!isDragging) {
      const toogleBounds = toogle.current.getBoundingClientRect();

      if (e.clientY >= toogleBounds.left &&
          e.clientY <= toogleBounds.right)
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
                onClick={(e) => {changePosition(e)}}
                onMouseDown={(e) => {checkForToogle(e)}}
                onMouseMove={(e) => {checkForDrag(e)}}
                onMouseUp={(e) => {if (isDragging) stopToogle(e)}}
                onMouseLeave={(e) => {if (isDragging) stopToogle(e)}}
              />
              <Toogle top={filled} ref={toogle} />
              <FillBar height={filled}/>
            </ProgressBar>
          </SelectVolume>
          <Volume onClick={() => setOpen(!open)}/>
        </VolumeControlSection>
  )
}

const InvisibleBar = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: calc(100% + 12px);
  top: -6px;
  left: 0;
  border-radius: 50px;
`;

const Toogle = styled.div`
  position: absolute;
  width: 4px;
  height: 2px;
  background-color: ${props => props.theme.color.lightgray};
  border-radius: 5px;
  left: -1px;
  top: calc(${props => props.top + "%"} - 1px);
`;


const FillBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%
  height: ${props => props.height + "%"};
  border-radius: 50px;
  background-color: ${props => props.theme.color.lightgray};
`;

const ProgressBar = styled.div`
  position: relative;
  height: 90%;
  width: 2px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue};
`;

const SelectVolume = styled.div`
  position: absolute;
  top: -75px;
  left: 0px;
  width: 30px;
  height: 70px;
  background-color: ${props => props.theme.color.lightgray};
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