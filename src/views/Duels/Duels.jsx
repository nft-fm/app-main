import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled from "styled-components";
import Page from "../../components/Page";
import Background from '../../assets/img/background.jpg'
import BigNumber from "bignumber.js";
import TopDisplayContainer from '../../components/TopDisplayContainer'
import isMobile from "../../utils/isMobile";

const Duels = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
 
  let [warStaked, setWarStaked] = useState({
    warStaked: new BigNumber(0),
    circSupply: new BigNumber(0)
  });
  let launch = 1640116800000;

  return (
    <Switch>
      <StyledCanvas>
        <BackgroundSection />
        <ContentContainer>
          <Page>
            <CardContainer>
              <TopDisplayContainer />
            </CardContainer>
          </Page>
        </ContentContainer>
      </StyledCanvas>
    </Switch>
  );
};

const PoolContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 80vw;
margin-top: 20vh;
`

const NewTokenTitle = !isMobile() ? styled.div`
font-family: "Gilroy";
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(255, 204, 160);
  max-width: 70vw;
  width: 800px;
  margin: 30px auto 10px auto;
  ` : styled.div`
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
    `


const Title = !isMobile() ? styled.div`
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
  ` : styled.div`
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
    `

const Seperator = !isMobile() ? styled.div`
  width: 1000px;
  height: 1px;
  background-image: linear-gradient(90deg, rgba(256, 256, 256, 0), rgba(256, 256, 256, 0.6) 20%, rgba(256, 256, 256, 0.6) 80%, rgba(256, 256, 256, 0));
  ` : styled.div`
  width: 90vw;
  height: 1px;
  background-image: linear-gradient(90deg, rgba(256, 256, 256, 0), rgba(256, 256, 256, 0.6) 20%, rgba(256, 256, 256, 0.6) 80%, rgba(256, 256, 256, 0));
  `

const LandingSection = !isMobile() ? styled.div`
display: flex;
flex-direction: column;
`: styled.div`
min-height: calc(100vh - 73px);
`


const StyledA = styled.a`
  cursor: pointer;
  color: white;
      font-family: "Gilroy";
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      color: #ffffff;
  transition: all .1s linear;
  margin: 0 auto 10px auto;
  text-decoration: underline;
  &:hover {
    opacity: 1;
  }
`

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
position: fixed;
width: 100vw;
height: 100vh;
background-image: url(${Background});
filter: brightness(90%);
top: 0;
background-repeat: no-repeat;
background-size: cover;
`

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

export default Duels;
