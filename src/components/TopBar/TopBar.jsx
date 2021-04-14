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
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Logo />
        </NavLink>
        <NavRight>

          <Nav />
          <AccountButton />
        </NavRight>
      </StyledTopBarInner>
    </StyledTopBar>
  );
};

console.log(window.location.pathname)

const NavRight = styled.div`
display: flex;
z-index: 20;
`

const StyledTopBar = styled.div`
  background-color: black;
  border-bottom: ${props => props.window === "/" ? '4px solid transparent' : '4px solid #7e2ce3'};
`;

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default TopBar;
