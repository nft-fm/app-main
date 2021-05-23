import React from 'react'
import styled, { css } from 'styled-components'

const DIAMETER = "213px";
const THICKNESS = "10px";
const COLOR = "#000"; 
const FRONT = "https://www.nftfm.io/static/media/record_player_disk.ee57d9e1.png";
const EDGE_FACES = 80;
const EDGE_FACE_LENGTH = (3.14 * 300 / EDGE_FACES) + "px";
const TURN_TIME ="8s";

const EdgeComponent = styled.div`
  position: absolute;
  color: blue;
  height: ${EDGE_FACE_LENGTH};
  width: 200px;
  background: darken( ${COLOR}, ${props => props.backgroundDarken});
  transform: 
    translateY(${DIAMETER}/2-${EDGE_FACE_LENGTH}/2)
    translateX(${DIAMETER}/2-${THICKNESS}/2)
    rotateZ(360deg/${EDGE_FACES}*${props => props.key + 1}+90)
    translateX(${DIAMETER}/2)
    rotateY(90deg);
`
const DemoImage = () => {
  let divs = [];

  for (let i = 0; i < EDGE_FACES; i++) {
    let backgroundDarken = ((i + 1 - EDGE_FACES / 2) * (i + 1 - EDGE_FACES / 2)) / (EDGE_FACES * EDGE_FACES / 4) * 100 * 0.7;
    divs.push(<EdgeComponent backgroundDarken={backgroundDarken} key={i + 1}/>)
  }
  return (
    <Image>
      <Front/>
      <Edge>
        {divs.map(div => div)}
      </Edge>
      <Back/>
    </Image>
  )
}

const Front = styled.div`
  position: absolute;
  width: ${DIAMETER};
  height: ${DIAMETER};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${COLOR};

  background-image: url(${FRONT});
  background-size: cover;
  transform: translateZ(${THICKNESS}/2);

  &:after {
    content: "";
    position: absolute;
    left: -${DIAMETER}/2;
    bottom: 100%;
    display: block;
    height: ${DIAMETER}/1.5;
    width: ${DIAMETER}*2;
    background: #fff;
    opacity: 0.3;
    animation: shine linear ${TURN_TIME}/2 infinite;
  }
`
const Back = styled(Front)`
  transform: translateZ(-${THICKNESS}/2) rotateY(180deg) scaleX(180deg);
`

const Edge = styled.div``

const Shadow = styled.div`
  position: absolute;
  width: ${DIAMETER};
  height: ${THICKNESS};
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 ${THICKNESS}*5 ${THICKNESS}*5 #000;
  opacity: 0.125;
  transform: rotateX(90deg) translateZ(-${DIAMETER}*1.1) scale(.5);
`

const Image = styled.div`
  display: flex;
  position: relative;
  width: ${DIAMETER};
  height: ${DIAMETER};
  transform-style: preserve-3d;
  animation: rotate3d ${TURN_TIME} linear infinite;
  transition: all .3s;

  margin: auto 0 auto 20%;
  @media only screen and (max-width: 776px) {
    display: none;
  }

  @keyframes rotate3d {
    0% {
      transform: perspective(1000px) rotateY(0deg);
    }

    100% {
      transform: perspective(1000px) rotateY(360deg);
    }
  }

  @keyframes shine {
    0%, 15% {
      transform: translateY(${DIAMETER}*2) rotate(-40deg);
    }
    50% {
      transform: translateY(-${DIAMETER}) rotate(-40deg);
    }
  }
`


export default DemoImage
 
 