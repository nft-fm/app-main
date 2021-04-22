import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const Question = (props) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);

  const content = useRef(null);

  const toggleActive = () => {
    setActive(!active);
    setHeight(height ? 0 : content.current.scrollHeight)
  }

  return (
    <FaqCard>
      <FaqQuestion onClick={toggleActive}>{props.question}
        <Toggle>
          <ExpandMoreIcon style={active ? { transform: 'rotate(180deg)' } : null} />
        </Toggle>
      </FaqQuestion>
      <FaqBody active={active} ref={content} height={height}>
        <FaqDivider />
        <FaqAnswer >{props.answer}</FaqAnswer>
      </FaqBody>
    </FaqCard>
  );
};

const FaqBody = styled.div`
display: flex;
flex-direction: column;
max-height: 0px;
transition: max-height 0.2s ease ;
overflow: hidden;
width: calc(100% - 40px);
${props => props.active && css` 
  max-height: ${props.height}px;
  `};
`

const Toggle = styled.div`
  position: absolute;
  right: -50px;
  margin-top: -3px;
  width: 50px;
  height: 50px;
  &> svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }
`

const FaqAnswer = styled.p`
  font-size: 20px;
  width: 100%;
  text-align: left;
`;

const FaqDivider = styled.div`
  width: 80%;
  margin: 20px auto 10px auto;
  border-bottom: 1px solid rgba(256,256,256,0.6);
`;

const FaqQuestion = styled.h2`
  font-size: 30px;
  margin: 0px 50px 0 20px;
  position: relative;
  width: calc(100% - 70px);
  display: flex;
  text-align: left;
  cursor: pointer;
`;

const FaqCard = styled.div`
  margin: 15px;
  border: 2px solid rgba(256, 256, 256, 0.5);
  border-radius: 2px;
  background-color: rgba(180, 180, 180, 0.3);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 20px;
`;
