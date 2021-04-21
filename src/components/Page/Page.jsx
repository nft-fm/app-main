import React from "react";
import styled from "styled-components";
import { Footer } from "../Footer/Footer";
import { Col } from "../Grid";
import TopBar from "../TopBar";
import { Nav } from "../TopBar/components/Nav";

const Page = ({ children }) => (
  <StyledPage>
    <TopBar />
    <Col expand="sm" style={{ marginTop: "10px" }}>
      <Nav />
    </Col>
    <StyledMain>
      {children}
      <Push />
    </StyledMain>
    <Footer />
  </StyledPage>
);

const StyledPage = styled.div`
  height: 100vh;
  margin: 0;
background-color: ${props => props.theme.bgColor};

`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100% - 61px);
  /* overflow-y: hidden; */
  margin: 0 auto -120px auto;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* @media only screen and (max-width: 991px) {
    margin: -50px 0 -120px 0;
  } */
  width: 1226px;
  @media only screen and (max-width: 1500px) {
    width: 976px;
  }
  @media only screen and (max-width: 1200px) {
    width: 726px;
  }
  @media only screen and (max-width: 776px) {
    width: 100vw;
  }
`

const Push = styled.div`
  height: 120px;
  /* @media only screen and (max-width: 991px) {
    height: 170px;
 } */
`

export default Page;

