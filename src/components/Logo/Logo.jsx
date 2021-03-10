import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo_outline.png";

const Logo = () => {
  return (
    <LogoContainer>
      <StyledLogo src={logo} alt="logo" height="40px" />
      <StyledText>Block Duelers</StyledText>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLogo = styled.img`
  height: 120px;
  margin-top: 50px;
  cursor: pointer;
  @media only screen and (max-width: 767px) {
    height: 80px;
    margin-top: 0px;
  }
`;

const StyledText = styled.span`
  font-family: "Bangers";
  font-size: 30px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  color: #ffffff;
  margin-left: ${(props) => props.theme.spacing[2] * 1.5}px;
  @media only screen and (max-width: 767px) {
    margin-left: ${(props) => props.theme.spacing[2] * 1.5 - 20}px;
    font-size: 27px;
    width: 50vw;
  }
`;

export default Logo;
