import React from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Landing from "./Components/Landing";
import Swal from "sweetalert2";
import { Features } from "./Components/Features";
import DemoImage from "./Components/DemoImage/DemoImage";
import { ReactComponent as rightArrow } from "../../assets/img/homepage_assets/right-arrow-3.svg";
import { errorIcon, imageWidth, imageHeight } from "../../utils/swalImages";


const Listen = () => {

  if (
    window.location.hostname === "localhost" &&
    process.env.REACT_APP_IS_MAINNET
  ) {
    Swal.fire({
      title: `You are on MAINNET and LOCALHOST be careful`,
      text: `🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆`,
      imageUrl: errorIcon,
      imageWidth,
      imageHeight
    });
  }

  return (
    <Switch>
      <BaseView>
        <Landing />
        <Divider />
        <Features />
        <Divider />
        <DemoImage />
        <StyledHeader>Are you an artist? Launch with us!</StyledHeader>
        <StyledAccountButton href="mailto:info@nftfm.io" target="_blank">
          Contact us!
        </StyledAccountButton>
        <DescriptionLink to="/info">
          <DescriptionBox>
            <InfoHeaderContainer>
              <InfoHeader>Info Page</InfoHeader>
              <RightArrow />
            </InfoHeaderContainer>
            <InfoDetails>Learn more about our project!</InfoDetails>
          </DescriptionBox>
        </DescriptionLink>
      </BaseView>
    </Switch>
  );
};

const DescriptionLink = styled(NavLink)`
  width: 60%;
  text-decoration: none;
`;

const RightArrow = styled(rightArrow)`
  width: 18px;
  height: 18px;
  margin-top: 9px;
  margin-left: 10px;
  & path {
    fill: white;
    font-weight: 900;
  }
`;

const StyledAccountButton = styled.a`
  margin-top: -20px;
  width: 200px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 45px;
  border-radius: 20px;
  font-size: 20px;
  font-family: "Compita";
  background-color: #181818;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const DescriptionBox = styled.div`
  margin: 80px 0;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 32px;
  border: solid 1px #262626;
  background-color: #181818;
`;

const StyledHeader = styled.h1`
  display: flex;
  color: white;
  margin: 0 0 24px 0;
  font-family: "Compita";
  padding: 32px 0px;
  text-align: center;
`;

const InfoHeader = styled.h1`
  color: white;
  margin: 0 0 16px 0;
  font-family: "Compita";
  text-align: center;
  text-decoration: none;
`;

const InfoHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const InfoDetails = styled.h2`
  text-decoration: none;
  color: #d3d3d3;
  font-family: "Compita";
  text-align: center;
  font-size: 22px;
  margin: 0px;
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

export default Listen;
