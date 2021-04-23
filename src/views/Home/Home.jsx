import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes, css } from "styled-components";
import BaseView from "../BaseView";
import axios from "axios";
import logo from "../../assets/img/logos/logo.png";
import greenCheckMark from "../../assets/img/green_check.png";
import grayCheckMark from "../../assets/img/gray_check.png";
import Landing from "./Landing";
import demoImage from "../../assets/img/metamask_fox.svg";
import { FAQ } from "./FAQ/FAQ"

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Switch>
      <BaseView>
        <Landing />
        <Divider />
        <DescriptionBoxContainer>
          <DescriptionColumn>
            <StyledHeader>Welcome to NFT FM</StyledHeader>
            <StyledSubHeader>collect music from artists you know and love</StyledSubHeader>
            <StyledParagraph>*insert text about stuff, NFTs. Maybe insert button to go purchase nfts or redirect to some more info. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel pretium orci. Morbi cursus faucibus libero vel sagittis. Vestibulum id consequat lacus. Nam porttitor ipsum ut lacinia consequat. Integer condimentum auctor convallis. Morbi tempor turpis vel diam fermentum imperdiet. Pellentesque at ex ac augue pretium cursus eget vitae sapien. Nam eu ligula a felis porta consequat a sit amet eros. Duis ornare interdum eros, quis malesuada lacus hendrerit at.</StyledParagraph>
          </DescriptionColumn>
          <DemoImage src={demoImage} />
        </DescriptionBoxContainer>
        <LaunchContainer>
          <ContainerTitle>
            ROADMAP
          </ContainerTitle>
          <ContainerOutline />
          <LaunchFeaturesContainer>
            <LaunchFeaturesBox>
              <LaunchFeaturesHeader>Pre-Launch</LaunchFeaturesHeader>
              <LaunchFeatureList>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Artist outreach
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Smart contracts developed
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Opensea integration completed
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Smart contracts audited
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
              </LaunchFeatureList>
            </LaunchFeaturesBox>
            <LaunchFeaturesBox>
              <LaunchFeaturesHeader>Q2</LaunchFeaturesHeader>
              <LaunchFeatureList>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    NFT auctions*
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Public profiles
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    On-platform resale
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Governance token
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
              </LaunchFeatureList>
            </LaunchFeaturesBox>
          </LaunchFeaturesContainer>
        </LaunchContainer>
        <LaunchContainer>
          <ContainerTitle faq>
            <b className="first">F</b>requently<b>A</b>sked<b>Q</b>uestions
          </ContainerTitle>
          <ContainerOutline />
          <FAQ />
        </LaunchContainer>

        {/* <Container>
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
            {/* </FaqsColumn>
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
        </Container> */}
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
  margin-top: 0;
  margin-bottom: 30px;
  align-self: center;
  color: white;
  font-family: "Compita";
`;

const Checkmark = styled.img`
  max-height: 25px;
  max-width: 25px;
  margin-left: auto;
  // margin-right: 5px;
  `;

const LaunchFeatureText = styled.div`
  // margin-left: 4px;
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
  justify-content: flex-start;
  width: calc(48% - 64px);
  padding: 32px;
  border-radius: ${props => props.theme.borderRadius}px;
  border: solid 1px #262626;
  background-color: #181818;
  padding-bottom: 50px;
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
  background-color: #181818;
  border-radius: ${props => props.theme.borderRadius}px;

  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-around;
  // /* height: calc(100vh - ${props => props.theme.topBarSize}px + 1px); */
  // width: calc(48% - 64px);
  // padding-top: 32px;
  // color: white;
  //   font-size: ${props => props.theme.fontSizes.xs};

  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const LaunchContainer = styled.div`
  position:relative;
  // border-radius: ${props => props.theme.borderRadius}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 40px;
`;

const FillerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: gray;
  margin-left: 10px;
  margin-right: 10px;
`

// const ContainerTitle = styled.div`
// position:absolute;
//   top: -10px;
//   left: 5%;
//   padding-left:2px;
//   padding-right:2px;
//   color: #383838;
//   font: "Compita";
//   background-color: #131313;
//   display: flex;
//   flex-direction: row;
// `;


const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -8px;
  padding: 0 12px;
  font: "Compita";
  background-color: ${props => props.theme.bgColor};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.faq ? "#3d3d3d" : props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  b {
    margin-left: 5px;
    // font-size: 18px;
    color: ${props => props.theme.color.gray};
    font-size: ${props => props.theme.fontSizes.sm}
  }
  b.first{
    margin-left: 0px;
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
`;

const ContainerTitleText = styled.span`
padding-left: 6px;
`

const LaunchFeaturesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`
export default Listen;