import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../components/NftCard/NftCard";
import GenericBanner from "../../assets/img/generic_banner.jpg";
import logo from "../../assets/img/logos/logo.png";
import discord from "../../assets/img/socials/social_discord.png";
import medium from "../../assets/img/socials/social_medium.png";
import telegram from "../../assets/img/socials/social_telegram.png";
import twitter from "../../assets/img/socials/social_twitter.png";

const Listen = () => {
  const [nfts, setNfts] = useState([])
  const getNfts = () => {
    axios.get("/api/nft-type/all").then((res) => setNfts(res.data))
  }

  useEffect(() => {
    getNfts()
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
      <Container>
        <ContainerTitle>
          <text>
            {`PROUD TO`}
            <span style={{ "color": "blue", "padding": "3px" }}>{`LAUNCH`}</span>
            <span style={{ "color": "yellow", "padding": "3px" }}>{`ALONGSIDE`}</span>
            <span style={{ "color": "green", "padding": "3px" }}>{`AMAZING`}</span>
            <span style={{ "color": "red", "padding": "3px" }}>{`ARTISTS`}</span>
          </text>
        </ContainerTitle>
        <ContainerOutline />
        <NftScroll>
          {showNfts}
        </NftScroll>
      </Container>
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
    </Landing>
  );
};

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
z-index: 4;
margin-top: 1.5%;
display: flex;
flex-direction: row;
max-width: 115%;
overflow-x: auto;
&::-webkit-scrollbar {
  height: 12px;
  background-color: rgba(256, 256, 256, 0.1);
}
&::-webkit-scrollbar-thumb {
  background-color: rgba(240, 31, 103, 0.4);
  border-radius: 15px;
}`;

const Container = styled.div`
  position:relative;
  width: 85%;
`;

const ContainerTitle = styled.div`
position:absolute;
  top: -10px;
  left: 5%;
  padding-left:2px;
  padding-right:2px;
  z-index:2;
  color: #383838;
  font: Compita;
  background-color: #131313;
  display: flex;
  flex-direction: row;
`;

const ContainerOutline = styled.div`
  z-index: 1;
  position:absolute;
  border: 10px;
  border-radius: 15px;
  border: solid #383838;
  height: 200px;
  width: 100%;
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