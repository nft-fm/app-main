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

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Switch>
      <BaseView>
        {/* <TopDisplayContainer /> */}
        <LandingSection>
          <HeaderText>NFT FM</HeaderText>
          {/* <LandingBottom>
            <LandingInfo>
              <InfoContent>
                <InfoContentTitle>
                  We Have Listed! Click the link below to purchase some BDT
                    </InfoContentTitle>
                <ETHAddress href='https://app.uniswap.org/#/swap?outputCurrency=0x7bce667ef12023dc5f8577d015a2f09d99a5ef58&inputCurrency=ETH' target="_blank"
                  rel="noopener noreferrer">
                  <StyledDiv
                    style={{ marginTop: "-5px" }}
                    target="_blank"
                  />
                </ETHAddress>
              </InfoContent>
            </LandingInfo>
            <LandingSocials>
              <StyledLinkContainer
                style={{ marginLeft: '50%' }}

              >

                <StyledLink
                  href="https://t.me/BlockDuelers" target="_blank"
                  rel="noopener noreferrer">
                  <SocialIcon src={telegram} />
                Telegram
                </StyledLink>
              </StyledLinkContainer>

              <StyledLinkContainer
                style={{ marginLeft: '30%' }}
              >
                <StyledLink
                  href="https://twitter.com/Blockduelers" target="_blank"
                  rel="noopener noreferrer">
                  <SocialIcon src={twitter} />
                    Twitter
                    </StyledLink>
              </StyledLinkContainer>

              <StyledLinkContainer
                style={{ marginLeft: '45%' }}
              >
                <StyledLink
                  href="https://discord.com/invite/7ww5YaYfWC" target="_blank"
                  rel="noopener noreferrer">
                  <SocialIcon src={discord} />
                      Discord
                    </StyledLink>
              </StyledLinkContainer>

              <StyledLinkContainer
                style={{ marginLeft: '23%', marginBottom: '0' }}
              >

                <StyledLink
                  href="https://medium.com/@blockduelers" target="_blank"
                  rel="noopener noreferrer">
                  <SocialIcon src={medium} />
                    Medium
                    </StyledLink>
              </StyledLinkContainer>
            </LandingSocials>
          </LandingBottom> */}
        </LandingSection>
      </BaseView>
    </Switch>
  );
};

const StyledDiv = !isMobile()
  ? styled.div`
      cursor: pointer;
      display: flex;
      background-image: url(${Uniswap});
      background-size: cover;
      background-position: center;
      height: 60px;
      width: 274px;
    `
  : styled.div`
      cursor: pointer;
      display: flex;
      background-image: url(${Uniswap});
      background-size: cover;
      background-position: center;
      height: 40px;
      width: 183px;
    `;

const FlavorImage = styled.img`
  position: absolute;
  bottom: -6px;
  width: 100%;
`;

const ComicSeperator = !isMobile()
  ? styled.div`
      width: 100%;
      margin: 40px 0 120px 0;
      border-top: dashed 5px #41403e;
    `
  : styled.div`
      width: 100%;
      margin: 20px 0 80px 0;
      border-top: dashed 5px #41403e;
    `;

const TechDoc = !isMobile()
  ? styled.div`
      border: solid black;
      border-width: 5px 3px 4px 3px;
      border-top-left-radius: 44% 5%;
      border-top-right-radius: 5% 74%;
      border-bottom-right-radius: 26% 9%;
      border-bottom-left-radius: 95% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: 600px;
      height: 860px;
      background-position: center;
      background-size: cover;
      margin: 0 auto 120px auto;
    `
  : styled.div`
      border: solid black;
      border-width: 5px 3px 4px 3px;
      border-top-left-radius: 44% 5%;
      border-top-right-radius: 5% 74%;
      border-bottom-right-radius: 26% 9%;
      border-bottom-left-radius: 95% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: 100%;
      height: 127vw;
      background-position: center;
      background-size: cover;
      margin: 0 auto 0px auto;
    `;

