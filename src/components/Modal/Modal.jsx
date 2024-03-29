import React from "react";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <OpaqueFilter>
      <Container>
        {children}
      </Container>
    </OpaqueFilter>
  );
};

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${props => props.theme.fontColor.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
  @media only screen and (max-width: 776px) {
    width: 100vw;
    height: 100vh;
  }
`;

export default Modal;
