import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes } from "styled-components";
import BaseView from "../BaseView";
import axios from "axios";
import NftCard from "../../components/NftCards/NftCard";
import logo from "../../assets/img/logos/logo.png";
import greenCheckMark from "../../assets/img/green_check.png";
import grayCheckMark from "../../assets/img/gray_check.png";
import Landing from "./Landing";
import demoImage from "../../assets/img/metamask_fox.svg";


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
        <Landing />
        <Divider />
        <DescriptionBoxContainer>
          <DescriptionColumn>
            <StyledHeader>Music. Artists. NFTs.</StyledHeader>
            <StyledSubHeader>There is dank things</StyledSubHeader>
            <StyledParagraph>*insert text about stuff, NFTs. Maybe insert button to go purchase nfts or redirect to some more info. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel pretium orci. Morbi cursus faucibus libero vel sagittis. Vestibulum id consequat lacus. Nam porttitor ipsum ut lacinia consequat. Integer condimentum auctor convallis. Morbi tempor turpis vel diam fermentum imperdiet. Pellentesque at ex ac augue pretium cursus eget vitae sapien. Nam eu ligula a felis porta consequat a sit amet eros. Duis ornare interdum eros, quis malesuada lacus hendrerit at.</StyledParagraph>
          </DescriptionColumn>
          <DemoImage src={demoImage} />
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
      </BaseView>
    </Switch>
  );
};

const DescriptionColumn = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`

const DemoImage = styled.img`
  height: 213px;
  width: auto;
  margin: auto 0 auto 20%;
`

const Divider = styled.div`
width: 80%;
height: 4px;
border-radius: 2px;
background-color: ${props => props.theme.color.boxBorder};
margin-bottom: 80px;
`

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

`;

const LaunchFeaturesHeader = styled.h3`
  align-self: center;
  color: white;
  font-family: "Compita";
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
  font-family: "Compita";
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
  height: 220px;
`;

const LaunchFeatureBoxRight = styled(LaunchFeaturesBox)`
  margin: 2.5% -2% 0 52%;
`;

const LaunchFeatureBoxLeft = styled(LaunchFeaturesBox)`
  /* margin: 2.5% 0 0 -2%; */
`;

const StyledParagraph = styled.p`
  margin: 0;
  color: white;
  font-family: "Compita";
`;

const StyledSubHeader = styled.h2`
  color: white;
  font-family: "Compita";
  margin: 0 0 24px 32px;
`;

const StyledHeader = styled.h1`
  color: white;
  margin: 0 0 24px 0;
  font-family: "Compita";
`;

const DescriptionBoxContainer = styled.div`
  border-radius: ${props => props.theme.borderRadius}px;
  display:flex;
  flex-direction: row;
  width: calc(100% - 64px);
  padding: 32px;
  margin-bottom: 40px;
  border: solid 1px #262626;
  background-color: #181818;
`;

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
  color: #383838;
  font: "Compita";
  background-color: #131313;
  display: flex;
  flex-direction: row;
`;

const ContainerOutline = styled.div`
  position:absolute;
  border: 10px;
  border-radius: 15px;
  border: solid #383838;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default Listen;