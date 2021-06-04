import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const AudioProgressBar = (props) => {
  const [filled, setFilled] = useState(0);
  const [bounds, setBounds] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const invisibleBar = useRef(null);
  const toogle = useRef(null);

  const startToogle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
  };

  const handleToogleMove = (e) => {
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging && bounds) {
      let position = (e.clientX - bounds.left) / bounds.width;
      setFilled(position * 100);
    }
  };

  const stopToogle = (e) => {
    if (!bounds) setBounds(invisibleBar.current.getBoundingClientRect());
    if (isDragging) {
      let position = (e.clientX - bounds.left) / bounds.width;
      props.skipTo(position * 15);
      setIsDragging(false);
    }
  };

  const changePosition = (e) => {
    let position = (e.clientX - bounds.left) / bounds.width;
    props.skipTo(position * 15);
  };

  const checkForToogle = (e) => {
    if (!isDragging) {
      const toogleBounds = toogle.current.getBoundingClientRect();

      if (e.clientX >= toogleBounds.left && e.clientX <= toogleBounds.right)
        startToogle(e);
    }
  };

  const checkForDrag = (e) => {
    if (isDragging) {
      handleToogleMove(e);
    }
  };

  useEffect(() => {
    if (!isDragging && props.time) {
      setFilled((props.time / 15) * 100);
    }
  }, [props]);

  useEffect(() => {
    if (!props.isLoading && !bounds && invisibleBar)
      setBounds(invisibleBar.current.getBoundingClientRect());
  }, [props.isLoading]);

  if (props.isLoading) {
    return (
      <ProgressBar>
        <Toogle width={filled} ref={toogle} />
        <FillBar width={filled} />
      </ProgressBar>
    );
  } else {
    return (
      <ProgressBar>
        <InvisibleBar
          ref={invisibleBar}
          onClick={(e) => {
            changePosition(e);
          }}
          onMouseDown={(e) => {
            checkForToogle(e);
          }}
          onMouseMove={(e) => {
            checkForDrag(e);
          }}
          onMouseUp={(e) => {
            if (isDragging) stopToogle(e);
          }}
          onMouseLeave={(e) => {
            if (isDragging) stopToogle(e);
          }}
        />
        <Toogle width={filled} ref={toogle} />
        <FillBar width={filled} />
      </ProgressBar>
    );
  }
};

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
  height: 12px;
  background-color: ${(props) => props.theme.color.lightgray};
  border-radius: 5px;
  top: -5px;
  left: calc(${(props) => props.width + "%"} - 2px);
`;

const FillBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.blue};
  width: ${(props) => props.width + "%"};
`;

const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 2px;

  margin-top: 6px;
  /* margin-bottom: 14px; */
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.lightgray};
`;

export default AudioProgressBar;
