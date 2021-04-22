import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import demoImage from "../../../assets/img/metamask_fox.svg";
import { ReactComponent as down_arrow } from "../../../assets/img/icons/down_arrow.svg";

const ExpandMoreIcon = styled.img``;
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
    <FaqCard>
      <FaqQuestion onClick={toggleActive}>
        {props.question}
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

const LockIcon = styled(down_arrow)`
  /* float: right; */
  /* top: 80%;
left: 90%; */
position: absolute;
  margin-top: -3px;
  right: -60px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s linear;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
`;

const FaqBody = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 0px;
  transition: max-height 0.2s ease;
  overflow: hidden;
  width: calc(100% - 40px);
  ${(props) =>
    props.active &&
    css`
      max-height: ${props.height}px;
    `};
`;

const Toggle = styled.div`
  position: absolute;
  right: -50px;
  margin-top: -3px;
  width: 50px;
  height: 50px;
  & > svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }
`;

const FaqAnswer = styled.p`
  // font-size: 20px;
  width: 100%;
  text-align: left;
`;

const FaqDivider = styled.div`
  width: 80%;
  margin: 20px auto 10px auto;
  border-bottom: 1px solid #383838;
`;

const FaqQuestion = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin: 0px 50px 0 20px;
  position: relative;
  width: calc(100% - 64px);
  display: flex;
  text-align: left;
  cursor: pointer;
`;

const FaqCard = styled.div`
  margin-bottom: 15px;
  border: 2px solid #383838;
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
