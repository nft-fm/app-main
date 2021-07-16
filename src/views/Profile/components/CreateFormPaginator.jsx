import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";

const PaginatorButton = ({ children, currentStep, prev, onClick }) => 
  <StyledAccountButton currentStep={currentStep} prev={prev} onClick={onClick}>
    <Button type="button">
      {children}
    </Button>
  </StyledAccountButton>


const CreateFormPaginator = ({ currentStep, setCurrentStep, handleSubmit, stepsCompleted }) => {
  const onClickDotNavigate = (step) => {
    if (currentStep <= step) return;
    setCurrentStep(step);
  }

  return (
    <PaginatorContainer>
      <PaginatorButton prev currentStep={currentStep} onClick={() => setCurrentStep(currentStep - 1)}>
        Back
      </PaginatorButton>
      <DotContainer>
        <Dot step={1} currentStep={currentStep} onClick={() => onClickDotNavigate(1)} color="dodgerblue"/>
        <Dot step={2} currentStep={currentStep} onClick={() => onClickDotNavigate(2)} color="gold"/>
        <Dot step={3} currentStep={currentStep} onClick={() => onClickDotNavigate(3)} color="yellowgreen"/>
        <Dot step={4} currentStep={currentStep} onClick={() => onClickDotNavigate(4)} color="tomato"/>
      </DotContainer>
      {currentStep === 4 ? 
        <PaginatorButton currentStep={currentStep} onClick={handleSubmit}>Submit</PaginatorButton> : 
        <PaginatorButton currentStep={currentStep} onClick={() => setCurrentStep(currentStep + 1)}>Next</PaginatorButton>
      }
    </PaginatorContainer>
  )
}

const PaginatorContainer = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-around;
  align-items: center;
  margin-left: -100px;
  margin-top: 10px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
`;

const StyledAccountButton = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  ${props => (props.currentStep === 1 && props.prev) && css`
    visibility: hidden;
  `}
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Dot = styled.span`
  height: 20px;
  width: 20px;
  margin: 20px 5px;
  background-color: ${
    props => props.color && props.currentStep >= props.step ? props.color : "#181818"
  };
  border-radius: 50%;
  display: inline-block;

  ${props => (props.currentStep === props.step) 
  && css`
    border: 2px solid white;
  `}

  ${props => (props.currentStep > props.step) 
  && css`
    cursor: pointer;
  `}
`


export default CreateFormPaginator;