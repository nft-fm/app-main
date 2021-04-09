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
    <StyledTopBar id="top" window={window.location.pathname}>
      <StyledTopBarInner>
        <NavLink to="/" style={{ flex: 1, textDecoration: "none" }}>
          <Logo />
        </NavLink>
        <Nav />
        <AccountButton />
      </StyledTopBarInner>
    </StyledTopBar>
  );
};

console.log(window.location.pathname)

const StyledTopBar = styled.div`
  z-index: 10;
  background-color: black;
  border-bottom: 4px solid#7e2ce3;
  border-bottom: ${props => props.window === "/listen" ? 'none' : '4px solid #7e2ce3'}
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: flex-end;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default TopBar;
