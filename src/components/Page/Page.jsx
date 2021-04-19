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
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: calc(100% - 61px);
  /* overflow-y: hidden; */
  margin-bottom: -61px;
  width: ${props => props.theme.homeWidth}px;
  margin: auto;
max-width: 90vw;
  @media only screen and (max-width: 991px) {
    margin: -50px 0 -120px 0;
    }

`

const Push = styled.div`
  height: 61px;
  @media only screen and (max-width: 991px) {
    height: 170px;
 }
`

export default Page;