const NFTExample = styled.div`
  font-family: "Comic Book";
  border: solid black;
  border-width: 5px 3px 4px 3px;
  border-top-left-radius: 8% 5%;
  border-top-right-radius: 16% 4%;
  border-bottom-right-radius: 6% 67%;
  border-bottom-left-radius: 35% 5%;
  transform: rotate(-0.5deg);
  color: black;
  width: 240px;
  height: 240px;
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
`;

const StyledLinkContainer = !isMobile()
  ? styled.div`
      height: 70px;
      width: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 28px;
    `
  : styled.div`
      height: 70px;
      width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 28px;
    `;

const StyledLinkedIn = !isMobile()
  ? styled.a`
      font-family: "Comic Book";
      font-size: 22px;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      text-decoration: none;
      letter-spacing: normal;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
      color: black;
      background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.16" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
        #fff;
      background-size: 12px, 100%;
      border: 4px solid #000;
      position: relative;
      padding: 6px 8px 8px 8px;
      box-shadow: 6px 6px 0 #222;
      width: fit-content;
      &:hover {
        color: black;
        background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          #ffcd28;
        background-size: 12px, 100%;
        font-size: 24px;
      }
    `
  : styled.a`
      font-family: "Comic Book";
      font-size: 18px;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      text-decoration: none;
      letter-spacing: normal;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
      color: black;
      background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.16" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
        #fff;
      background-size: 12px, 100%;
      border: 4px solid #000;
      position: relative;
      padding: 6px 8px 8px 8px;
      box-shadow: 6px 6px 0 #222;
      width: fit-content;
      &:hover {
        color: black;
        background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          #ffcd28;
        background-size: 12px, 100%;
        font-size: 24px;
      }
    `;

const TeamCaption = !isMobile()
  ? styled.div`
      padding: 0 5px 2px 5px;
      font-family: "Comic Book";
      font-size: 20px;
      border: solid black;
      border-width: 4px 2.5px 3px 2.5px;
      background-color: #fef9ed;
      border-top-left-radius: 8% 5%;
      border-top-right-radius: 5% 4%;
      border-bottom-right-radius: 6% 7%;
      border-bottom-left-radius: 25% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: fit-content;
      margin-bottom: 10px;
    `
  : styled.div`
      padding: 0 5px 2px 5px;
      font-family: "Comic Book";
      font-size: 16px;
      border: solid black;
      border-width: 4px 2.5px 3px 2.5px;
      background-color: #fef9ed;
      border-top-left-radius: 8% 5%;
      border-top-right-radius: 5% 4%;
      border-bottom-right-radius: 6% 7%;
      border-bottom-left-radius: 25% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: fit-content;
      margin-bottom: 10px;
    `;

const BigTeamImage = styled.img`
  border: 5px solid black;
  margin-bottom: 10px;
  max-width: 30vw;
  width: 400px;
  height: auto;
`;

const SmallTeamImage = styled.img`
  border: 5px solid black;
  margin-bottom: 10px;
  max-width: 20vw;
  width: 300px;
  height: auto;
`;

const SmallTeam = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 28%;
  align-items: center;
`;

const BigTeam = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  align-items: center;
`;
const TopTeamContainer = styled.div`
  display: flex;
  width: 1400px;
  max-width: 80vw;
  justify-content: space-evenly;
  align-items: center;
`;

const TeamContainer = !isMobile()
  ? styled.div`
      display: flex;
      width: 1400px;
      max-width: 80vw;
      justify-content: space-between;
      margin-bottom: 40px;
      margin-top: 40px;
    `
  : styled.div`
      display: flex;
      max-width: 95vw;
      justify-content: space-between;
      margin-bottom: 40px;
    `;

const BottomContainer = !isMobile()
  ? styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: linear-gradient(
        180deg,
        rgb(256, 256, 256),
        rgb(256, 256, 256) 92%,
        rgb(240, 240, 240) 93%,
        rgb(220, 220, 220) 94%,
        rgb(100, 100, 100) 100%
      );
    `
  : styled.div`
      width: 100%;
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: linear-gradient(
        180deg,
        rgb(256, 256, 256),
        rgb(256, 256, 256) 92%,
        rgb(240, 240, 240) 93%,
        rgb(220, 220, 220) 94%,
        rgb(100, 100, 100) 100%
      );
    `;

const Spacer = styled.div`
  height: 300px;
