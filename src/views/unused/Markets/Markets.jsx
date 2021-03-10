import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Page from "../../../components/Page";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import Uniswap from "../../assets/img/unused/uniswap@2x.png";
import Background from '../../assets/img/background.jpg'
import MarketCardPrimary from "./MarketCardPrimary";
import MarketCardSecondary from "./MarketCardSecondary";
import isMobile from "../../utils/isMobile";

const Battle = () => {
  const [markets, setMarkets] = useState(null);
  let [battles, setBattles] = useState(
    {
      finished: false,
      farm1: {
        name: "Vitalik",
      },
      farm2: {
        name: "Alexandra",
      }
    }
  )
  const { account, connect, ethereum } = useWallet()
  let [schedule, setSchedule] = useState([])
  let [warStaked, setWarStaked] = useState({
    warStaked: new BigNumber(0),
    circSupply: new BigNumber(0)
  });
 
  let [modal, setShowModal] = useState(false);
  let [candidate, setCandidate] = useState(battles.farm1);
  let [hoverCandidate, setHoverCandidate] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [roughBets, setRoughBets] = useState({ trump: 0, biden: 0 });
 
  const onClickTrump = (e) => {
    if (!account) {
      connect('injected')
    }
    setCandidate(battles.farm1)
    setShowModal(true)
  }
  const onClickBiden = (e) => {
    if (!account) {
      connect('injected')
    }
    setCandidate(battles.farm2)
    setShowModal(true)
  }
 

 
 

 

  return (
    <Switch>
      <StyledCanvas>
        <BackgroundSection />
        <ContentContainer>
          <Page>
            {/* <TopDisplayContainer /> */}
            <Title>
              Active Markets
		        </Title>
            <LandingSection>

              {markets}
              {/* <Title>
              Alexandra Botez has claimed Victory!
		        </Title>
            <Title>
              Come back soon to claim rewards
		        </Title> */}
            </LandingSection>

            {/* <Title>
              Complete Markets
		        </Title>
            <LandingSection>

              
            </LandingSection> */}
            {/* <Results /> 
            <Rules />
            <Pool3 /> */}
          </Page>
        </ContentContainer>
      </StyledCanvas>
    </Switch >
  );
};

const AFK = styled.div`
height: 65vh;
display: flex;
align-items: center;
justify-content: center;
text-shadow: -1px 1px 0 #000,
1px 1px 0 #000,
1px -1px 0 #000,
-1px -1px 0 #000;`

const MarketsGrid = !isMobile() ? styled.div`
  width: 100%;
min-width: 1000px;
min-height: 340px;
  grid-column-gap: 25px;
  -webkit-column-gap: 25px;
  column-gap: 25px;
  display: grid;
  grid-template-columns: 50%;
  grid-template-columns: repeat(2,1fr);
  grid-row-gap: 20px;
  row-gap: 20px;
  grid-template-rows: auto;
` : styled.div`
  width: 100%;`;

const MarketsContainer = !isMobile() ? styled.div`
height: 90%;
width: 80vw;
display: flex;
flex-direction: row;
flex-wrap: wrap;
`: styled.div`
`

const SecondaryContainer = !isMobile() ? styled.div`
height: calc(14vw + 40px);
min-height: 202px;
` : styled.div`
width: 100%;`;

const PrimaryContainer = !isMobile() ? styled.div`
width: 90vw;
height: 28vw;
min-width: 1000px;
min-height: 340px;
margin-bottom: 2vh;
` : styled.div`
width: 100%;`;

const LandingSection = !isMobile() ? styled.div`
// height: calc(100vh - 154px);
// width: 80vw;
margin: auto;
display: flex;
flex-direction: column;
justify-content: center;
`: styled.div`
min-height: calc(100vh - 73px);
`

const Candidate1 = styled.img`
width: calc(100% - 10px);
height: 100%;
border-radius: 6px 0 0 6px;
cursor: pointer;
object-fit: cover;
border: 10px solid black;
border-right: 2px solid black;
`

const Candidate2 = styled.img`
width: calc(100% - 10px);
height: 100%;
border-radius: 0 6px 6px 0;
cursor: pointer;
object-fit: cover;
border: 10px solid black;
border-left: 2px solid black;
`

const VersusBackground = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`
const BigTitle = styled.div`
font-family: "Bangers";
  font-size: 50px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(255, 204, 74);
  max-width: 80vw;
	margin: 0 auto 20px auto;
	display: flex;
	align-items: center;
`

const Seperator = !isMobile() ? styled.div`
  width: 1000px;
  height: 1px;
  margin-bottom: 80px;
  background-image: linear-gradient(90deg, rgba(256, 256, 256, 0), rgba(256, 256, 256, 0.6) 20%, rgba(256, 256, 256, 0.6) 80%, rgba(256, 256, 256, 0));
` : styled.div`
  width: 90vw;
  height: 1px;
  background-image: linear-gradient(90deg, rgba(256, 256, 256, 0), rgba(256, 256, 256, 0.6) 20%, rgba(256, 256, 256, 0.6) 80%, rgba(256, 256, 256, 0));
  margin-bottom: 80px;`

const NextBattle = styled.div`
  margin-bottom: 80px;
  font-size: 18px;
  font-family: "Bangers";
  color: white;
`

const Title = !isMobile() ? styled.div`
font-family: "Bangers";
  font-size: 24px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(255, 204, 160);
  max-width: 80vw;
  margin-bottom: 10px;
` : styled.div`
font-family: "Bangers";
  font-size: 30px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  max-width: 80vw;
  margin-bottom: 10px;
  margin-top: 40px;
`;

const BackgroundSection = styled.div`
  background-image: url(${Background});
  filter: brightness(90%);
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


const TopDisplayContainer = !isMobile()
  ? styled.div`
        width:80vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin: 16px auto 10px auto;
      `
  : styled.div`
        width: 60vw;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin: 60px auto 40px auto;
        display: flex;
        flex-wrap: wrap;
      `;

const DisplayItem = !isMobile()
  ? styled.div`
        color: white;
        font-family: "Bangers";
        font-size: 18px;
        
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
        text-align: center;
        font-family: "Bangers";
        font-size: 18px;
        
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        opacity: 0.9;
        color: #ffffff;
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
  transition: all .1s linear;
  &:hover {
          opacity: 1;
  }
`


const VersusContainer = !isMobile() ? styled.div`
width: 90vw;
max-width: 1400px;
max-height: 650px;
height: 40vw;
display: flex;
align-items: center;
font-size: 30px;
margin: 0 auto 40px auto;
font-family: "Bangers";

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
border-radius: 8px;
background-color: rgba(256,256,256,0.08);
` : styled.div`
margin: 0 0 40px 0;
width: 90vw;
display: flex;
flex-direction: column;
font-family: "Bangers";
  font-size: 25px;
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
	color: #ffffff;
	border-radius: 8px;
	border: solid 2px rgba(255, 183, 0, 0.3);
	background-color: rgba(256,256,256,0.08);`

export default Battle;
