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
      {/* <Push /> */}
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
  min-height: calc(100% - 68px);
  
  margin-bottom: -60px;
`;

const Push = styled.div`
  height: 130px;
`;

export default Page;
