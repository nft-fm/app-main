import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled from "styled-components";
import Page from "../../components/Page";
import Background from '../../assets/img/background.jpg'
import Logo from "../../assets/img/logo.png"
import TopDisplayContainer from '../../components/TopDisplayContainer'
import { getDCBalance } from '../../web3/utils'
import StakingDice from "../../assets/img/staking_dice.png";
import MyNfts from "./MyNfts";
import swal from "sweetalert2";
import { buyNFT, fetchNFTApproved, approveNFT } from "../../web3/utils";
import isMobile from "../../utils/isMobile";

const Farms = () => {
  const { account, connect, ethereum } = useWallet()
  let [balance, setBalance] = useState(0);
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if (account) {
      checkDCBal()
      checkApproved()
      setInterval(function () { checkDCBal() }, 6000)
    }
  }, [account])

  const checkDCBal = async () => {
    getDCBalance((res) => {
      setBalance(parseFloat(res).toFixed(4))
    });
  }

  const checkApproved = async () => {
    fetchNFTApproved((res) => {
      if (res > 0) setApproved(true)
    })
  }

  const approveContract = async () => {
    approveNFT((res) => {
      if (res > 0) setApproved(true)
    })
  }

  const redeemNft = () => {
    swal.fire('Roll for an NFT?', 'you will be charged 1 DC and receive one random credit which can be used to redeem an nft', 'question').then(res => {
      if (res.isConfirmed) {
        buyNFT((res) => {
          console.log("nft bought", res);
          //axios
        });
      }
    })
  }

  return (
    <Switch>
      <StyledCanvas>
        <BackgroundSection />
        <BackgroundOverlay />
        <BigLogoContainer>
          <BigLogo src={Logo} />
        </BigLogoContainer>
        <ContentContainer>
          <Page>
            <CardContainer>
              <TopDisplayContainer />
              {account ?
                (<>
                  <HeaderText> Buy NFTs! </HeaderText>
                  {balance ?
                    <Text> Duelers Credits: {balance} </Text>
                    : <Spacer />}
                  <RedeemContainer>
                    <RedeemWrapper>
                      <RedeemColumn>
                        <ComicSubTitle> Sample </ComicSubTitle>
                        <DemoImage src={'https://cdn.discordapp.com/attachments/613478885174018084/794334893143883846/chonk_andre.gif'} />
                      </RedeemColumn>
                      <RedeemColumn>
                        <ComicSubTitle> Price: 1DC </ComicSubTitle>
                        {approved ?
                          <RedeemImage onClick={() => redeemNft()} src={StakingDice} /> :
                          <RedeemImage style={{ opacity: "50%" }} src={StakingDice} />
                        }
                        {!approved && <StyledApprove onClick={() => approveContract()}>Approve NFT Contract</StyledApprove>}
                      </RedeemColumn>
                      <RedeemColumn>
                        <ComicSubTitle> Sample </ComicSubTitle>
                        <DemoImage src={'https://cdn.discordapp.com/attachments/613478885174018084/794334893143883846/chonk_andre.gif'} />
                      </RedeemColumn>
                    </RedeemWrapper>
                  </RedeemContainer>
                  {/* <Seperator /> */}
                  {/* </LandingSection> */}
                  <MyNfts />
                </>)
                :
                <StyledLinkContainer onClick={() => connect('injected')}>
                  <StyledLink>
                    <BigTitle>
                      Connect Your Wallet
                      </BigTitle>
                    <SubTitle>
                      to access the NFT store
                    </SubTitle>
                  </StyledLink>
                </StyledLinkContainer>
              }
            </CardContainer>
          </Page>
        </ContentContainer>
      </StyledCanvas>
    </Switch>
  );
};

const StyledApprove = styled.div`
font-family: "Comic Book";
position: absolute;
cursor: pointer;
font-size: 22px;
top: 55px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: none;
letter-spacing: normal;
display: flex;
align-items: center;
transition: all 0.2s ease-in-out;
color: black;
  text-transform: uppercase;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #fff;
  background-size: 12px, 100%;
  border: 4px solid #000;
  position: relative;
  padding: 8px;
  white-space: nowrap;
  box-shadow:10px 10px 0 #222;
  width: fit-content;
  position: absolute;
&:hover {
          color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size: 23px;
  }
`

const Spacer = styled.div`
height: 23px;`

const RedeemImage = !isMobile() ? styled.img`
width: 220px;
cursor: pointer
` : styled.img`
width: 220px;
cursor: pointer
`
const DemoImage = !isMobile() ? styled.img`
border: 2px solid black;
margin-bottom: 10px;
max-width: 150px;
` : styled.img`
border: 2px solid black;
margin-bottom: 10px;
max-width: calc(90vw - 10px);
`

