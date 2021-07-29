import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

/* https://codepen.io/mojo-funk/pen/xxRyxPz */
const Ticker = ({
  duration = 10,
  children,
  height = 30
}) => {

  return (
    <Container duration={duration} height={height}>
        <div className="ticker-wrap">
          <div className="ticker">
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
  @-webkit-keyframes ticker {
    0% {
      -webkit-transform: translate3d(50%, 0, 0);
      transform: translate3d(50%, 0, 0);
      visibility: visible;
    }

    100% {
      -webkit-transform: translate3d(-75%, 0, 0);
      transform: translate3d(-75%, 0, 0);
    }
  }
  @keyframes ticker {
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
    /* width: 55%; */
    overflow: hidden;
    box-sizing: content-box;

    @media only screen and (max-width: 776px) {
      width: 80%;
      min-width: 80vw;
    }

    .ticker {
      display: inline-block;
      white-space: nowrap;
      padding-right: 50%;
      box-sizing: content-box;
      -webkit-animation-iteration-count: infinite; 
              animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
              animation-timing-function: linear;
    -webkit-animation-name: ticker;
            animation-name: ticker;
      -webkit-animation-duration: ${props => props.duration}s;
              animation-duration: ${props => props.duration}s;
    }
  }
`

export default Ticker;