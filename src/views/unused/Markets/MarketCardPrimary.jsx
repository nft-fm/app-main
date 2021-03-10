import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { NavLink } from 'react-router-dom'
import BalanceBar from "./BalanceBarPrimary"
import MarketsCountDown from "./CountDownPrimary";
import fuckingRIP from "../../assets/img/unused/complete.png"
import isMobile from "../../utils/isMobile";

const Battle = ({ bet }) => {
  const { account, connect, ethereum } = useWallet()
  const [currBets, setCurrBets] = useState({ choice1: 0, choice2: 0 });
  let [img1, setImg1] = useState(null)
  let [img2, setImg2] = useState(null)
  const [over, setOver] = useState(false);



  

  const connectMe = (e) => {
    e.preventDefault()
    connect('injected')
  }

  if (!bet) {
    return null
  }
  return (
    <VersusContainer to={`/market/${bet._id}`}>
      {over &&
        <ThisShitIsFuckingOver>
          <RIPYW src={fuckingRIP} />
        </ThisShitIsFuckingOver>
      }
      <ImgWrapper>
        <Candidate1 src={img1} />
      </ImgWrapper>
      <CountDownContainer>
        <MarketsCountDown battle={bet} />
      </CountDownContainer>
      {/* <Versus>VS</Versus> */}
      <ImgWrapper  >
        <Candidate2
          src={img2}
        />
      </ImgWrapper>
      <Info>
        <Description>
          {bet.description}
        </Description>

        <BetAmount>
          <Volume>
            Volume:&nbsp;
                <Money>
              ${
                (currBets.choice1 + currBets.choice2).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              }
            </Money>
          </Volume>
          <BalanceBar bet={bet} votes1={currBets.choice1} votes2={currBets.choice2} />
        </BetAmount>
        {/* {account ?
          <BetAmount>
            <Volume>
              Volume:&nbsp;
                <Money>
                ${
                  (currBets.choice1 + currBets.choice2).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }
              </Money>
            </Volume>
            <BalanceBar bet={bet} votes1={currBets.choice1} votes2={currBets.choice2} />
          </BetAmount> :
          <PleaseLogin onClick={e => connectMe(e)}>
            View Bets
          </PleaseLogin>
        } */}
      </Info>
    </VersusContainer>
  );
};

const RIPYW = styled.img`
width: 50%;
height: auto;
margin-bottom: 6%;
filter: brightness(3) grayscale(0.2);
`

const ThisShitIsFuckingOver = styled.div`
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
z-index: 100000;
border-radius: 4px;
background-color: rgba(0,0,0,0.6);
`


const CountDownContainer = styled.div`
position: absolute;
left: 50%;
top: 0;
z-index: 100001;`


const PleaseLogin = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 240px;
font-size: 16px;
color: rgb(255,204,74);
border: 2px solid rgba(255, 183, 0, 0.3);
border-radius: 4px;
background-color: rgba(256,256,256,0.2);
padding: 10px;
`

const Volume = styled.div`
font-family: "Bangers";

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
display: flex;
font-size: 16px;
align-items: flex-end;
`

const Money = styled.div`
font-family: "Bangers";

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
font-size: 20px;
`

const BetAmount = styled.div`
display: flex;
flex-direction: column;
height: 55px;
justify-content: space-between;
width: 30%;
align-items: center;`

const Description = styled.div`
font-family: "Bangers";

font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
color: #ffffff;
font-size: 24px;
width: 65%;
text-align: left;
`

const Info = styled.div`
position: absolute;
min-height: 15%;
width: 96%;
display: flex;
align-items: center;
justify-content: center;
bottom: 0;
background: rgba(0,0,0,0.9);
display: flex;
flex-direction: row;
padding: 0.25% 2% 0.25% 2%;
justify-content: space-between;
z-index: 10000000;
`

const ImgWrapper = styled.div`
width: 50%;
position: relative;
height: 100%;
transition: all 0.2s ease-in-out;
// filter: brightness(100%) contrast(100%) grayscale(100%) ;
// &:hover {
// transition: all 0.2s ease-in-out;
//   filter: brightness(110%) contrast(110%) grayscale(80%);
//   transform: scale(1.05);
//   z-index: 2000000;
// }
`

let Candidate1
let Candidate2

Candidate1 = styled.img`
width: calc(100% - 5px);
height: calc(100% - 10px);
border-radius: 6px 0 0 6px;
cursor: pointer;
object-fit: cover;
border: 5px solid black;
border-right: 2px solid white;
`

Candidate2 = styled.img`
width: calc(100% - 5px);
height: calc(100% - 10px);
border-radius: 0 6px 6px 0;
cursor: pointer;
object-fit: cover;
border: 5px solid black;
border-left: 2px solid black;
`

const VersusContainer = !isMobile() ? styled(NavLink)`
position: relative;
width: 100%;
// max-width: 1400px;
// max-height: 650px;
height: 100%;
display: flex;
flex-direction: row;
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
min-width: 1000px;
min-height: 340px;
` : styled.div`
position: relative;
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