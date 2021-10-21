import React, { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

/* new assets! */
import exclusive from "../../../../assets/img/homepage_assets/homepage_exclusive2.png";
import carbon from "../../../../assets/img/homepage_assets/homepage_carbon.png";

import airdrop from "../../../../assets/img/homepage_assets/homepage_airdrop.png";
import revenue from "../../../../assets/img/homepage_assets/homepage_revenue.png";

const Airdrops = ({ isLoaded, setIsLoaded }) => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
      disable: "mobile",
    });
  }, []);

  return (
    <Container>
      <FeatureContainer
        data-aos="fade-in"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-once="true"
      >
        <FeaturesImageContainer data-aos="fade-right">
          <Join src={airdrop} alt="homepage-airdrop" />
        </FeaturesImageContainer>
        <FeaturesTextContainer data-aos="fade-left">
          <FeaturesHeader>Did Somone Say Airdrops?!</FeaturesHeader>
          <FeaturesDescription>
            Yes! We are going to be airdropping 30% of the unburned $VINYL
            supply over 4 years! This comes to 2500 $VINYL at the start of every
            month beginning July 2021 and ending June 2025. These tokens will be
            airdropped equally to all holders of Fanfare NFTs. Each NFT
            represents a percentage of the tokens to be received. So holding
            multiple NFTs = more airdrop!
          </FeaturesDescription>
        </FeaturesTextContainer>
      </FeatureContainer>
    </Container>
  );
};
const Spacer = styled.div`
  height: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
  @media only screen and (max-width: 1100px) {
    width: 800px;
    margin-left: 0px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
    padding-bottom: -30px;
  }
`;

const Exclusive = styled.img`
  object-fit: cover;
  height: 350px;
  @media only screen and (max-width: 800px) {
    padding-bottom: 50px;
  }
  @media only screen and (max-width: 600px) {
    height: 70vw;
  }
`;

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
`;

const Revenue = styled(Carbon)`
  height: 300px;
  margin-left: 20px;
  @media only screen and (max-width: 1100px) {
    margin: 0px;
  }
  @media only screen and (max-width: 800px) {
    margin-bottom: -20px;
  }
  @media only screen and (max-width: 600px) {
    height: 60vw;
  }
`;

const Join = styled.img`
  width: 400px;
  margin-left: -100px;
  @media only screen and (max-width: 1100px) {
    margin-left: -75px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0px;
  }
  @media only screen and (max-width: 600px) {
    width: 80vw;
  }
`;

const FeaturesImageContainer = styled.div`
  display: flex;
  width: 58%;
  align-items: center;
  justify-content: center;
`;

const ExclusiveImageContainer = styled(FeaturesImageContainer)`
  display: flex;
`;

const CarbonImageContainer = styled(FeaturesImageContainer)`
  @media only screen and (max-width: 1100px) {
    margin-left: 50px;
    margin-right: -50px;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

const FeaturesTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 42%;
  @media only screen and (max-width: 800px) {
    width: 80vw;
    justify-content: center;
    align-items: center;
  }
`;

const FeaturesHeader = styled.h1`
  color: white;
  @media only screen and (max-width: 800px) {
    text-align: center;
  }
`;

const FeaturesDescription = styled.div`
  color: #888888;
  position: relative;
  display: block;
  font-size: 17px;
  line-height: 1.3;
`;

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
    flex-direction: ${({ reverse }) => (reverse ? "column-reverse" : "column")};
    margin-top: 0px;
    padding-bottom: 100px;
    padding-top: 50px;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0px;
    padding-bottom: 30vw;
    padding-top: 15vw;
  }
`;
export default Airdrops;
