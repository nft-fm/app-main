import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Container from "../Container";
import { Col } from "../Grid";
import Logo from "../Logo";
import AccountButton from "./components/AccountButton";
import { Nav } from "./components/Nav";

const TopBar = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <NavLink to="/" style={{ flex: 1, textDecoration: "none" }}>
            <Logo />
          </NavLink>
          <Col collapse="sm">
            <Nav />
          </Col>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AccountButton />
          </div>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};

const StyledTopBar = styled.div`
  border: solid 2px #000000;
  background-image: linear-gradient(
    to right,
    #b72100,
    #b72100 34%,
    #1a8eb2 68%,
    #1a8eb2
  );
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  margin-top: 5px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default TopBar;
