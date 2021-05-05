import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const MusicPlayer = (props) => {
  const [filled, setFilled] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startToogle = (e) => {
    console.log("startToogle");
    e.stopPropagation()
    e.preventDefault()
    setIsDragging(true);
  }

  const changePosition = (e) => {
    console.log("changing position");
    let bounds =  e.target.getBoundingClientRect();
    let position =  (e.clientX - bounds.left) / bounds.width;
    props.skipTo(position * props.dur);
  }

  useEffect(() => {
    setFilled(props.filled)
  }, [props])
  return (
           <ProgressBar>
             <InvisibleBar onClick={(e) => changePosition(e)}/>
             <Toogle width={filled} onClick={(e) => startToogle(e)}/>
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
  z-index: 101;
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