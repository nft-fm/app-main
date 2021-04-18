import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../components/NftCards/HomeNftCard";
import logo from "../../assets/img/logos/logo.png";
import discord from "../../assets/img/socials/social_discord.png";
import medium from "../../assets/img/socials/social_medium.png";
import telegram from "../../assets/img/socials/social_telegram.png";
import twitter from "../../assets/img/socials/social_twitter.png";

const Listen = () => {
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    axios.get("/api/nft-type/featured").then((res) => setNfts(res.data));
  }, [])

  const showNfts = nfts.map((nft) => {
    return (
      <NftCard nft={nft} />
    )
  });

  return (
    <Landing>
      <LandingTitle>
        <Logo src={logo} />
        <StyledTitle>
          NFT FM
        </StyledTitle>
        <NftFmTagline>
          Good Tagline.
        </NftFmTagline>
      </LandingTitle>
      <LaunchContainer>
        <ContainerTitle>
          PROUD TO
          <ContainerTitleText style={{ "color": "#20a4fc" }}>{`LAUNCH`}</ContainerTitleText>
          <ContainerTitleText style={{ "color": "#fde404" }}>{`ALONGSIDE`}</ContainerTitleText>
          <ContainerTitleText style={{ "color": "#68c12f" }}>{`AMAZING`}</ContainerTitleText>
          <ContainerTitleText style={{ "color": "#fa423e" }}>{`ARTISTS`}</ContainerTitleText>
        </ContainerTitle>
        <ContainerOutline />
        <NftScroll>
          {showNfts}
        </NftScroll>
      </LaunchContainer>
      <SocialsBar>
        <SocialsLine />
        <SocialsIcons>
          <IconContainer>
            <Icon src={telegram} />
            <IconText>
              {`Telegram`}
            </IconText>
          </IconContainer>
          <IconContainer>
            <Icon src={twitter} />
            <IconText>
              {`Twitter`}
            </IconText>
          </IconContainer>
          <IconContainer>
            <Icon src={medium} />
            <IconText>
              {`Medium`}
            </IconText>
          </IconContainer>
          <IconContainer>
            <Icon src={discord} />
            <IconText>
              {`Discord`}
            </IconText>
          </IconContainer>
        </SocialsIcons>
      </SocialsBar>
    </Landing >
  );
};

const ContainerTitleText = styled.span`
padding-left: 6px;
`

const LandingTitle = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`

const Landing = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
height: calc(100vh - ${props => props.theme.topBarSize}px + 1px);
width: ${props => props.theme.homeWidth}px;
max-width: 80vw;

`

const IconText = styled.div`
  color: white;
  font-size: small;
  padding-right: 4px;
`;

const IconContainer = styled.div`
  margin-left:4px;
  margin-right:4px;
  align-items: center;
  border: solid #707070;
  border-radius: 25px;
  border-width: 2px 2px 2px 2px;
  background-color: #131313;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  height: 20px;
  padding-left: 4px;
`;

const SocialsIcons = styled.div`
  z-index: 2;
  display: flex;
  flex-direction:row;
  margin-left: auto;
  margin-right: auto;
`;

const SocialsLine = styled.hr`
  background-color: #707070;
  z-index: 1;
  width: 100%;
  position: absolute;
`;

const SocialsBar = styled.div`
  width: 85%;
  position:relative;
  display: flex;
  justify-content: center;
`;

const NftScroll = styled.div`
justify-content: center;
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-around;
        &:nth-child(2) {
          background-color: white;
        }
        &:nth-child(0) {
          display: none;
        }
        &:nth-child(1) {
          display: none;
        }
@media only screen and (min-width: 991px) {
    }
`
  ;

const LaunchContainer = styled.div`
  position:relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerTitle = styled.span`
  position: absolute;
  font-weight: bold;
  left: calc(10% + 50px);
  top: -4px;
  padding: 0 12px;
  font: Compita;
  background-color: ${props => props.theme.bgColor};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 24px;
`;

const StyledTitle = styled.div`
  font-family: Compita;
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: 16px;
  font-weight: bold;
  letter-spacing: 3px;
  color: white;
`;

const NftFmTagline = styled.div`
  padding-bottom: 20px;
  font-size: large;
  color: white;
  text-align: center;
  text-wrap: wrap;
`;

export default Listen;