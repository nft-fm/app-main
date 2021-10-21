import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../../components/Page/BaseView";
import { FAQ } from "./Components/FAQ/FAQ";
import Tokenomics from "./Components/Tokenomics";
import VinylLinks from "./Components/VinylLinks";

const Vinyl = () => {
  return (
    <Switch>
      <BaseView>
        <Landing>
          <LandingTitle>
            {/* <Logo src={logo} /> */}
            <StyledTitle>VINYL</StyledTitle>
            <StyledContent>
              Driving FANFARE forward through community interactions
            </StyledContent>
            <VinylLinks />
            {/* <NftFmTagline>Tune in to your favorite community.</NftFmTagline> */}
          </LandingTitle>
        </Landing>
        <Tokenomics />
        <FAQ />
      </BaseView>
    </Switch>
  );
};
const StyledContent = styled.div`
  width: 60%;
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 3px;
  color: white;
  text-align: center;
`;

const LandingTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
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

export default Vinyl;
