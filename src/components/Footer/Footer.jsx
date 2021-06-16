import React from "react";
import styled from "styled-components";
// import discord from "../../../assets/img/socials/social_discord.png";
// import medium from "../../../assets/img/socials/social_medium.png";
// import telegram from "../../../assets/img/socials/social_telegram.png";
// import twitter from "../../../assets/img/socials/social_twitter.png";
import logo from "../../assets/img/logos/logo_nav.png";
import { NavLink } from "react-router-dom";

export const Footer = ({ isOpen }) => (
  <StyledFooter isOpen={isOpen}>
    <Column>
      <Logo src={logo} />
      <FooterLinks>
        <FooterLink to="/termsofservice">Terms of Service</FooterLink>
        <ContactDiv>
          <span>2120 Oxford Ave</span>
          <span>Austin, TX</span>
          <br />
          <EmailLink href="mailto:info@nftfm.io" target="_blank">
            E: info@nftfm.io
          </EmailLink>
        </ContactDiv>
        <FooterLink to="/privacypolicy">Privacy Policy</FooterLink>
      </FooterLinks>
      <FooterContact>
        <Contact></Contact>
        <div style={{ width: "150px" }} />
        <div style={{ width: "150px" }} />
      </FooterContact>
      <FooterCopy>&copy; 2021 NFT FM Inc.</FooterCopy>
    </Column>
  </StyledFooter>
);

const FooterContact = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
`;

const Contact = styled.div`
  width: 150px;
  color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* text-align: center; */
  /* align-items: center; */
  & > span {
    padding-left: ${(props) => props.theme.spacing[3]}px;
    padding-right: ${(props) => props.theme.spacing[3]}px;

    align-items: center;
    text-align: center;
  }
`;
const ContactDiv = styled.div`
  text-decoration: none;
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  line-height: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: #ffffff;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  justify-content: center;
  text-align: center;
  width: 150px;
  /* &:hover {
    color: #ffcb46;
  } */
`;
const EmailLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #ffcb46;
    /* text-decoration: underline; */
  }
`;

const FooterLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  line-height: 1;
  display: flex;
  /* align-items: center; */
  transition: all 0.2s ease-in-out;
  color: #ffffff;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  justify-content: center;
  text-align: center;
  width: 150px;
  &:hover {
    color: #ffcb46;
    /* text-decoration: underline; */
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
`;

const FooterCopy = styled.span`
  /* margin-bottom: 12px; */
  color: white;
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xxs};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-between;

  @media only screen and (max-width: 776px) {
    width: 100vw;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
  /* margin-bottom: 16px; */
`;

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
  /* background-color: ${(props) => props.theme.bgColor}; */
`;
