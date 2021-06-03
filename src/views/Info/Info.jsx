import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Swal from "sweetalert2";
import { FAQ } from "./Components/FAQ/FAQ";
import Tokenomics from "./Components/Tokenomics";
import Team from "./Components/Team";
import RoadMap from "./Components/Roadmap";
import send from "../../assets/img/homepage_assets/homepage_send.png"

const useScroll = () => {
  const elRef = useRef(null);
  const executeScroll = () => elRef.current.scrollIntoView();

  return [executeScroll, elRef];
};

// style={{ color: "white" }}
const Info = () => {
  let litepaperRef = useRef()
  let roadmapRef = useRef()
  let faqRef = useRef()
  let tokenomicsRef = useRef()
  let teamsRef = useRef()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClick = (ref) => {
    window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop })
  }
  return (
    <Switch>
      <BaseView>
        <Header1>All About NFT FM</Header1>

        <InfoContainer>
          <InfoSubContainer onClick={() => handleClick(litepaperRef)}>
            <img src={send} alt="send"/> 
            <h3>Litepaper</h3>
            <section>In depth review of NFT FM</section>
          </InfoSubContainer>
          <InfoSubContainer onClick={() => handleClick(roadmapRef)}>
            <img src={send} alt="send"/>
            <h3>Roadmap</h3>
            <section>Keep track of where the project is going</section>
          </InfoSubContainer>
          <InfoSubContainer onClick={() => handleClick(faqRef)}>
            <img src={send} alt="send"/>
            <h3>FAQ</h3>
            <section>We answer your questions</section>
          </InfoSubContainer>
          <InfoSubContainer onClick={() => handleClick(tokenomicsRef)}>
            <img src={send} alt="send"/>
            <h3>Tokenomics</h3>
            <section>How we use our token $VINYL</section>
          </InfoSubContainer>
          <InfoSubContainer onClick={() => handleClick(teamsRef)}>
            <img src={send} alt="send"/>
            <h3>Team</h3>
            <section>Meet the NFT FM Team</section>
          </InfoSubContainer>
        </InfoContainer>
        <ProjectSummary ref={litepaperRef}>
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
          <StyledAccountButton
            target="_blank"
            href="https://drive.google.com/file/d/1i24DtdT2pIxu5YgIvud0bGa6zxl888GJ/view?usp=sharing"
          >
            <Button>Litepaper</Button>
          </StyledAccountButton>
        </ProjectSummary>
        <div ref={roadmapRef}/>
        <RoadMap/>
        <div ref={faqRef}/>
        <LaunchContainer>
          <ContainerTitle faq>
            <b className="first">F</b>requently<b>A</b>sked<b>Q</b>uestions
          </ContainerTitle>
          <ContainerOutline />
          <FAQ />
        </LaunchContainer>
        <div ref={tokenomicsRef}/>
        <Tokenomics/>
        <div ref={teamsRef}/>
        <Team />
      </BaseView>
    </Switch>
  );
};

const Header1 = styled.h1`
  width: 3.125rem;
  color: white;
  width: 40rem;
  text-align: center;
`

const InfoContainer = styled.div`
  display: flex;
  padding-top: 20px;
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

const ProjectSummary = styled.div`
  margin-top: 50px;
  color: white;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 32px;
  margin-bottom: 40px;
  border: solid 1px #262626;
  background-color: #181818;

  & > span {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 776px) {
    width: 80vw;
    padding: 20px;
  & > span {
    padding-left: 0;
    padding-right: 0;
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

  @media only screen and (max-width: 800px) {
    margin-top: 80px;
  }  /* margin-bottom: 40px; */
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
