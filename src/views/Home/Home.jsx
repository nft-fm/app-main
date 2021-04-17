import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes } from "styled-components";
import BaseView from "../BaseView";
import axios from "axios";
import NftCard from "../../components/NftCard/NftCard";
import GenericBanner from "../../assets/img/generic_banner.jpg";
import logo from "../../assets/img/logos/logo.png";
import greenCheckMark from "../../assets/img/green_check.png";
import grayCheckMark from "../../assets/img/gray_check.png";

import discord from "../../assets/img/socials/social_discord.png";
import medium from "../../assets/img/socials/social_medium.png";
import telegram from "../../assets/img/socials/social_telegram.png";
import twitter from "../../assets/img/socials/social_twitter.png";

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

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
    <Switch>
      <BaseView>
        <Logo src={logo} />
        <StyledTitle>
          NFT FM
        </StyledTitle>
        <NftFmTagline>
          The exciting new technology for building meaningful digital collections,
          brought to you on a platform that's built for everyone
        </NftFmTagline>
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
        <DescriptionBoxContainer>
          <StyledHeader>Aliquam eu dapibus velit.</StyledHeader>
          <StyledSubHeader>Aliquam non iaculis mauris, ac placerat magna</StyledSubHeader>
          <StyledParagraph>*insert text about stuff, NFTs. Maybe insert button to go purchase nfts or redirect to some more info. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel pretium orci. Morbi cursus faucibus libero vel sagittis. Vestibulum id consequat lacus. Nam porttitor ipsum ut lacinia consequat. Integer condimentum auctor convallis. Morbi tempor turpis vel diam fermentum imperdiet. Pellentesque at ex ac augue pretium cursus eget vitae sapien. Nam eu ligula a felis porta consequat a sit amet eros. Duis ornare interdum eros, quis malesuada lacus hendrerit at.</StyledParagraph>
        </DescriptionBoxContainer>
        <Container>
          <ContainerTitle>
            <text style={{ "color": "#5c5c5c" }}>ROADMAP</text>
          </ContainerTitle>
          <ContainerOutline />
          <LaunchFeatureBoxLeft>
            <LaunchFeaturesHeader>Launch Features</LaunchFeaturesHeader>
            <LaunchFeatureList>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Minting and Selling NFTs
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Claiming $$$ earned from contract
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Browsing available NFTs (toggle sort used vs resale)
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Purchasing and reselling via OpenSea links
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Social media sharing
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Public artist profile page
                </LaunchFeatureText>
                <Checkmark src={greenCheckMark} />
              </LaunchFeatureRow>
            </LaunchFeatureList>
          </LaunchFeatureBoxLeft>
          <LaunchFeatureBoxRight>
            <LaunchFeaturesHeader>Immediate Post-Launch Features</LaunchFeaturesHeader>
            <LaunchFeatureList>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Auction NFTs
                </LaunchFeatureText>
                <Checkmark src={grayCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Public profile pages
                </LaunchFeatureText>
                <Checkmark src={grayCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  Artist can set their sub-url
                </LaunchFeatureText>
                <Checkmark src={grayCheckMark} />
              </LaunchFeatureRow>
              <LaunchFeatureRow>
                <LaunchFeatureText>
                  'Share via social media' buttons
                </LaunchFeatureText>
                <Checkmark src={grayCheckMark} />
              </LaunchFeatureRow>
            </LaunchFeatureList>
          </LaunchFeatureBoxRight>
        </Container>
        <div style={{ "height": "40px", "margin-top": "250px" }} />
        <Container>
          <ContainerTitle>
            <text style={{ "color": "#5c5c5c" }}>Frequently Asked Questions</text>
          </ContainerTitle>
          <ContainerOutline />
          <FaqsContainer>
            <FaqsColumn>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
            </FaqsColumn>
            <FaqsColumn>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
              <FaqQuestion> Q: Does Quinn's cat have smelly feet?</FaqQuestion>
              <FaqAnswer>A : Yes it is perfectly possible they have smelly feet, We will only be able to confirm this after launch</FaqAnswer>
            </FaqsColumn>
            <FaqsColumn>
              <div style={{ "color": "white" }}>
                Insert photo and styled box
              </div>
            </FaqsColumn>
          </FaqsContainer>
        </Container>
        <div style={{ "height": "40px", "margin-top": "250px" }} />
      </BaseView>
    </Switch>
  );
};

const FaqQuestion = styled.div`
  font-size: large;
  color: white;
`;

const FaqAnswer = styled.div`
  color: white;
  margin-bottom: 4px;
`;

const FaqsColumn = styled.div`
  width: 33%;
  max-width: 33%;
  display:flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const FaqsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  margin-left: -2.5%;
  position: absolute;
  width: 105%;
  border-radius: 20px;
  border: solid 1px #262626;
  background-color: #181818;
  z-index: 2;

`;

const LaunchFeaturesHeader = styled.h3`
  align-self: center;
  color: white;
  font-family: Compita;
`;

const Checkmark = styled.img`
  max-height: 25px;
  max-width: 25px;
  margin-left: auto;
  margin-right: 5px;
  `;

