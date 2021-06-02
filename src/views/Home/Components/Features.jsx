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
        <FeaturesTextContainer data-aos="fade-right">
          <FeaturesHeader>Jam out to exclusive tunes</FeaturesHeader>
          <FeaturesDescription>
            NFTs on NFT FM aren’t just amazing pieces of visual art. They contain full-length tracks directly from the musicians. Owning these NFTs grants you the exclusive ability to stream these amazing songs at any time.
          </FeaturesDescription>
        </FeaturesTextContainer>
        <ExclusiveImageContainer data-aos="fade-left">
          <Exclusive  src={exclusive} alt="homepage-exclusive"/>
        </ExclusiveImageContainer>
      </FeatureContainer>
      <Spacer />
      <FeatureContainer
      data-aos="fade-in"
      data-aos-anchor-placement="top-center"
      data-aos-once="true"
      >
        <CarbonImageContainer data-aos="fade-right">
          <Carbon src={carbon} alt="homepage-carbon"/>
        </CarbonImageContainer>
        <FeaturesTextContainer data-aos="fade-left"  >
          <FeaturesHeader>Committed to Carbon Neutrality</FeaturesHeader>
          <FeaturesDescription>
            We have partnered with Offsetra to provide transparency on our commitment to carbon neutrality. Each month, donations are made to chosen ecological funds to offset the emissions generated through transactions made on our platform.
          </FeaturesDescription>
        </FeaturesTextContainer>
      </FeatureContainer>
      <FeatureContainer
        reverse
        data-aos="fade-in"
        data-aos-anchor-placement="top-center"
        data-aos-once="true"
      >
        <FeaturesTextContainer data-aos-anchor-placement="bottom-bottom" data-aos="fade-right">
          <FeaturesHeader>Support Amazing Artists</FeaturesHeader>
          <FeaturesDescription>
            It’s no secret that traditional streaming services are not offering fair compensation to artists. With us, musicians make 95% of their sales.
          </FeaturesDescription>
        </FeaturesTextContainer>
        <FeaturesImageContainer data-aos-anchor-placement="bottom-bottom" data-aos="fade-left">
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
        <FeaturesTextContainer data-aos="fade-left">
          <FeaturesHeader>Receive Airdrops!</FeaturesHeader>
          <FeaturesDescription>
            NFTs holders on our platform get monthly airdrops of our governance token, $VINYL. 30% of the supply is being dropped to NFT holding wallets throughout our first 4 years of operation!
          </FeaturesDescription>
        </FeaturesTextContainer>
      </FeatureContainer>
    </Container>
  )
}
const Spacer = styled.div`
  height: 40px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
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
  height: 350px;
  @media only screen and (max-width: 800px) {
    padding-bottom: 50px;
  }
  @media only screen and (max-width: 600px) {
    height: 70vw;
  }
`

const Carbon = styled.img`
  object-fit: cover;
  width: 340px;
  height: 340px;
  margin-left: -60px;
  margin-top: 30px;
  @media only screen and (max-width: 1100px) {
    margin-left: -150px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
    padding: 40px;
  }
  @media only screen and (max-width: 600px) {
    height: 75vw;
    width: 75vw;
  }
`

const Revenue = styled(Carbon)`
  object-fit: cover;
  width: 380px;
  height: 380px;
  margin-left: 20px;
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
  width: 493px;
  margin-left: -100px;
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

const CarbonImageContainer = styled(FeaturesImageContainer)`
  @media only screen and (max-width: 1100px) {
    margin-left: 50px;
    margin-right: -50px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`

const FeaturesTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 42%;
  margin-top: -30px;
  @media only screen and (max-width: 800px) {
    width: 80vw;
    justify-content: center;
    align-items: center;
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
  font-size: 17px;
  line-height: 1.3;
`

const FeatureContainer = styled.div`
  margin-top: -100px;
  min-height: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 32px;
  line-height: 30px;
  width: calc(100% - 64px);
  @media only screen and (max-width: 800px) {
    flex-direction: ${({ reverse }) => reverse ? "column-reverse": "column" };
    margin-top: 0px;
    padding-bottom: 100px;
    padding-top: 50px;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0px;
    padding-bottom: 30vw;
    padding-top: 15vw;
  }
`