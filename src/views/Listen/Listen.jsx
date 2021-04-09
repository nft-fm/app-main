import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes } from "styled-components";
import Page from "../../components/Page";
import Background from "../../assets/img/background.jpg";
import TokenomicsImg from "../../assets/img/tokenomics_full.png";
import TokenomicsImgMobile from "../../assets/img/tokenomics_mobile.png";
import Logo from "../../assets/img/logo.png";
import Roadmap from "./Roadmap";
import BigNumber from "bignumber.js";
import TopDisplayContainer from "../../components/TopDisplayContainer";
import twitter from "../../assets/img/social_twitter.png";
import medium from "../../assets/img/social_medium.png";
import telegram from "../../assets/img/social_telegram.png";
import discord from "../../assets/img/social_discord.png";
import Uniswap from "../../assets/img/uniswap.svg";
import isMobile from "../../utils/isMobile";
import BaseView from "../BaseView";

import NftCard from "../../components/NftCard/NftCard";
import placeholderImage from "../../assets/img/logos/fm_logo_1.png";

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const nfts = [
    {
      artist: "Big Tone",
      title: "Tony in Paris",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Here He Comes",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Girls Love Big Katz",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Snoozin', Boozin', and Croozin'",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Tony in Paris",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Here He Comes",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Girls Love Big Katz",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
    {
      artist: "Big Tone",
      title: "Snoozin', Boozin', and Croozin'",
      album: "",
      image: placeholderImage,
      producer: "",
      mintTotal: 100,
    },
  ];

  return (
    <Switch>
      <BaseView>
        {/* <TopDisplayContainer /> */}
        <LandingSection>
          <Banner>
            <HeaderContents>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              lacinia justo non consequat euismod. Praesent venenatis maximus
              purus, a elementum sem ultricies et. Sed sollicitudin congue
              lectus, sit amet suscipit lacus iaculis in. Integer nibh ipsum,
              pulvinar eu scelerisque in, malesuada sit amet lorem. Vivamus at
            </HeaderContents>
          </Banner>
        </LandingSection>
        <MainContents>
          <InfoSection>
            <InfoHeaderText>
              NFT <span>FM</span>
            </InfoHeaderText>
            <InfoSectionContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              lacinia justo non consequat euismod. Praesent venenatis maximus
              purus, a elementum sem ultricies et. Sed sollicitudin congue
              lectus, sit amet suscipit lacus iaculis in. Integer nibh ipsum,
              pulvinar eu scelerisque in, malesuada sit amet lorem. Vivamus at
            </InfoSectionContent>
            <SearchBar type="text" placeholder="Search..." />
          </InfoSection>
          <NftSectionHolder>
            <NftDisplay>
              {nfts.map((nft) => (
                <NftCard nft={nft} />
              ))}
            </NftDisplay>
          </NftSectionHolder>
        </MainContents>
      </BaseView>
    </Switch>
  );
};

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SearchBar = styled.input`
border-radius: 15px;
width: 50%;
margin-top: 105px;
position: absolute;
padding: 5px 10px;
outline: none;
background-color: #eaeaea;
border: 2px solid #707070;
`;

const InfoSectionContent = styled.span`
padding: 20px 20px;
`

const NftSectionHolder = styled.div`
width: 100%;
background-color: #eaeaea;
display: flex;
align-items: center;
justify-content: center;
padding: 10px 0;
`;

const NftDisplay = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const InfoHeaderText = styled.div`
  font-family: "HelveticaNeue-Bold";
  font-size: 30px;
  text-align: center;
  & > span {
    color: #7e2ce3;
  }
`;

const LandingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const HeaderContents = styled.span`
  color: white;
  width: 80%;
  /* margin-top: 50px; */
`;

const Banner = styled.div`
  width: 100%;
  height: 150px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Listen;
