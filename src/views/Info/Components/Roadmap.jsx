import React from "react";
import styled from "styled-components";
import greenCheckMark from "../../../assets/img/green_check.png";
import grayCheckMark from "../../../assets/img/gray_check.png";

const Roadmap = () => {
  return (
    <LaunchContainer>
      <ContainerTitle>ROADMAP</ContainerTitle>
      <ContainerOutline />
      <LaunchFeaturesContainer>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader>Q2 2021</LaunchFeaturesHeader>
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
                Opensea Integration Completed
              </LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>Smart Contracts Audited</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>Marketplace Launched</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
          </LaunchFeatureList>
        </LaunchFeaturesBox>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader>Q3 2021</LaunchFeaturesHeader>
          <LaunchFeatureList>
          <LaunchFeatureRow>
              <LaunchFeatureText>Streamlined Artist Uploading</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>Growth of Artist Community</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>BSC Cross-Chain Integration</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>
                      <LaunchFeatureRow>
              <LaunchFeatureText>Artist Staking and Fanclubs</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={greenCheckMark} />
            </LaunchFeatureRow>

          </LaunchFeatureList>
        </LaunchFeaturesBox>
      </LaunchFeaturesContainer>
      <LaunchFeaturesContainer style={{marginTop: "40px"}}>
        <LaunchFeaturesBox >
          <LaunchFeaturesHeader>Q4 2021</LaunchFeaturesHeader>
          <LaunchFeatureList>
          <LaunchFeatureRow>
              <LaunchFeatureText>Public User Profiles</LaunchFeatureText>
              <FillerLine />
              {/* <Checkmark src={grayCheckMark} /> */}
              in progress
            </LaunchFeatureRow>
          <LaunchFeatureRow>
              <LaunchFeatureText>Auctions</LaunchFeatureText>
              <FillerLine />
              {/* <Checkmark src={grayCheckMark} /> */}
              in progress
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>Fiat Payment</LaunchFeatureText>
              <FillerLine />
              {/* <Checkmark src={grayCheckMark} /> */}
              in progress
            </LaunchFeatureRow>
          <LaunchFeatureRow>
              <LaunchFeatureText>New Blockchain Integration (FLOW)</LaunchFeatureText>
              <FillerLine />
              {/* <Checkmark src={grayCheckMark} /> */}
              in progress
            </LaunchFeatureRow>
          </LaunchFeatureList>
        </LaunchFeaturesBox>
        <LaunchFeaturesBox>
          <LaunchFeaturesHeader>Q1 2022</LaunchFeaturesHeader>
          <LaunchFeatureList>
          <LaunchFeatureRow>
              <LaunchFeatureText>Mass Artist Outreach</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={grayCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>NFT Cross-Chain Bridge</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={grayCheckMark} />
            </LaunchFeatureRow>
            <LaunchFeatureRow>
              <LaunchFeatureText>Much More TBA Soon!</LaunchFeatureText>
              <FillerLine />
              <Checkmark src={grayCheckMark} />
            </LaunchFeatureRow>
          </LaunchFeatureList>
        </LaunchFeaturesBox>
      </LaunchFeaturesContainer>
    </LaunchContainer>
  );
};

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
  height: 25px;
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
  width: calc(48% - 54px);
  padding: 32px;
  border-radius: ${(props) => props.theme.borderRadius}px;
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
const LaunchContainer = styled.div`
  position: relative;
  // border-radius: ${(props) => props.theme.borderRadius}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  /* margin-bottom: 40px; */
`;

const FillerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: gray;
  margin-left: 10px;
  margin-right: 10px;
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
export default Roadmap;
