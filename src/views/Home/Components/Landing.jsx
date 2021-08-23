import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../../assets/img/logos/logo.png";
import { NavLink } from "react-router-dom";
import { ReactComponent as IconDiscord } from "../../../assets/img/icons/social_discord.svg";
import { ReactComponent as IconMedium } from "../../../assets/img/icons/social_medium.svg";
import { ReactComponent as IconTelegram } from "../../../assets/img/icons/social_telegram.svg";
import { ReactComponent as IconTwitter } from "../../../assets/img/icons/social_twitter.svg";
import saQiBannerDesktop from "../../../assets/img/homepage_assets/saqi_banner.png";
import saQiBannerMobile from "../../../assets/img/homepage_assets/saqi_banner_mobile.jpeg";
import CountDown from "./CountDown";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Listen = () => {
  // const [timedOut, setTimedOut] = useState(false);

  // useEffect(() => {
  //   timedOut && axios.post("/api/nft-type/updateSaQi");
  // }, [timedOut]);

  return (
    <Landing>
      <LandingTitle>
        <Logo src={logo} />
        <StyledTitle>NFT FM</StyledTitle>
      </LandingTitle>
      <LaunchContainer>
        {/* {!timedOut && <CountDown setTimedOut={setTimedOut} />} */}
        <NavLink to="/market/16">
          <DesktopBanner src={saQiBannerDesktop} alt="saQi Banner" />
        </NavLink>
        <MobileDescription>
          <MobileBanner src={saQiBannerMobile} alt="saQi Banner" />
          <span>Portion of the proceeds go to natives affected by Covid</span>
          <span>Artwork by Autumn Sky</span>
        </MobileDescription>
      </LaunchContainer>
      <SocialsBar>
        <IconContainer
          href="https://t.me/joinchat/q6_q25NWr99kOGUx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Telegram />
          <IconText>Telegram</IconText>
        </IconContainer>
        <IconContainer
          href="https://nft-fm.medium.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Medium />
          <IconText>Medium</IconText>
        </IconContainer>
        <IconContainer
          href="https://twitter.com/NFTFM_IO"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
          <IconText>Twitter</IconText>
        </IconContainer>
        <IconContainer
          href="https://discord.gg/ejXAypqHD6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Discord />
          <IconText>Discord</IconText>
        </IconContainer>
      </SocialsBar>
    </Landing>
  );
};

const MobileDescription = styled.div`
  background-color: ${(props) => props.theme.color.box};
  border: 2px solid ${(props) => props.theme.color.boxBorder};
  /* padding: 20px 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > span {
    color: white;
    text-align: center;
    padding: 20px;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  @media only screen and (min-width: 776px) {
    display: none;
  }
`;

const MobileBanner = styled.img`
  width: 100vw;
  aspect-ratio: 1;
  @media only screen and (min-width: 776px) {
    display: none;
  }
`;

const DesktopBanner = styled.img`
  border-radius: 15px;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

const ContainerTitleTextContainer = styled.div`
  @media only screen and (max-width: 776px) {
    margin-top: 6px;
  }
`;

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

const Discord = styled(IconDiscord)`
  margin-top: 1px;
  width: 19px;
  height: 19px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Twitter = styled(IconTwitter)`
  margin-top: 1px;
  width: 17px;
  height: 17px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Medium = styled(IconMedium)`
  margin-top: 1px;

  width: 21px;
  height: 21px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const Telegram = styled(IconTelegram)`
  width: 19px;
  height: 19px;
  margin-top: 1px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.white};
  }
`;

const IconText = styled.span`
  margin: 1px 0 0 12px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const ContainerTitleText = styled.span`
  padding-left: 6px;
`;

const LandingTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* height: calc(100vh - ${(props) => props.theme.topBarSize}px + 1px); */
  width: 100%;
  padding-top: 40px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const IconContainer = styled.a`
  text-decoration: none;
  margin: 0 8px;
  align-items: center;
  border: solid #707070;
  height: 28px;
  width: 98px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${(props) => props.theme.color.boxBorder};
  border-radius: 18px;
  background-color: ${(props) => props.theme.color.box};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: solid 1px #383838;
  }
`;

const SocialsBar = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 80px;
    & > * {
      margin-bottom: 16px;
    }
  }
`;

const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const LaunchContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  @media only screen and (min-width: 1500px) {
    width: 976px;
  }
`;

const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -4px;
  padding: 0 12px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 776px) {
    position: relative;
    flex-direction: column;
    left: auto;
    right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 153.84px;
  margin-bottom: 24px;
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  color: white;
`;

const NftFmTagline = styled.div`
  padding-bottom: 20px;
  font-size: large;
  color: white;
  text-align: center;
  white-space: wrap;
`;

export default Listen;
