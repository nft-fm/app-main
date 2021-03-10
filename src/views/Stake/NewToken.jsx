import React from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Background from "../../assets/img/bg3.svg";
import Uniswap from "../../assets/img/uniswap@2x.png";
import isMobile from "../../utils/isMobile";
import Harvest from "./components/Harvest";
import Stake from "./components/Stake";

const Farms = () => {
  const farmId = "WBET";

  const { ethereum } = useWallet();

  return (
    <Container>
      <Farm>
        <Harvest poolContract={null} />
      </Farm>
      <Farm>
        <Stake poolContract={null} tokenContract={null} tokenName={null} />
      </Farm>
    </Container>
  );
};

const Farm = styled.div`
  width: 44%;
  height: 96%;
  border-radius: 8px;
  border: solid 2px rgba(255, 183, 0, 0.3);
  background-color: rgba(256, 256, 256, 0.08);
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 320px;
  width: 780px;
  margin: 20px auto;
`;

const Title = !isMobile()
  ? styled.div`
      font-family: "Gilroy";
      font-size: 24px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
      max-width: 70vw;
      width: 800px;
      margin: 60px auto 75px auto;
    `
  : styled.div`
      font-family: "Gilroy";
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
      max-width: 70vw;
      margin: 40px auto;
    `;

const Seperator = !isMobile()
  ? styled.div`
      width: 1000px;
      height: 1px;
      background-image: linear-gradient(
        90deg,
        rgba(256, 256, 256, 0),
        rgba(256, 256, 256, 0.6) 20%,
        rgba(256, 256, 256, 0.6) 80%,
        rgba(256, 256, 256, 0)
      );
    `
  : styled.div`
      width: 90vw;
      height: 1px;
      background-image: linear-gradient(
        90deg,
        rgba(256, 256, 256, 0),
        rgba(256, 256, 256, 0.6) 20%,
        rgba(256, 256, 256, 0.6) 80%,
        rgba(256, 256, 256, 0)
      );
    `;

const LandingSection = !isMobile()
  ? styled.div`
      height: calc(100vh - 154px);
      display: flex;
      flex-direction: column;
      justify-content: center;
    `
  : styled.div`
      min-height: calc(100vh - 73px);
    `;

const StyledA = styled.a`
  cursor: pointer;
  display: flex;
  background-image: url(${Uniswap});
  background-size: cover;
  background-position: center;
  height: 30px;
  opacity: 0.9;
  width: 137px;
  transition: all 0.1s linear;

  &:hover {
    opacity: 1;
  }
`;

// const TopDisplayContainer = !isMobile()
//   ? styled.div`
//       width:80vw;
//       display: flex;
//       flex-direction: row;
//       align-items: center;
//       justify-content: space-evenly;
//       margin: 16px auto 80px auto;
//     `
//   : styled.div`
//       width: 60vw;
//       display: flex;
//       flex-wrap: wrap;
//       flex-direction: row;
//       align-items: center;
//       justify-content: space-evenly;
//       margin: 60px auto 40px auto;
//       display: flex;
//       flex-wrap: wrap;
//     `;

const DisplayItem = !isMobile()
  ? styled.div`
      color: white;
      font-family: "Gilroy";
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
      opacity: 0.9;
    `
  : styled.div`
      width: 100%;
      margin-bottom: 10px;
      color: white;
      font-family: "Gilroy";
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      text-align: center;
      letter-spacing: normal;
      opacity: 0.9;
      color: #ffffff;
    `;

const LargeText = styled.div`
  font-family: "Gilroy";
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SmallText = styled.div`
  font-family: "Gilroy";
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
`;

const TextContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const BackgroundSection = styled.div`
  background-image: url(${Background});
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;
const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

export default Farms;
