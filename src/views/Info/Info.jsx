import React, { useState } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Swal from "sweetalert2";
import { FAQ } from "./Components/FAQ/FAQ";
import Tokenomics from "./Components/Tokenomics";
import Team from "./Components/Team";

const Info = () => {
  return (
    <Switch>
      <BaseView>
        <h1 style={{ color: "white" }}>All About NFT FM</h1>
        <ProjectSummary>
          <span>NFT FM is the first Audiocentric NFT marketplace.</span>
          <br />
          <span>
            NFT FM allows musicians to dictate artistically and financially the
            terms on which they engage with their audience. 95% of sale revenue
            goes to the artist directly giving musicians much more of a chance
            to see the immediate results of their hard work.
          </span>
          <br />
          <span>
            NFT FM differs from traditional NFTs because it transfers exclusive
            listening rights to the NFT owner. While typically NFTs consist of
            only an image or video file, our NFTs add full-length music on top
            of the media traditionally contained in NFTs. Our NFTs have been
            built to dynamically dispatch multiple types of media, drastically
            expanding the amount of experimentation that can be done in the
            format.
          </span>
          <br />
          <span>
            NFT FM is committed to being 100% carbon neutral. Every month the
            company's carbon footprint is calculated using a cutting-edge Crypto
            Art Footprint API. Then a donation to a carbon fund is made based on
            that calculation. NFT FM is also partnered with Offsetra to ensure
            transparency and accountability in terms of carbon neutrality.
            Sustainable practices are important and we hope that we can be a
            model going forward in this industry.
          </span>
        </ProjectSummary>
        <StyledAccountButton target="_blank" href="https://drive.google.com/file/d/1ibbxyEiD0I2urotiQjvewsbTwHq9Lzm2/view?usp=sharing">
          <Button>Whitepaper</Button>
        </StyledAccountButton>
        <Team />
        <LaunchContainer>
          <ContainerTitle faq>
            <b className="first">F</b>requently<b>A</b>sked<b>Q</b>uestions
          </ContainerTitle>
          <ContainerOutline />
          <FAQ />
        </LaunchContainer>
        <Tokenomics />
      </BaseView>
    </Switch>
  );
};

const ProjectSummary = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  color: white;
  /* text-align: center; */
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
  /* @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
  } */
`;
const StyledAccountButton = styled.a`
  text-decoration: none;
  margin-top: 20px;
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  /* margin-left: ${(props) => props.theme.spacing[3]}px; */
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  /* @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  } */
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
export default Info;