`;

const TokenomicsImage = styled.img`
  margin-bottom: 10px;
  max-width: 40vw;
`;

const MidContainer5 = !isMobile()
  ? styled.div`
      width: 100%;
      background: white;
      position: relative;
      transform: rotateY(0deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 0 0 0;
      &:after {
        background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.02" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="white"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          rgba(0, 0, 0, 0);
        content: "";
        position: absolute;
        top: 1px;
        width: 100%;
        height: 100%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        border-top: 4px solid black;
        border-bottom: 4px solid black;
        // background-image: radial-gradient(circle, lightcoral, #A3000B);
        background-image: linear-gradient(#222222, #092c46);
        left: 0;
        width: 100%;
        height: 100%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
    `
  : styled.div`
      width: 100%;
      background: white;
      position: relative;
      transform: rotateY(0deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 80px 0 80px 0;
      &:after {
        background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.02" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="white"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          rgba(0, 0, 0, 0);
        content: "";
        position: absolute;
        top: 1px;
        width: 100%;
        height: 100%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        border-top: 4px solid black;
        border-bottom: 4px solid black;
        // background-image: radial-gradient(circle, lightcoral, #A3000B);
        background-image: linear-gradient(#222222, #092c46);
        left: 0;
        width: 100%;
        height: 100%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
    `;

const MidContainer4 = styled.div`
  width: 100%;
  background: white;
  position: relative;
  transform: rotateY(0deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 100px 0;
  &:after {
    background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
      rgba(0, 0, 0, 0);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    transform: skewY(6deg);
    transform-origin: 100% 0;
    z-index: -1;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    background-image: radial-gradient(circle, palegreen, #00884c);
    border-top: 4px solid black;
    left: 0;
    width: 100%;
    height: 120%;
    transform: skewY(6deg);
    transform-origin: 100% 0;
    z-index: -1;
  }
`;

const BattleImageContainer = styled.div`
  margin-top: -40px;
`;

const BattleText = !isMobile()
  ? styled.div`
      width: 30%;
    `
  : styled.div`
      width: 100%;
    `;

const Caption = !isMobile()
  ? styled.div`
      padding: 0 5px 2px 5px;
      font-family: "Comic Book";
      font-size: 14px;
      border: solid black;
      border-width: 4px 2.5px 3px 2.5px;
      background-color: #fef9ed;
      border-top-left-radius: 8% 5%;
      border-top-right-radius: 5% 4%;
      border-bottom-right-radius: 6% 7%;
      border-bottom-left-radius: 25% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: fit-content;
      margin: auto;
    `
  : styled.div`
      padding: 0 5px 2px 5px;
      font-family: "Comic Book";
      font-size: 14px;
      border: solid black;
      border-width: 4px 2.5px 3px 2.5px;
      background-color: #fef9ed;
      border-top-left-radius: 8% 5%;
      border-top-right-radius: 5% 4%;
      border-bottom-right-radius: 6% 7%;
      border-bottom-left-radius: 25% 5%;
      transform: rotate(-0.5deg);
      color: black;
      width: fit-content;
      margin: auto auto 40px auto;
    `;

const MidContainer3 = !isMobile()
  ? styled.div`
      width: 100%;
      background: white;
      position: relative;
      transform: rotateY(0deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 0 200px 0;
      &:after {
        background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          rgba(0, 0, 0, 0);
        content: "";
        position: absolute;
        top: 1px;
        width: 100%;
        height: 120%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        border-top: 4px solid black;
        background-image: radial-gradient(circle, lightblue, #005c8b);
        left: 0;
        width: 100%;
        height: 120%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
    `
  : styled.div`
      width: 100%;
      background: white;
      position: relative;
      transform: rotateY(0deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 80px 0 80px 0;
      &:after {
        background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
          rgba(0, 0, 0, 0);
        content: "";
        position: absolute;
        top: 1px;
        width: 100%;
        height: 120%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        border-top: 4px solid black;
        background-image: radial-gradient(circle, lightblue, #005c8b);
        left: 0;
        width: 100%;
        height: 120%;
        transform: skewY(-6deg);
        transform-origin: 0% 0;
        z-index: -1;
      }
    `;

const DemoImage = !isMobile()
  ? styled.img`
      border: 5px solid black;
      margin-bottom: 10px;
      max-width: 60vw;
    `
  : styled.img`
      border: 5px solid black;
      margin-bottom: 10px;
      max-width: calc(90vw - 10px);
    `;

const ComicSubTitle = !isMobile()
  ? styled.div`
      padding: 5px 10px;
      max-width: 50vw;
      font-family: "Bangers";
      font-weight: normal;
      font-size: 40px;
      border: solid #000;
      -webkit-text-stroke: 1px #000;
      background-color: #ddd;
      border: 1px solid #222;
      box-shadow: 10px 10px 0 #222;
      letter-spacing: 3px;
      font-weight: normal;
      margin-bottom: 50px;
    `
  : styled.div`
      padding: 5px 10px;
      max-width: calc(90vw - 20px);
      font-family: "Bangers";
      font-weight: normal;
      font-size: 40px;
      border: solid #000;
      -webkit-text-stroke: 1px #000;
      background-color: #ddd;
      border: 1px solid #222;
      box-shadow: 10px 10px 0 #222;
      letter-spacing: 3px;
      font-weight: normal;
      margin-bottom: 50px;
    `;

const Column = !isMobile()
  ? styled.div`
      width: 42%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `
  : styled.div`
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;

const TechnicalContents = styled.div`
  display: flex;
  width: 1300px;
  max-width: 90vw;
  margin-bottom: 60px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ComicContents = !isMobile()
  ? styled.div`
      display: flex;
      width: 1400px;
      max-width: 80vw;
      margin-bottom: 60px;
      justify-content: space-evenly;
    `
  : styled.div`
      display: flex;
      width: 90vw;
      margin-bottom: 40px;
      align-items: center;
      flex-direction: column;
    `;

const ComicBody1 = styled.div`
  padding: 15px;
  font-family: "Comic Book";
  font-size: 16px;
  border: solid black;
  border-width: 5px 3px 4px 3px;
  background-color: #fef9ed;
  border-top-left-radius: 8% 5%;
  border-top-right-radius: 5% 4%;
  border-bottom-right-radius: 6% 7%;
  border-bottom-left-radius: 25% 5%;
  transform: rotate(-0.5deg);
  color: black;
  margin-bottom: 20px;
`;

const ComicBody2 = styled.div`
  background-color: #fef9ed;
  padding: 15px;
  font-family: "Comic Book";
  font-size: 16px;
  font-weight: normal;
  border: solid #000;
  border-width: 5px 3px 3px 5px !important;
  border-top-left-radius: 5% 4%;
  border-top-right-radius: 4% 202%;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 5% 95%;
  transform: rotate(0.5deg);
  margin-bottom: 20px;
`;

const ComicTitle = !isMobile()
  ? styled.div`
      padding: 5px 10px;
      max-width: 50vw;
      font-family: "Bangers";
      font-weight: normal;
      font-size: 60px;
      border: solid #000;
      -webkit-text-stroke: 1px #000;
      background-color: #ddd;
      border: 1px solid #222;
      box-shadow: 10px 10px 0 #222;
      letter-spacing: 3px;
      font-weight: normal;
      margin-bottom: 50px;
    `
  : styled.div`
      padding: 5px 10px;
      max-width: calc(90vw - 20px);
      font-family: "Bangers";
      font-weight: normal;
      font-size: 60px;
      border: solid #000;
      -webkit-text-stroke: 1px #000;
      background-color: #ddd;
      border: 1px solid #222;
      box-shadow: 10px 10px 0 #222;
      letter-spacing: 3px;
      font-weight: normal;
      margin-bottom: 50px;
    `;

const MidContainer2 = styled.div`
  width: 100%;
  background: white;
  position: relative;
  transform: rotateY(0deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 100px 0;
  &:after {
    background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
      rgba(0, 0, 0, 0);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120%;
    transform: skewY(6deg);
    transform-origin: 100% 0;
    z-index: -1;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    background-image: radial-gradient(circle, yellow, #d09800);
    border-top: 4px solid black;
    left: 0;
    width: 100%;
    height: 120%;
    transform: skewY(6deg);
    transform-origin: 100% 0;
    z-index: -1;
  }
`;

const shake = keyframes`
0% {transform: rotate(1deg);}
50% {transform: rotate(-1deg);}
100% {transform: rotate(1deg);}
`;

const ETHAddress = !isMobile()
  ? styled.a`
      font-family: "Comic Book";
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      text-decoration: none;
      letter-spacing: normal;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
      color: black;
      // cursor: pointer;
      margin: 8px auto;
      background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.2" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="black"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
        #dba800;
      background-size: 12px, 100%;
      font-size: 30px;
      border: 4px solid #000;
      position: relative;
      padding: 10px;
      box-shadow: -15px 15px 0 #222;
      width: fit-content;
      &:hover {
        color: black;
        animation: ${shake} 75ms 4;
        animation-timing-function: linear;
      }
    `
  : styled.a`
      font-family: "Comic Book";
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      text-decoration: none;
      letter-spacing: normal;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
      color: black;
      // cursor: pointer;
      margin: 8px auto;
      background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.2" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="black"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
        #dba800;
      background-size: 12px, 100%;
      font-size: 30px;
      border: 4px solid #000;
      position: relative;
      padding: 10px;
      box-shadow: -10px 10px 0 #222;
      width: fit-content;
      &:hover {
        color: black;
        animation: ${shake} 75ms 4;
        animation-timing-function: linear;
      }
    `;

const InfoContent = styled.div`
  padding: 15px;
  font-family: "Comic Book";
  border: solid black;
  border-width: 5px 3px 4px 3px !important;
  background-color: #fef9ed;
  border-top-left-radius: 4% 95%;
  border-top-right-radius: 95% 4%;
  border-bottom-right-radius: 6% 92%;
  border-bottom-left-radius: 95% 5%;
  transform: rotate(-0.5deg);
  color: black !important;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const InfoContentTitle = styled.div`
  font-family: "Comic Book";
  background-color: #fef9ed;
  font-weight: normal;
  font-size: 20px;
  padding: 0 20px;
`;

const InfoTitle = styled.h1`
  font-family: "Bangers";
  background-color: #fef9ed;
  padding: 5px 0 5px 0;
  border: solid black;
  border-width: 5px 3px 3px 5px;
  width: 80%;
  margin-top: 0;
  border-top-left-radius: 5% 4%;
  border-top-right-radius: 4% 202%;
  border-bottom-right-radius: 50% 10%;
  border-bottom-left-radius: 5% 95%;
  transform: rotate(0.5deg);
  letter-spacing: 3px;
  font-weight: normal;
  padding: 12px;
`;

const StyledLink = styled.a`
  font-family: "Comic Book";
  font-size: 30px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: black;
  text-transform: uppercase;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #fff;
  background-size: 12px, 100%;
  border: 4px solid #000;
  position: relative;
  padding: 12px;
  box-shadow: 10px 10px 0 #222;
  width: fit-content;
  &:hover {
    color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
      #ffcd28;
    background-size: 12px, 100%;
    font-size: 32px;
  }
`;

const SocialIcon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

const LandingInfo = !isMobile()
  ? styled.div`
      display: flex;
      flex-direction: column;
      width: 50%;
      align-items: center;
    `
  : styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      margin-bottom: 40px;
    `;

const LandingSocials = !isMobile()
  ? styled.div`
      display: flex;
      flex-direction: column;
      width: 50%;
    `
  : styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: -40%;
    `;

const LandingBottom = !isMobile()
  ? styled.div`
      display: flex;
      width: 1400px;
      max-width: 80vw;
      flex-direction: row;
      align-items: center;
      margin-bottom: 150px;
    `
  : styled.div`
      display: flex;
      max-width: 95vw;
      margin: auto;
      flex-direction: column;
      align-items: center;
      margin-bottom: 150px;
    `;

const MidBody = styled.div`
  font-family: Bangers;
  font-size: 25px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  text-align: center;
  color: #292929;
  margin-bottom: 80px;
  width: 80vw;
  max-width: 1200px;
`;

const MidTitle = styled.div`
  font-family: Bangers;
  font-size: 60px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #292929;
  margin-bottom: 40px;
`;

const MidContainer1 = styled.div`
  width: 100%;
  background: white;
  position: relative;
  transform: rotateY(0deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 100px 0;
  &:before {
    background: url('data:image/svg+xml;utf8,<svg width="20" height="20" transform="rotate(25)" opacity="0.04" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
      #fff;
    content: "";
    position: absolute;
    top: 1px;
    width: 100%;
    height: 120%;
    transform: skewY(-6deg);
    transform-origin: 0% 0;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    // background-image: linear-gradient(180deg, rgb(100,100,100), rgb(220, 220, 220) 6%, rgb(240, 240, 240) 7%, rgba(256, 256, 256, 0) 8%);
    background-image: linear-gradient(
      180deg,
      rgba(100, 100, 100, 1) 0%,
      rgba(100, 100, 100, 0.6) 3%,
      rgba(100, 100, 100, 0.3) 6%,
      rgba(256, 256, 256, 0) 10%
    );
    left: 0;
    width: 100%;
    height: 100%;
    transform: skewY(-6deg);
    transform-origin: 0% 0;
    z-index: -1;
  }
`;

const HeaderText = !isMobile()
  ? styled.div`
      /* text-shadow: 10px 10px 0 #000000;
      font-family: Bangers; */
      font-size: 169px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      /* color: #fef9ed; */
    `
  : styled.div`
      /* text-shadow: 10px 10px 0 #000000;
      font-family: Bangers; */
      font-size: 80px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      /* color: #fef9ed; */
      margin-bottom: 20px;
    `;

const LandingSection = !isMobile()
  ? styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `
  : styled.div`
      display: flex;
      flex-direction: column;
    `;

const BigLogoContainer = !isMobile()
  ? styled.div`
      position: fixed;
      height: 100vh;
      left: -26vw;
      display: flex;
      align-items: center;
      top: -10vh;
    `
  : styled.div`
      position: fixed;
      height: 100vh;
      left: -40vw;
      display: flex;
      align-items: center;
      top: 20vh;
    `;

const BigLogo = !isMobile()
  ? styled.img`
      width: 75vw;
      opacity: 0.08;
    `
  : styled.img`
      width: 70vh;
      opacity: 0.08;
      transform: rotate(-5deg);
    `;

const BackgroundOverlay = !isMobile()
  ? styled.div`
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      // background-image: linear-gradient(to right, #292929 50%, rgba(41, 41, 41, 0.97) 58%, rgba(41, 41, 41, 0.95) 66%, rgba(41, 41, 41, 0.85) 74%, rgba(41, 41, 41, 0.75) 82%, rgba(41, 41, 41, 0.6) 86%, rgba(41, 41, 41, 0.4) 90%, rgba(41, 41, 41, 0.2) 94%, rgba(52, 52, 52, 0) 100%);
      background-image: linear-gradient(
        to right,
        #292929 40%,
        rgba(41, 41, 41, 0.97) 48%,
        rgba(41, 41, 41, 0.95) 56%,
        rgba(41, 41, 41, 0.8) 64%,
        rgba(41, 41, 41, 0.6) 72%,
        rgba(41, 41, 41, 0.4) 76%,
        rgba(41, 41, 41, 0.2) 80%,
        rgba(41, 41, 41, 0) 90%,
        rgba(52, 52, 52, 0) 100%
      );
    `
  : styled.div`
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      background-image: linear-gradient(
        55deg,
        #292929 30%,
        rgba(41, 41, 41, 0.97) 38%,
        rgba(41, 41, 41, 0.95) 46%,
        rgba(41, 41, 41, 0.8) 54%,
        rgba(41, 41, 41, 0.6) 62%,
        rgba(41, 41, 41, 0.4) 66%,
        rgba(41, 41, 41, 0.2) 70%,
        rgba(41, 41, 41, 0) 80%,
        rgba(52, 52, 52, 0) 100%
      );
    `;

const BackgroundSection = styled.div`
  background-image: url(${Background});
  background-position: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;
const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

export default Listen;
