import React, { useEffect, useState } from "react";
import styled from "styled-components";
import isMobile from "../../../utils/isMobile";

const Tokenomics = () => {

  return (
    <>
      <LaunchContainer>
        <ContainerTitle 
        // onClick={() => approve()}
        >TOKENOMICS</ContainerTitle>
        <ContainerOutline />
        <LaunchFeaturesContainer>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#20a4fc" }}>
              TEAM / PROJECT
            </LaunchFeaturesHeader>
            <SubHolder>
              <LaunchFeaturesTextLarge>10%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                For investors, advisors, community builders, content creators
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
            {/* <br />
            <SubHolder>
              <LaunchFeaturesTextLarge>5%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                for Investors
              </LaunchFeaturesTextSmallGray>
            </SubHolder> */}

            <br />
            <SubHolder>
              <LaunchFeaturesTextLarge>15% 🔒</LaunchFeaturesTextLarge>
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
              SALES
            </LaunchFeaturesHeader>
            <SubHolder>
              <LaunchFeaturesTextLarge>
                Private Sale: 15%
              </LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                750,000 $VINYL at $1 per
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
            <br />
            <SubHolder>
              <LaunchFeaturesTextLarge>Presale: 20%</LaunchFeaturesTextLarge>
              <LaunchFeaturesTextSmallGray>
                1,000,000 $VINYL at $1.25 per
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
          </LaunchFeaturesBox>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#68c12f" }}>
              LIQUIDITY
            </LaunchFeaturesHeader>
            {/* <LaunchFeaturesContent> */}
            <LaunchFeaturesTextLargest>10%</LaunchFeaturesTextLargest>
            <br />
            <SubHolder />
            {/* </LaunchFeaturesContent> */}
          </LaunchFeaturesBox>
          <LaunchFeaturesBox>
            <LaunchFeaturesHeader style={{ color: "#fa423e" }}>
              AIRDROPS
            </LaunchFeaturesHeader>
            <SubHolder>
              <LaunchFeaturesTextLargest>30%</LaunchFeaturesTextLargest>
              <LaunchFeaturesTextSmallGray>
                1,500,000 $VINYL to be airdropped to NFT owners and platform
                users
              </LaunchFeaturesTextSmallGray>
            </SubHolder>
            <br />
            <SubHolder />
          </LaunchFeaturesBox>
        </LaunchFeaturesContainer>
      </LaunchContainer>
      <UtilityContainer>
        <Title>Utility </Title>
        <Divider />
        <BulletPoint>
          -Make and vote on proposals for new features or changes to NFTFM
        </BulletPoint>
        <BulletPoint>
          -Votes are weighted based on the amount of $VINYL that the user holds
        </BulletPoint>
        <BulletPoint>
          -On a regular basis, $VINYL holders will be polled on a decision being
          made. They get to vote on these corporate decisions with their vote
          being weighted by their coin ownership
        </BulletPoint>
        <BulletPoint>
          -Token holders likes cast on the site are weighted based off of the
          quantity of $VINYL that they hold
        </BulletPoint>
      </UtilityContainer>
    </>
  );
};

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
      width: calc(100% + 80px);
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

const UtilityContainer = !isMobile()
  ? styled.div`
      width: 60%;
      color: white;
      padding: 20px 0;
      align-items: center;
      position: relative;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 80px;
    `
  : styled.div`
      width: 100%;
      color: white;
      align-items: center;
      position: relative;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 80px;
    `;
const LaunchContainer = styled.div`
  position: relative;
  // border-radius: ${(props) => props.theme.borderRadius}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 40px; */
`;
const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: ${(props) => (props.faq ? "-8px" : "-8px")};
  padding: 0 12px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  b {
    margin-left: 5px;
    // font-size: 18px;
    color: ${(props) => props.theme.color.gray};
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
  b.first {
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

export default Tokenomics;