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
`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 60px);
  /* overflow-y: hidden; */
  margin-bottom: -64px;
  @media only screen and (max-width: 991px) {
    margin: -50px 0 -120px 0;
    }

`

const Push = styled.div`
  height: 64px;
  @media only screen and (max-width: 991px) {
height: 170px;
 }
`

export default Page;
