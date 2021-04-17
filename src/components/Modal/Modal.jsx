import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Modal = ({ children }) => {
  const stopProp = (e) => {
    e.stopPropagation();
  };

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
  color: ${props => props.theme.fontColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export default Modal;
