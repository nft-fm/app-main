import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Container from "../Container";
import Logo from "../Logo";
import AccountButton from "./components/AccountButton";
import { Nav } from "./components/Nav";
// import ChainSelector from './components/ChainSelector'

const TopBar = () => {
  return (
    <StyledTopBar id="top">
      <Container size="lg">
        <StyledTopBarInner>
          <NavLink to="/home" style={{ textDecoration: "none" }}>
            <LogoContainer>
              <Logo /> <span style={{ marginBottom: "3px" }}>BETA</span>
            </LogoContainer>
          </NavLink>
          <NavRight>
            <NavContainer>
              <Nav />
            </NavContainer>
            {/* <ChainSelector /> */}
            <AccountButton />
          </NavRight>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-end;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xxs};
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  z-index: 20;
  align-items: center;
`;

const StyledTopBar = styled.div`
  background-color: #121212;
  border-bottom: 1px solid #232323;
  width: 100%;
  z-index: 50;
  position: sticky;
  top: 0px;
`;

const StyledTopBarInner = styled.div`
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.2);
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`;

export default TopBar;
