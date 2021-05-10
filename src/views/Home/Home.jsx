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
import record from "../../assets/img/record_player_disk.png";

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
            <StyledParagraph>
              We are a music distribution platform dedicated to artists and fans alike. We aim to add legitimacy to both the Music and the Crypto industry by providing fans a way to directly support the artists they love. On NFT FM, artists have full control over how they distribute their music. Over 90% of all purchases go directly to the Musicians.
            </StyledParagraph>
          </DescriptionColumn>
          <DemoImage src={record} />
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
                    Carbon Neutrality Partnerships
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                  Artist Outreach
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Opensea Integration Completed
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={greenCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Smart Contracts Audited
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
                    Full Album NFTs
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Public User Profiles
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    On-Platform Resale
                  </LaunchFeatureText>
                  <FillerLine />
                  <Checkmark src={grayCheckMark} />
                </LaunchFeatureRow>
                <LaunchFeatureRow>
                  <LaunchFeatureText>
                    Credit Card Support
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
  @media only screen and (max-width: 776px) {
    display: none;
  }
`

const Divider = styled.div`
width: 80%;
height: 4px;
border-radius: 2px;
background-color: ${props => props.theme.color.boxBorder};
margin-bottom: 80px;
@media only screen and (max-width: 776px) {
    display: none;
  }
`

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
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;

const StyledParagraph = styled.p`
  color: white;
  font-family: "Compita";
  margin: auto 0;
`;

const StyledSubHeader = styled.h2`
  color: white;
  font-family: "Compita";
  margin: 0 0 24px 32px;
  @media only screen and (max-width: 776px) {
    display: none;
  }
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

const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: ${props => props.faq ? "-8px" : "-8px"};
  padding: 0 12px;
  font: "Compita";
  background-color: ${props => props.theme.bgColor};
  font-size: ${props => props.theme.fontSizes.sm};
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


const LaunchFeaturesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`
export default Listen;