import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";


const MusicPlayer = (props) => {
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
           <ProgressBar>
            <InvisibleBar ref={invisibleBar}
              onClick={(e) => {changePosition(e)}}
              onMouseDown={(e) => {checkForToogle(e)}}
              onMouseMove={(e) => {checkForDrag(e)}}
              onMouseUp={(e) => {if (isDragging) stopToogle(e)}}
              onMouseLeave={(e) => {if (isDragging) stopToogle(e)}}
            />
            <Toogle width={filled} ref={toogle} />
             <FillBar width={filled}/>
           </ProgressBar>
  )
}

const InvisibleBar = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 50px;
`;

const Toogle = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: ${props => props.theme.color.blue};
  border-radius: 50px;
  top:-2.5px;
  left: calc(${props => props.width + "%"} - 10px);
`;


const FillBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 50px;
  background-color: ${props => props.theme.color.blue};
  width: ${props => props.width + "%"}
`;

const ProgressBar = styled.div`
  position: relative;
  height: 20px;
  width: 500px;
  border-radius: 50px;
  background-color: ${props => props.theme.color.lightgray};
`;

export default MusicPlayer;