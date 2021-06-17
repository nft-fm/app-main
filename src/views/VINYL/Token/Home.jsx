import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../../components/Page/BaseView";
// import Landing from "./Components/Landing";
import Roadmap from "./Components/Roadmap";
import { FAQ } from "./Components/FAQ/FAQ";
import record from "../../../assets/img/record_player_disk.png";
import logo from "../../../assets/img/logos/logo.png";
import Tokenomics from "./Components/Tokenomics"
import Airdrops from "./Components/Airdrops"

const Listen = () => {
  return (
    <Switch>
      <BaseView>
        <Landing>
          <LandingTitle>
            <Logo src={logo} />
            <StyledTitle>Everything About $VINYL</StyledTitle>
            {/* <NftFmTagline>Tune in to your favorite community.</NftFmTagline> */}
          </LandingTitle>
        </Landing>
        <Tokenomics />
        <FAQ />
      </BaseView>
    </Switch>
  );
};

const LandingTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 100px;
  height: 153.84px;
  margin-bottom: 24px;
`;
const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xl};
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  color: white;
  text-align: center;
`;

const NftFmTagline = styled.div`
  padding-bottom: 20px;
  font-size: large;
  color: white;
  text-align: center;
  white-space: wrap;
`;
const Landing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* height: calc(100vh - ${(props) => props.theme.topBarSize}px + 1px); */
  width: 100%;
  padding-top: 40px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
  /* z-index: 50; */
`;

const DescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DemoImage = styled.img`
  height: 213px;
  width: auto;
  margin: auto 0 auto 20%;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 80%;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.boxBorder};
  margin-bottom: 80px;
  @media only screen and (max-width: 776px) {
    display: none;
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
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: row;
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
  margin-top: 80px;
  margin-bottom: 40px;
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

export default Listen;
