import React, { useEffect } from "react";
import styled from "styled-components";
import Aos from 'aos'
import 'aos/dist/aos.css'

/* new assets! */
import exclusive from "../../../assets/img/homepage_assets/homepage_exclusive.png"
import carbon from "../../../assets/img/homepage_assets/homepage_carbon.png"

import join from "../../../assets/img/homepage_assets/homepage_join.png"
import revenue from "../../../assets/img/homepage_assets/homepage_revenue.png"
// import art from "../../../assets/img/homepage_assets/homepage_art.png"
// import video from "../../../assets/img/homepage_assets/homepage_video.png"

export const Features = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000
    })
  }, [])
  // const isMobile = window.innerWidth <= 500;

  // if (isMobile) return (
  //   <> </>
  // );
  return (
    <Container>
      <FeatureContainer reverse>
        <FeaturesTextContainer>
          <FeaturesHeader>Jam out to exclusive tunes</FeaturesHeader>
          <FeaturesDescription>NFTs on NFT FM include full-length music only the NFT holders can listen to!</FeaturesDescription>
        </FeaturesTextContainer>
        <ExclusiveImageContainer data-aos="fade-left" data-aos-mirror="true">
          <Exclusive  src={exclusive} alt="homepage-exclusive"/>
        </ExclusiveImageContainer>
      </FeatureContainer>
      <FeatureContainer>
        <FeaturesImageContainer>
          <Carbon src={carbon} alt="homepage-carbon"/>
        </FeaturesImageContainer>
        <FeaturesTextContainer data-aos="fade-left"  >
          <FeaturesHeader>Save the Earth</FeaturesHeader>
          <FeaturesDescription>I don't get this section...🤔 Help me with a description. How does this save the Earth?</FeaturesDescription>
        </FeaturesTextContainer>
      </FeatureContainer>
      <FeatureContainer
        reverse
        data-aos="fade-in"
        data-aos-anchor-placement="top-center"
        data-aos-once="true"
      >
        <FeaturesTextContainer data-aos-anchor-placement="bottom-bottom" data-aos="fade-right">
          <FeaturesHeader>Support musicians 95%</FeaturesHeader>
          <FeaturesDescription>App stores and producers often take a large cut of the artists' pay. Directly support your artist here!</FeaturesDescription>
        </FeaturesTextContainer>
        <FeaturesImageContainer>
          <Revenue src={revenue} alt="homepage-revenue"/>
        </FeaturesImageContainer>
      </FeatureContainer>
      <FeatureContainer
        data-aos="fade-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-once="true">
        <FeaturesImageContainer data-aos="fade-right"
      >
          <Join src={join} alt="homepage-join"/>
        </FeaturesImageContainer>
        <FeaturesTextContainer>
          <FeaturesHeader>Exclusive Airdrops</FeaturesHeader>
          <FeaturesDescription>Get rare and exclusive access to your favorite music! You also own it too!</FeaturesDescription>
        </FeaturesTextContainer>
      </FeatureContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  @media only screen and (max-width: 1100px) {
    width: 800px;
    margin-left: 40px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
    padding-bottom: -30px;
  }
`

const Exclusive = styled.img`
  object-fit: cover;
  height: 414px;
  @media only screen and (max-width: 800px) {
    padding-bottom: 50px;
  }
  @media only screen and (max-width: 600px) {
    height: 80vw;
  }
`

const Carbon = styled.img`
  object-fit: cover;
  width: 414px;
  height: 414px;
  @media only screen and (max-width: 1100px) {
    margin-left: -120px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
    padding: 50px;
  }
  @media only screen and (max-width: 600px) {
    height: 80vw;
    width: 80vw;
  }
`

const Revenue = styled(Carbon)`
  object-fit: cover;
  margin-left: 80px;
  @media only screen and (max-width: 1100px) {
    margin: 0px;
  }
  @media only screen and (max-width: 800px) {
    margin-bottom: -20px;
  }
  @media only screen and (max-width: 600px) {
    height: 80vw;
    width: 80vw;
  }
`

const Join = styled.img`
  width: 580px;
  margin-left: -80px;
  @media only screen and (max-width: 1100px) {
    margin-left: -90px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0px;
  }
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`

const FeaturesImageContainer = styled.div`
  display: flex;
  width: 58%;
  align-items: center;
  justify-content: center;
`

const ExclusiveImageContainer = styled(FeaturesImageContainer)`
  display: flex;
`

const FeaturesTextContainer = styled.div`
  box-sizing: border-box;
  width: 42%;
  @media only screen and (max-width: 800px) {
    width: 80vw;
  }
`

const FeaturesHeader = styled.h1`
  color: white;
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`

const FeaturesDescription = styled.div`
  color: #888888;
  position: relative;
  display: block;
  font-size: 18px;
`

const FeatureContainer = styled.div`
  margin-top: -100px;
  min-height: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 72px 48px;
  line-height: 30px;
  width: calc(100% - 96px);
  @media only screen and (max-width: 800px) {
    flex-direction: ${({ reverse }) => reverse ? "column-reverse": "column" };
    margin-top: 0px;
    padding-bottom: 25vw;
    padding-top: 15vw;
  }
`