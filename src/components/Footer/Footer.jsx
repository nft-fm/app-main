import React from "react";
import styled from "styled-components";
// import discord from "../../../assets/img/socials/social_discord.png";
// import medium from "../../../assets/img/socials/social_medium.png";
// import telegram from "../../../assets/img/socials/social_telegram.png";
// import twitter from "../../../assets/img/socials/social_twitter.png";
import { Col, Row } from "../Grid";
import logo from "../../assets/img/logos/logo_nav.png"

export const Footer = () => (
  <StyledFooter>
    <Column>
      {/* <Row> */}

      <Logo src={logo} />
      {/* <FooterLink
            link="https://twitter.com/Blockduelers"
            icon={twitter}
            text="Twitter"
          />
          <FooterLink
            link="https://discord.com/invite/7ww5YaYfWC"
            icon={discord}
            text="Discord"
          />
          <FooterLink
            link="https://medium.com/@blockduelers"
            icon={medium}
            text="Medium"
          />
          <FooterLink
            link="https://t.me/BlockDuelers"
            icon={telegram}
            text="Telegram"
          /> */}
      {/* </Row> */}
      <FooterLinks>
        <FooterLink>Contact Us</FooterLink>
        <FooterLink>Terms of Service</FooterLink>
        <FooterLink>Privacy Policy</FooterLink>
      </FooterLinks>
      <FooterCopy>
        &copy; 2021 NFT FM Inc.
    </FooterCopy>
    </Column>
  </StyledFooter>
);

const FooterLink = styled.a`
cursor: pointer;
  font-family: "Compita";
  font-size: ${props => props.theme.fontSizes.xs};
  line-height: 1;
  display: flex;
  align-items: center;
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
`

const FooterCopy = styled.span`
/* margin-bottom: 12px; */
color: white;
font-family: "Compita";
font-size: ${props => props.theme.fontSizes.xxs};
`

const FooterLinks = styled.div`
display: flex;
flex-direction: row;
width: 500px;
justify-content: space-between;
/* margin-bottom: 16px; */
`

const Logo = styled.img`
  width: 120px;
  height: auto;
  /* margin-bottom: 16px; */
`

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 120px;
`;