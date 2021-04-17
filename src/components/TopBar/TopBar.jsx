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
    <StyledTopBar id="top">
      <Container size="lg">
        <StyledTopBarInner>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Logo />
          </NavLink>
          <NavRight>
            <Nav />
            <AccountButton />
          </NavRight>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};

console.log(window.location.pathname)

const NavRight = styled.div`
display: flex;
z-index: 20;
`

const StyledTopBar = styled.div`
  background-color:#121212;
  border-bottom: 1px solid #232323;
`;

const StyledTopBarInner = styled.div`
z-index: 20;
  background-color: rgba(0,0,0,0.2);
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default TopBar;
