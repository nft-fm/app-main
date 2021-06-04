import React from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Landing from "./Components/Landing";
import Swal from "sweetalert2"
import { Features } from "./Components/Features"
import DemoImage from "./Components/DemoImage/DemoImage"
import send from "../../assets/img/homepage_assets/homepage_send.png"
// import send from "../../assets/img/homepage_assets/homepage_send.png"
import { ReactComponent as rightArrow } from "../../assets/img/homepage_assets/right-arrow-3.svg";

const Listen = () => {
  if (window.location.hostname === "localhost" && process.env.REACT_APP_IS_MAINNET) {
    Swal.fire({
      title: `You are on MAINNET and LOCALHOST be careful`,
      text: `🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆`,
      icon: "error",
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
        <StyledAccountButton href="mailto:info@nftfm.io" target="_blank">Contact us!</StyledAccountButton>
        <DescriptionBoxContainer>
          <InfoHeaderContainer to="/info">
            <InfoHeader>Info Page</InfoHeader>
            <RightArrow />
          </InfoHeaderContainer>
          <InfoDetails>Learn more about our project!</InfoDetails>
        </DescriptionBoxContainer>
      </BaseView>
    </Switch>
  );
};

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

const DescriptionBoxContainer = styled.div`
  margin-top: 80px;
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
  margin: 0 0 16px 18px;
  font-family: "Compita";
  text-align: center; 
  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
  }
`;

const InfoHeaderContainer = styled(NavLink)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

const InfoDetails = styled.h2`
  color: #d3d3d3;
  font-family: "Compita";
  text-align: center;
  font-size: 22px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
  @media only screen and (max-width: 550px) {
    display: none;
  }
`

const InfoSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 17%;
  max-width: 160px;
  img {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  h3 {
    color: white;
    text-align: center;
  }
  section {
    color: #888888;
    text-align: center;
    @media only screen and (max-width: 1200px) {
      height: 52px;
    }
    @media only screen and (max-width: 776px) {
      height: 70px;
    }

  }
`


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


const LaunchContainer = styled.div`
  position: relative;
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
