import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Landing from "./Components/Landing";
import Swal from "sweetalert2"
import Roadmap from "./Components/Roadmap";
import { Features } from "./Components/Features"
import { FAQ } from "./Components/FAQ/FAQ";
import DemoImage from "./Components/DemoImage/DemoImage"

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
        <DescriptionBoxContainer>
          <DemoImage />
          <StyledHeader>Are you an artist? Launch with us!</StyledHeader>
          <StyledAccountButton href="mailto:info@nftfm.io" target="_blank">Contact us!</StyledAccountButton>
        </DescriptionBoxContainer>
        <Roadmap />
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
  color: white;
  margin: 0 0 24px 0;
  font-family: "Compita";
  padding: 32px 0px;
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
