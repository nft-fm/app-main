import React, { useEffect, useState } from "react";
import styled from "styled-components";
import isMobile from "../../../../utils/isMobile";

const Tokenomics = () => {
  return (
    <LaunchContainer>
      <ContainerTitle>
        <span>TOKENOMICS / INFO</span>
      </ContainerTitle>
      <NftContainerRight
        href="https://drive.google.com/file/d/1BHmrjYef0FBp4Q0I-juXVfllviT0Paj9/view?usp=sharing"
        target="_blank"
      >
        CONTRACT AUDIT
      </NftContainerRight>
      <ContainerOutline />
      <LaunchFeaturesContainer>
        <LaunchFeaturesBox className="topBox">
          <LaunchFeaturesHeader style={{ color: "#20a4fc" }}>
            TEAM / PROJECT
          </LaunchFeaturesHeader>
          <SubHolder>
            <LaunchFeaturesTextLarge>7%</LaunchFeaturesTextLarge>
            <LaunchFeaturesTextSmallGray>
              For investors, advisors, community builders, content creators
            </LaunchFeaturesTextSmallGray>
          </SubHolder>

          <br />
          <SubHolder>
            <LaunchFeaturesTextLarge>14.25% 🔒</LaunchFeaturesTextLarge>
            <LaunchFeaturesTextSmallGray>
              Locked for 6 months.
            </LaunchFeaturesTextSmallGray>
            <LaunchFeaturesTextSmallGray>
              For advertising, marketing, development
            </LaunchFeaturesTextSmallGray>
          </SubHolder>
        </LaunchFeaturesBox>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader style={{ color: "#fde404" }}>
            CIRCULATING
          </LaunchFeaturesHeader>
          <MiniSpacer />
          <SubHolder>
            <LaunchFeaturesTextLargest>43.75%</LaunchFeaturesTextLargest>
            <LaunchFeaturesTextSmallGray>
              In circulation within the Fanfare community
            </LaunchFeaturesTextSmallGray>
          </SubHolder>
          <MiniSpacer />
          <br />
        </LaunchFeaturesBox>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader style={{ color: "#68c12f" }}>
            LIQUIDITY
          </LaunchFeaturesHeader>
          <MiniSpacer />
          <SubHolder>
            <LaunchFeaturesTextLargest>5%</LaunchFeaturesTextLargest>
            <LaunchFeaturesTextSmallGray>
              Greater than 10% of the circulating supply
            </LaunchFeaturesTextSmallGray>
          </SubHolder>
          <MiniSpacer />
          <br />
        </LaunchFeaturesBox>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader style={{ color: "#fa423e" }}>
            AIRDROPS
          </LaunchFeaturesHeader>
          {/* <MiniSpacer /> */}
          <SubHolder>
            <LaunchFeaturesTextLarge>30%</LaunchFeaturesTextLarge>
            <LaunchFeaturesTextSmallGray>
              120,000 $VINYL to be airdropped to NFT owners
            </LaunchFeaturesTextSmallGray>
          </SubHolder>
            <br />
          <SubHolder>
            <LaunchFeaturesTextLarge>2,500</LaunchFeaturesTextLarge>
            <LaunchFeaturesTextSmallGray>
              $VINYL Airdropped every month
            </LaunchFeaturesTextSmallGray>
          </SubHolder>
          {/* <MiniSpacer /> */}
        </LaunchFeaturesBox>
      </LaunchFeaturesContainer>
    </LaunchContainer>
  );
};

const NftContainerRight = styled.a`
  text-decoration: none;
  white-space: nowrap;
  position: absolute;
  font-weight: 600;
  margin-left: 75%;
  margin-right: 25%;
  height: 17px;
  /* width: 17px; */
  top: -13px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.lightgray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  &:hover {
    color: white;
  }
  @media only screen and (max-width: 776px) {
    margin-left: auto;
    margin-right: auto;
    top: 30px;
  }
`;

const Title = styled.h1`
  margin: 0;
  /* margin-top: -12px; */
`;
const BulletPoint = !isMobile()
  ? styled.span`
      margin-bottom: 10px;
      text-align: left;
      font-size: 16px;
      width: 100%;
      margin: 0;
      padding: 0;
    `
  : styled.span`
      margin-bottom: 10px;
      text-align: left;
      font-size: 16px;
      width: 100%;
    `;

const Divider = !isMobile()
  ? styled.div`
      height: 1px;
      width: 100%;
      background-color: rgba(256, 256, 256, 0.6);
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      margin: 5px 0 20px 0;
    `
  : styled.div`
      height: 1px;
      width: 90%;
      background-color: rgba(256, 256, 256, 0.6);
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      margin: 5px 0 20px 0;
    `;

const UtilityContainer = styled.div`
  margin-top: 80px;
  color: white;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 32px;
  margin-bottom: 40px;
  border: solid 1px #262626;
  background-color: #181818;
`;

const LaunchContainer = styled.div`
  position: relative;
  // border-radius: ${(props) => props.theme.borderRadius}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 60px; */
  @media only screen and (max-width: 800px) {
    margin-top: 80;
  }
`;
const ContainerTitle = styled.div`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -17px;
  padding: 5px 8px 3px 8px;
  font: "Compita";
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  @media only screen and (max-width: 776px) {
    left: auto;
    margin-left: auto;
    margin-right: auto;
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
    height: 65px;
  }
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
`;
const LaunchFeaturesBox = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
  padding: 20px;
  /* height: 300px; */
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px #262626;
  background-color: #181818;
  @media only screen and (max-width: 1200px) {
    padding: 10px;
  }
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
    margin-bottom: 20px;
    height: auto;
    /* &.topBox {
      margin-top: 25px;
    } */
  }
`;

const LaunchFeaturesHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 30px;
  align-self: center;
  color: white;
  font-family: "Compita";
  @media only screen and (max-width: 1200px) {
    margin-bottom: 10px;
  }
`;

// const LaunchFeaturesContent = styled.div`
//   width: 100%;
//   height: auto;
//   display: flex;
//   flex-direction: column;
//   margin-top: 40%;
//   margin-bottom: 60%;
// `;

const LaunchFeaturesTextLargest = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-weight: 600;
  text-align: center;
  color: white;
  height: 105px;
  @media only screen and (max-width: 776px) {
    /* font-size: ${(props) => props.theme.fontSizes.md}; */
    height: auto;
  }
`;
const LaunchFeaturesTextLarge = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 600;
  text-align: center;
  color: white;
  @media only screen and (max-width: 1200px) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: 776px) {
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;

const LaunchFeaturesTextSmallGray = styled.span`
  font-size: 0.85rem;
  font-size: ${(props) => props.theme.fontSizes.xs};
  text-align: center;
  color: ${(props) => props.theme.color.lightgray};
  @media only screen and (max-width: 1200px) {
    font-size: 0.85rem;
  }
  @media only screen and (max-width: 776px) {
    font-size: ${(props) => props.theme.fontSizes.xs};
  }
`;

const SubHolder = styled.div`
  display: flex;
  flex-direction: column;
  height: 105px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
`;

const MiniSpacer = styled.div`
  height: 51px;
`;

export default Tokenomics;
