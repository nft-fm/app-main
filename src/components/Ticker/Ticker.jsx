import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

/* https://codepen.io/mojo-funk/pen/xxRyxPz */
const Ticker = ({
  duration = 7.5,
  children,
  height = 30
}) => {
  const [partOneComplete, setPartOneComplete] = useState(false);
  const [partTwoComplete, setPartTwoComplete] = useState(false);

  if (!partOneComplete) {
    const partOneIntervalId = setInterval(() => {
      setPartOneComplete(true);
      clearInterval(partOneIntervalId);
    }, 1000);
  } else if (!partTwoComplete) {
    const partTwoIntervalId = setInterval(() => {
      setPartTwoComplete(true);
      clearInterval(partTwoIntervalId);
    }, 8000);
  }
  return (
    <Container duration={duration} height={height}
      part1={partOneComplete}
      part2={partTwoComplete}
    >
        <div className="ticker-wrap">
          <div className="ticker1">
            <div className="ticker__item">
              {children}
            </div>
          </div>
          <div className="ticker2">
            <div className="ticker__item">
              {children}
            </div>
          </div>
          <div className="ticker3">
            <div className="ticker__item">
              {children}
            </div>
          </div>
        </div>
    </Container>
  )
}


const Container = styled.div`
  width: 250px;
  @media only screen and (max-width: 776px) {
    width: 80%;
    min-width: 80vw;
  }

  @keyframes ticker2 {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
    100% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: none;
    }
  }
  
  @keyframes ticker3 {
    0% {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      visibility: visible;
    }

    100% {
      -webkit-transform: translate3d(-90%, 0, 0);
      transform: translate3d(-90%, 0, 0);
    }
  }

  .ticker-wrap {
    width: 250px;
    overflow: hidden;
    box-sizing: content-box;

    @media only screen and (max-width: 776px) {
      width: 80%;
      min-width: 80vw;
    }

    .ticker1 {
      display: inline-block;
      box-sizing: content-box;
      ${props => props.part1 && css`
        display: none;
      `}
    }

    .ticker2 {
      display: inline-block;
      white-space: nowrap;
      padding-right: 50%;
      box-sizing: content-box;
      animation: ticker2;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      animation-delay: 1s;
      animation-duration: ${props => props.duration}s;
      ${props => ((props.part1 && props.part2) || !props.part1) && css`
        display: none;
      `}
    }

    .ticker3 {
      display: inline-block;
      white-space: nowrap;
      padding-right: 50%;
      box-sizing: content-box;
      animation-delay: 0s;
      -webkit-animation-iteration-count: infinite; 
              animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
              animation-timing-function: linear;
    -webkit-animation-name: ticker3;
            animation-name: ticker3;
      -webkit-animation-duration: ${props => props.duration}s;
              animation-duration: ${props => props.duration}s;
      visibility: hidden;
      ${props => !props.part2 && css`
        display: none;
      `}
    }
  }
`

export default Ticker;