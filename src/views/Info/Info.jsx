import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import { FAQ } from "./Components/FAQ/FAQ";
import Tokenomics from "./Components/Tokenomics";
import Team from "./Components/Team";
import RoadMap from "./Components/Roadmap";
// import send from "../../assets/img/homepage_assets/homepage_send.png"

import faq from "../../assets/img/litepaper_assets/faq.png";
import litepaper from "../../assets/img/litepaper_assets/litepaper.png";
import roadmap from "../../assets/img/litepaper_assets/roadmap.png";
import team from "../../assets/img/litepaper_assets/team.png";
import tokenomics from "../../assets/img/litepaper_assets/tokenomics.png";

const Info = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (ref) => {
    const element = document.getElementById(ref);
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Switch>
      <BaseView>
        <Header1>All About FANFARE</Header1>
        <InfoContainer>
          <MobileInfo childs={2}>
            <InfoSubContainer onClick={() => handleClick("litepaperRef")}>
              <LinkImage src={litepaper} alt="litepaper" />
              <h3>Litepaper</h3>
              <section>In depth review of FANFARE</section>
            </InfoSubContainer>
            <InfoSubContainer onClick={() => handleClick("roadmapRef")}>
              <LinkImage src={roadmap} alt="roadmap" />
              <h3>Roadmap</h3>
              <section>Keep track of where the project is going</section>
            </InfoSubContainer>
          </MobileInfo>
          <MobileInfo childs={2}>
            <InfoSubContainer onClick={() => handleClick("faqRef")}>
              <LinkImage src={faq} alt="faq" />
              <h3>FAQ</h3>
              <section>We answer your questions</section>
            </InfoSubContainer>
            <InfoSubContainer>
            {/* <InfoSubContainer onClick={() => handleClick("tokenomicsRef")}> */}
              <LinkImage src={tokenomics} alt="tokenomics" />
              <h3>Tokenomics</h3>
              <section>Coming Soon</section>
            </InfoSubContainer>
          </MobileInfo>
          <MobileInfo childs={1}>
            <InfoSubContainer onClick={() => handleClick("teamsRef")}>
              <LinkImage src={team} alt="team" />
              <h3>Team</h3>
              <section>Meet the FANFARE Team</section>
            </InfoSubContainer>
          </MobileInfo>
        </InfoContainer>
        <div
          style={{ marginTop: "-19px", marginBottom: "31px" }}
          id="litepaperRef"
        />
        <ProjectSummary>
          <h3>FANFARE is the first Audiocentric NFT marketplace.</h3>
          <br />
          <span>
            FANFARE allows musicians to dictate artistically and financially the
            terms on which they engage with their audience. 90% of sale revenue
            goes to the artist directly giving musicians much more of a chance
            to see the immediate results of their hard work.
          </span>
          <br />
          <span>
            FANFARE differs from traditional NFTs because it transfers exclusive
            listening rights to the NFT owner. While typically NFTs consist of
            only an image or video file, our NFTs add full-length music on top
            of the media traditionally contained in NFTs. Our NFTs have been
            built to dynamically dispatch multiple types of media, drastically
            expanding the amount of experimentation that can be done in the
            format.
          </span>
          <br />
          <span>
            FANFARE is committed to being 100% carbon neutral. Every month the
            company's carbon footprint is calculated using a cutting-edge Crypto
            Art Footprint API. Then a donation to a carbon fund is made based on
            that calculation. FANFARE is also partnered with Offsetra to ensure
            transparency and accountability in terms of carbon neutrality.
            Sustainable practices are important and we hope that we can be a
            model going forward in this industry.
          </span>
          <StyledAccountButton
            target="_blank"
            href="https://drive.google.com/file/d/1i24DtdT2pIxu5YgIvud0bGa6zxl888GJ/view?usp=sharing"
          >
            <Button>Litepaper</Button>
          </StyledAccountButton>
        </ProjectSummary>
        <div id="roadmapRef" />
        <RoadMap />
        <div id="faqRef" />
        <LaunchContainer>
          <ContainerTitle faq>
            <b className="first">F</b>requently<b>A</b>sked<b>Q</b>uestions
          </ContainerTitle>
          <ContainerOutline />
          <FAQ />
        </LaunchContainer>
        <div id="tokenomicsRef" />
        {/* <Tokenomics /> */}
        <div id="teamsRef" />
        <Team />
      </BaseView>
    </Switch>
  );
};

const LinkImage = styled.img`
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: brightness(110%) contrast(105%) saturate(110%);
  }
`;

const Header1 = styled.h1`
  margin-top: 100px;
  font-size: 3.125rem;
  color: white;
  width: 40rem;
  text-align: center;
  @media only screen and (max-width: 400px) {
    margin-top: 50px;
    font-size: 2.3rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: calc(100% - 32px);
  padding: 16px;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  @media only screen and (min-width: 1200px) {
    justify-content: center;
    align-content: center;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InfoSubContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  max-width: 250px;
  @media only screen and (max-width: 500px) {
    padding: 8px;
    width: calc(50%- 16px);
    max-width: calc(50%- 16px);
  }
  img {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
  h3 {
    color: white;
    text-align: center;
  }
  section {
    color: #888888;
    text-align: center;
    height: 52px;
    @media only screen and (max-width: 776px) {
      height: 70px;
    }
  }
`;

const MobileInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-direction: row;
  @media only screen and (max-width: 500px) {
    width: ${({ childs }) => childs * 50}%;
    display: flex;
    flex-direction: row;
  }
`;

const ProjectSummary = styled.div`
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
  h3 {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 25px;
  }
  & > span {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 776px) {
    & > span {
      padding-left: 0;
      padding-right: 0;
    }
    h3 {
      padding-left: 0px;
      padding-right: 0 px;
    }
  }
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
  margin-left: auto;
  margin-right: auto;
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
  margin-top: 120px;

  @media only screen and (max-width: 776px) {
    margin-top: 80px;
  } /* margin-bottom: 40px; */
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
