import React from "react";
import styled from "styled-components";
import Container from "../Container";

const Modalsm = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>{children}</StyledModal>
    </Container>
  );
};

const StyledModal = styled.div`
  position: relative;
  border-radius: ${(props) => props.theme.borderRadius}px;
  /* box-shadow: 4px 4px 8px -4px ${(props) => props.theme.color.blue}; */
  width: 100%;
  height: 30vh;
  background-color: ${(props) => props.theme.color.box};
  z-index: 100000;
  @media only screen and (max-width: 776px) {
    width: 100vw;
    height: 100vh;
    margin-top: 60px;
  }
`;

export default Modalsm;
