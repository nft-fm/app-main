import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../components/NftCards/SaleNftCard";
import logo from "../../assets/img/logos/logo.png";
import { ReactComponent as IconDiscord } from "../../assets/img/icons/coins.svg";
import { ReactComponent as IconMedium } from "../../assets/img/icons/social_medium.svg";
import { ReactComponent as IconTelegram } from "../../assets/img/icons/social_telegram.svg";
import { ReactComponent as IconTwitter } from "../../assets/img/icons/social_twitter.svg";
import { useAccountConsumer } from "../../contexts/Account";
import LoadingFeatured from "../../components/NftCards/LoadingFeatured";

const Listen = () => {
  const { user, account } = useAccountConsumer();
  const [nfts, setNfts] = useState(<LoadingFeatured />)

  const formatNfts = (nftsData) => {
    return nftsData.map((nft) => {
      return (
        <NftCard nft={nft} />
      )
    });
  }

  const getFeatured = () => {
    axios.post("/api/nft-type/featured", {address: account}).then((res) => {
      const formattedNfts = formatNfts(res.data);
      setTimeout(function () {
        formattedNfts.push(<FillerCard />);
        setNfts(formattedNfts);
      }, 800)
    })
  }

  useEffect(() => {
    getFeatured();
  }, [user])

  return (
    <Landing>
      <LandingTitle>
        <Logo src={logo} />
        <StyledTitle>
          NFT FM
        </StyledTitle>
        <NftFmTagline>
          Tune in to your favorite artists.
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
        <NftScroll> {nfts} </NftScroll>
      </LaunchContainer>
      <SocialsBar>
        <IconContainer>
          <Telegram />
          <IconText>
            Telegram
          </IconText>
        </IconContainer>
        <IconContainer>
          <Medium />
          <IconText>
            Medium
          </IconText>
        </IconContainer>
        <IconContainer>
          <Twitter />
          <IconText>
            Twitter
          </IconText>
        </IconContainer>
        <IconContainer>
          <Discord />
          <IconText>
            Discord
          </IconText>
        </IconContainer>
      </SocialsBar>
    </Landing >
  );
};

const FillerCard = styled.div`
width: 226px;
height: 0px;
`

const Discord = styled(IconDiscord)`
width: 18px;
height: 18px;
& path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.white};
    }
`

const Twitter = styled(IconTwitter)`
width: 18px;
height: 18px;
& path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.white};
    }
`

const Medium = styled(IconMedium)`
width: 18px;
height: 18px;
& path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.white};
    }
`

const Telegram = styled(IconTelegram)`
width: 18px;
height: 18px;
& path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.white};
    }
`

const IconText = styled.span`
margin: 1px 0 0 12px;
font-weight: 600;
letter-spacing: 1px;
`

const ContainerTitleText = styled.span`
padding-left: 6px;
`

const LandingTitle = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
margin-bottom: 40px;
`

const Landing = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
/* height: calc(100vh - ${props => props.theme.topBarSize}px + 1px); */
width: 100%;
padding-top: 40px;
color: white;
  font-size: ${props => props.theme.fontSizes.xs};
`

const IconContainer = styled.a`
margin: 0 8px;
  align-items: center;
  border: solid #707070;
  height: 28px;
  width: 98px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${props => props.theme.color.boxBorder};
  border-radius: 18px;
  background-color: ${props => props.theme.color.box};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
  background-color: ${props => props.theme.color.boxBorder};
  border: solid 1px #383838;
  }
`;


const SocialsBar = styled.div`
  width: 100%;
  position:relative;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const NftScroll = styled.div`
justify-content: center;
display: flex;
flex-flow: row wrap;
width: 100%;
justify-content: space-between;
/* @media only screen and (max-width: 1500px) {
  & > * {
    &:nth-last-child(1) {
        display: none;
   }}}
   @media only screen and (max-width: 1191px) {
  & > * {
    &:nth-last-child(2) {
        display: none;
   }}}
   @media only screen and (max-width: 890px) {
  & > * {
    &:nth-last-child(3) {
        display: none;
   }}} */
`;

const LaunchContainer = styled.div`
  position:relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -4px;
  padding: 0 12px;
  font: "Compita";
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
  height: 153.84px;
  margin-bottom: 24px;
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${props => props.theme.fontSizes.xl};
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
  text-wrap: wrap;
`;

export default Listen;