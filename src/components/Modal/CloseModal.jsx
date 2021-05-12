import React from "react";
import styled from "styled-components";

const CloseModal = (props) => {
  return <Close onClick={props.onDismiss}>X</Close>;
};

const Close = styled.div`
  align-self: flex-end;
  padding-top: ${(props) => props.theme.spacing[2]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  font-size: ${(props) => props.theme.fontSizes.md};
  height: 15%;
  box-sizing: padding-box;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
  z-index: 100100;
`;

export default CloseModal;
