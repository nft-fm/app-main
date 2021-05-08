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
      let position =  (e.clientX - bounds.left) / bounds.width;
      setFilled(position * 100);
    }
  }

  const stopToogle = (e) => {
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging) {
      let position =  (e.clientX - bounds.left) / bounds.width;
      props.skipTo(position * props.dur)
       setIsDragging(false);
    }

  }

  const changePosition = (e) => {
    console.log("changing position");
    let position =  (e.clientX - bounds.left) / bounds.width;
    props.skipTo(position * props.dur);
  }

  const checkForToogle = (e) => {
    console.log("clientx", e.clientX);
    console.log("x", toogle.current.getBoundingClientRect())
    if (!isDragging) {
      const toogleBounds = toogle.current.getBoundingClientRect();

      if (e.clientX >= toogleBounds.left &&
          e.clientX <= toogleBounds.right)
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
            <InvisibleBar ref={invisibleBar}
              onClick={(e) => {changePosition(e)}}
              onMouseDown={(e) => {checkForToogle(e)}}
              onMouseMove={(e) => {checkForDrag(e)}}
              onMouseUp={(e) => {if (isDragging) stopToogle(e)}}
              onMouseLeave={(e) => {if (isDragging) stopToogle(e)}}
            />
            <Toogle width={filled} ref={toogle} />
            <FillBar width={filled}/>
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
  width: 6px;
  height: 24px;
  background-color: ${props => props.theme.color.lightgray};
  border-radius: 5px;
  top: -11px;
  left: calc(${props => props.width + "%"} - 2px);
`;


const FillBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${props => props.height + "%"};
  border-radius: 50px;
  background-color: ${props => props.theme.color.lightgray};
`;

const ProgressBar = styled.div`
  position: relative;
  height: 2px;
  width: 760px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue};
`;

const SelectVolume = styled.div`
  display: ${props => props.open ? props.theme.color.lightgray : "none" };
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