const LaunchFeatureText = styled.div`
  margin-left: 4px;
`;

const LaunchFeatureList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LaunchFeatureRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 25px;
  font-family: Compita;
  font-size: medium;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.12;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
`;

const LaunchFeaturesBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 50%;
  border-radius: 20px;
  border: solid 1px #262626;
  background-color: #181818;
  z-index: 2;
  height: 220px;
`;

const LaunchFeatureBoxRight = styled(LaunchFeaturesBox)`
  margin: 2.5% -2% 0 52%;
`;

const LaunchFeatureBoxLeft = styled(LaunchFeaturesBox)`
  margin: 2.5% 0 0 -2%;
`;

const StyledParagraph = styled.div`
  margin-top: -1%;
  color: white;
  font-family: Compita;
`;

const StyledSubHeader = styled.h2`
  color: white;
  font-family: Compita;
  margin-left: 7%;
  margin-top: -2%;
`;

const StyledHeader = styled.h1`
  color: white;
  font-family: Compita;
`;

const DescriptionBoxContainer = styled.div`
  display:flex;
  flex-direction: column;
  width: 55%;
  margin: 40px 240px 60px;
  padding: 40px 153px 30px 30px;
  border-radius: 20px;
  border: solid 1px #262626;
  background-color: #181818;
`;

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
  width: 10%;
`;

const StyledTitle = styled.div`
  font-family: Gilroy-Bold;
  font-size: xxx-large;
  color: white;
  padding: 10px;
`;

const NftFmTagline = styled.div`
  padding-bottom: 20px;
  font-family: Gilroy-Medium;
  font-size: large;
  color: white;
  max-width: 40%;
  text-align: center;
  text-wrap: wrap;
`;

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
  padding: 5px 10px;
  outline: none;
  background-color: #eaeaea;
  border: 4px solid white;
  position: absolute;
  top: -18px;
`;

const InfoSectionContent = styled.span`
  padding: 40px 40px 60px 40px;
  width: 600px;
  max-width: 90%;
  text-align: center;
`;

const NftSectionHolder = styled.div`
  width: 100%;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  flex: 1;
  position: relative;
`;

const NftDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 1200px;
  @media only screen and (max-width: 1337px) {
    width: 900px;
  }
  @media only screen and (max-width: 991px) {
    width: 700px;
  }
  @media only screen and (max-width: 700px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
    justify-content: center;
  }
`;

const InfoHeaderText = styled.div`
  font-family: "Compita";
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: grayscale(50%) brightness(30%);

  font-family: "Compita";
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 40px;
  /* margin-top: -40px; */
  /* margin-top: 50px; */
`;

const Banner = styled.div`
  margin-top: -65px;
  width: 100%;
  height: 365px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 4px solid#7e2ce3;
  z-index: 0;
  background: url(${GenericBanner});
  background-size: cover;
  background-position-y: -70px;
`;

const MainContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
export default Listen;
{/* <LandingSection>
<Banner>
  <HeaderContents>
    Exclusive drops from your favorite Artists.
  </HeaderContents>
</Banner>
</LandingSection>
<MainContents>
<InfoSection>
  {/* <InfoHeaderText>
    NFT <span>FM</span>
  </InfoHeaderText> */}
{/*<InfoSectionContent>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
    lacinia justo non consequat euismod. Praesent venenatis maximus
    purus, a elementum sem ultricies et. Sed sollicitudin congue
    lectus, sit amet suscipit lacus iaculis in. Integer nibh ipsum,
    pulvinar eu scelerisque in, malesuada sit amet lorem. Vivamus at
  </InfoSectionContent>
</InfoSection>
<NftSectionHolder>
  <SearchBar type="text" placeholder="Search..." />
  <NftDisplay>
    {nfts.map((nft) => (
      <NftCard nft={nft} />
    ))}
  </NftDisplay>
</NftSectionHolder>
</MainContents> */}

  // const nfts = [
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris",
  //     image: placeholderImage,
  //     price: 1.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes",
  //     image: placeholderImage,
  //     price: 0.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz",
  //     image: placeholderImage,
  //     price: 1.1,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin'",
  //     image: placeholderImage,
  //     price: 1.3,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 2",
  //     image: placeholderImage,
  //     price: 1.9,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 2",
  //     image: placeholderImage,
  //     price: 1.3,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 2",
  //     image: placeholderImage,
  //     price: 1.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin' 2",
  //     image: placeholderImage,
  //     price: 1.18,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 3",
  //     image: placeholderImage,
  //     price: 10.4,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 3",
  //     image: placeholderImage,
  //     price: 1.04,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 3",
  //     image: placeholderImage,
  //     price: 1,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Snoozin' and Croozin' 3",
  //     image: placeholderImage,
  //     price: 1.9,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Tony in Paris 4",
  //     image: placeholderImage,
  //     price: 1.14,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Here He Comes 4",
  //     image: placeholderImage,
  //     price: 1.45,
  //   },
  //   {
  //     artist: "Big Tone",
  //     title: "Girls Love Big Katz 4",
  //     image: placeholderImage,
  //     price: 4.4,
  //   },
  // ];