const ComicSubTitle = !isMobile() ? styled.div`
padding: 2px 7px;
font-family: "Bangers";
font-weight: normal;
font-size: 20px;
border: solid #000;
background-color: #ddd;
border: 1px solid #222;
box-shadow: 5px 5px 0 #222;
letter-spacing: 3px;
font-weight: normal;
margin-bottom: 10px;
` : styled.div`
padding: 5px 10px;
max-width: calc(90vw - 20px);
font-family: "Bangers";
font-weight: normal;
font-size: 60px;
border: solid #000;
-webkit-text-stroke: 1px #000;
background-color: #ddd;
border: 1px solid #222;
box-shadow: 10px 10px 0 #222;
letter-spacing: 3px;
font-weight: normal;
margin-bottom: 50px;
`

const RedeemColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`

const ComicTitle = !isMobile() ? styled.div`
padding: 5px 10px;
max-width: 50vw;
font-family: "Bangers";
font-weight: normal;
font-size: 40px;
border: solid #000;
background-color: #ddd;
border: 1px solid #222;
box-shadow: 7px 7px 0 #222;
letter-spacing: 3px;
font-weight: normal;
margin-bottom: 10px;
` : styled.div`
padding: 5px 10px;
max-width: calc(90vw - 20px);
font-family: "Bangers";
font-weight: normal;
font-size: 60px;
border: solid #000;
-webkit-text-stroke: 1px #000;
background-color: #ddd;
border: 1px solid #222;
box-shadow: 10px 10px 0 #222;
letter-spacing: 3px;
font-weight: normal;
margin-bottom: 10px;
`

const RedeemContainer = styled.div`
width: 1000px;
max-width: 60vw;
margin: 20px 0 10px 0;
display: flex;
flex-direction: column;
align-items: center;
`

const RedeemWrapper = styled.div`
width: 1000px;
max-width: 60vw;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const HeaderText = styled.div`
text-shadow: 10px 10px 0 #000000;
font-family: Bangers;
font-size: 120px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.07;
letter-spacing: normal;
text-align: center;
color: #fef9ed;
// margin-top: 3vh;
`

const Text = styled.div`
text-shadow: 4px 4px 0 #000000;
font-family: Bangers;
font-size: 22px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.07;
letter-spacing: normal;
text-align: center;
color: #fef9ed;
margin-top: 0vh;
`

const PoolContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 80vw;
height: 55vh;
// margin-top: 2vh;
`
const BigLogoContainer = styled.div`
position: fixed;
height: 100vh;
left: -26vw;
display: flex;
align-items: center;
top: -10vh;
`

const BigLogo = styled.img`
width: 75vw;
opacity: 0.08;
`

const BackgroundOverlay = styled.div`
position: fixed;
width: 100vw;
height: 100vh;
top: 0;
// background-image: linear-gradient(to right, #292929 50%, rgba(41, 41, 41, 0.97) 58%, rgba(41, 41, 41, 0.95) 66%, rgba(41, 41, 41, 0.85) 74%, rgba(41, 41, 41, 0.75) 82%, rgba(41, 41, 41, 0.6) 86%, rgba(41, 41, 41, 0.4) 90%, rgba(41, 41, 41, 0.2) 94%, rgba(52, 52, 52, 0) 100%);
background-image: linear-gradient(to right, #292929 30%, rgba(41, 41, 41, 0.95) 40%, rgba(41, 41, 41, 0.5) 60%, rgba(41, 41, 41, 0) 80%, rgba(52, 52, 52, 0) 100%);
`


const LandingSection = !isMobile() ? styled.div`
display: flex;
flex-direction: column;
`: styled.div`
min-height: calc(100vh - 73px);
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


const StyledLink = styled.a`
font-family: "Comic Book";
font-size: 80px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: none;
letter-spacing: normal;
display: flex;
flex-direction: column;
align-items: center;
transition: all 0.2s ease-in-out;
color: black;
text-transform: uppercase;
background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
  #fff;
background-size: 12px, 100%;
border: 4px solid #000;
position: relative;
padding: 30px;
box-shadow:10px 10px 0 #222;
width: fit-content;
cursor: pointer;
&:hover {
    color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size: 85px;
  }
`

const StyledLinkContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 20vh;
height: 300px;
width: 800px;
`

const SubTitle = styled.div`
font-family: "Bangers";
font-size: 30px;
color: rgba(0,0,0,0.8);
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
`

const BigTitle = styled.div`
font-family: "Bangers";
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(255, 204, 74);
  max-width: 80vw;
	margin: 0 auto 20px auto;
	display: flex;
  align-items: center;
  color: black;
  text-shadow: rgb(120,120,120) 3px 3px 0px;
`


export default Farms;
