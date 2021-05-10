import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as down_arrow } from "../../../assets/img/icons/down_arrow.svg";

//what is happening
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const Question = (props) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);

  const content = useRef(null);

  const toggleActive = () => {
    setActive(!active);
    setHeight(height ? 0 : content.current.scrollHeight);
  };

  return (
    <FaqCard onClick={toggleActive}>
      <FaqQuestion >
        <QuestionText>
          {props.question}

        </QuestionText>
        <LockIcon style={active ? { transform: 'rotate(180deg)' } : null} />
        {/* <Toggle>
          <ExpandMoreIcon src={demoImage}style={active ? { transform: 'rotate(180deg)' } : null} />
        </Toggle> */}
      </FaqQuestion>
      <FaqBody active={active} ref={content} height={height}>
        <FaqDivider />
        <FaqAnswer>{props.answer}</FaqAnswer>
      </FaqBody>
    </FaqCard>
  );
};

const QuestionText = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.sm}px;
  width: calc(100% - 32px);
  margin: 0px;
  /* margin: 0px 50px 0 20px; */
  font-weight: 400;
`

const LockIcon = styled(down_arrow)`
  /* float: right; */
  /* top: 80%;
left: 90%; */
position: absolute;
  right: 0px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s linear;
  width: 28px;
  height: 28px;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
  @media only screen and (max-width: 776px) {
  }
`;

const FaqBody = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 0px;
  transition: all 0.2s ease;
  overflow: hidden;
  width: 100%;
  ${(props) =>
    props.active &&
    css`
      max-height: ${props.height}px;
    `};
`;

const FaqAnswer = styled.p`
  // font-size: 20px;
  width: 100%;
  line-height: 1.5;
  margin-bottom: 0px;
  text-align: left;
`;

const FaqDivider = styled.div`
  width: 100%;
  margin: 20px auto 10px auto;
  border-bottom: 1px solid #383838;
`;

const FaqQuestion = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  text-align: left;
  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;

const FaqCard = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
  border: 1px solid ${props => props.theme.color.boxBorder};
  // border-radius: 2px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: #181818;
  color: white;
  padding: 20px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  // font-size: 20px;
`;
