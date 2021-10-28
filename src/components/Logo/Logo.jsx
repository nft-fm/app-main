import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logos/Fanfare_logo.svg";

const Logo = () => {
  return (
    <LogoContainer>
      <StyledLogo src={logo} alt="logo" />
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLogo = styled.img`
  max-height: 110px;
  z-index: 20;
  cursor: pointer;
  height: 50px;
`;

export default Logo;
