import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Background from "../../assets/img/buy_page_assets/bg.png";
import LootBoxGlow from "../../assets/img/buy_page_assets/lootbox_glow.png";
import LootBoxNoGlow from "../../assets/img/buy_page_assets/lootbox_no_glow.png";
import TokenImg from "../../assets/img/buy_page_assets/token.png";
import Page from "../../components/Page";
import TopDisplayContainer from "../../components/TopDisplayContainer";
// import Profile from "../NFT/MyNfts";
import { useWallet } from "use-wallet";
import CollectionBox from "./CollectionBox";
import { MyNftsProvider } from "../../contexts/MyNfts";
import { buyNFT, fetchNFTApproved, approveNFT, getDCBalance, getLootboxPrice, fetchBDTStaked, getPendingNFTs, redeemNFT, getMyNFTs, setBuyPrices } from "../../web3/utils";
import swal from "sweetalert2";
import axios from 'axios';
import Key from "../../assets/img/buy_page_assets/key.png";

const Store = () => {
  const { account, connect, ethereum } = useWallet()
  const [approved, setApproved] = useState(false)
  const [bdtPrice, setBdtPrice] = useState(0)
  const [dcPrice, setDcPrice] = useState(0)
  const [bdtBal, setBdtBal] = useState(0)
  const [dcBal, setDcBal] = useState(0);
  const [keys, setKeys] = useState([])

  useEffect(() => {
    if (account) {
      checkApproved()
      getPrices()
      getBalances()
      getKeys()
      setInterval(function () { getBalances() }, 6000)
    }
  }, [account])

  const getKeys = async () => {
    getPendingNFTs(res => {
      console.log("keys nfts", res);
      setKeys(res)
    })
  }

  const getBalances = async () => {
    fetchBDTStaked(res => {
      setBdtBal(res.balance)
    })
    getDCBalance((res) => {
      setDcBal(parseFloat(res).toFixed(4))
    });
  }

  const getPrices = async () => {
    getLootboxPrice(res => {
      setBdtPrice(res.BDTPrice)
      setDcPrice(res.DCPrice)
    })
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

  const claimNFT = () => {
    if (!keys.length) {
      swal.fire('No Keys!', `You need to buy a key to unlock a loot box`, 'warning');
      return;
    }
    let id = keys[0];
    id = id.toNumber()
    setKeys(keys.slice(1));
    axios.post('/api/nft/buy', {
      address: account,
      saleID: id
    }).then(response => {
      let data = response.data
      // if (data.assetId && data.saleId && data.v && data.r && data.s) {
      redeemNFT({ id: data.assetId, amount: 1, saleID: data.saleId, v: data.v, r: data.r, s: data.s }, () => {
        axios.post('/api/nft-type/get-one', {
          assetId: data.assetId
        }).then(res => {
          console.log(res.data);
          swal.fire({
            title: `You Unlocked an NFT!`,
            text: 'it may take up to a minute to display in your collection',
            imageUrl: res.data.picture
          });
        })
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const purchaseKey = () => {
    if (bdtBal < bdtPrice || dcBal < dcPrice) {
      swal.fire('Insufficient Balance', 'make sure you have enough BDT and DC to purchase a key', 'error');
      return;
    }
    swal.fire({
      title: 'Buy a Key?',
      icon: 'question',
      text: `You will be charged ${bdtPrice} BDT and ${dcPrice} DC. You will receive one key which can be used to unlock an nft`,
    }).then(result => {
      if (result.isConfirmed) {
        buyNFT((res) => {
          getBalances();
          getKeys();
          console.log("nft bought", res);
        });
      }
    })
  }


  return (
    <MyNftsProvider>
      <StyledCanvas>
        <BackgroundSection />
        <ContentContainer>
          <Page>
            {account ?
              <LandingSection>
                {/* <TopDisplayContainer /> */}
                <HeaderText>Buy NFTs</HeaderText>
                <Token>
                  <img src={TokenImg} />
                  <Lootbox>
                    <Clickable onClick={() => claimNFT()} />
                  </Lootbox>
                </Token>
                <Wallet>
                  <CardHeader>
                    Balance
                  </CardHeader>
                  <CardContent>
                    <CardRow>
                      <RowTitle>
                        BDT:
                      </RowTitle>
                      {bdtBal}
                    </CardRow>
                    <CardRow>
                      <RowTitle onClick={() => setBuyPrices(res => { console.log("hi") })}>
                        DC:
                      </RowTitle>
                      {dcBal}
                    </CardRow>
                  </CardContent>
                </Wallet>
                <KeyShop>
                  <CardHeader>
                    Key Inventory
                  </CardHeader>
                  <CardContent>
                    {keys.length > 0 ?
                      <KeyArea>
                        {keys.map((key, index) => <KeyIcon key={index} onClick={() => swal.fire('click the lootbox to use')} src={Key} />)}
                      </KeyArea>
                      : <NoKeys>empty</NoKeys>
                    }
                    {approved ?
                      <KeyButtonArea>
                        <Button onClick={() => purchaseKey()}>Buy Key</Button>
                        <KeyPrice>
                          (price: {bdtPrice} BDT, {dcPrice} DC)
                        </KeyPrice>
                      </KeyButtonArea>
                      :
                      <Button onClick={() => approveContract()}>Approve</Button>
                    }
                  </CardContent>
                </KeyShop>
                <CollectionBox />
              </LandingSection>
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
          </Page>
        </ContentContainer>
      </StyledCanvas>
    </MyNftsProvider>
  );
}

const KeyPrice = styled.div`
margin-top: 5px;`

const KeyIcon = styled.img`
    max-width: 50px;
    height: auto;
    margin-right: 5px;
    flex: 1 1 auto;
    min-width: 0;
    cursor: pointer;
`

const NoKeys = styled.div`
width: 100%;
flex: 1;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
padding-bottom: 20px;
font-family: "Comic Book";
`

const KeyButtonArea = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
font-family: "Comic Book";
font-size: 14px;
`

const KeyArea = styled.div`
width: 100%;
display: flex;
flex-wrap: nowrap;
overflow-x: hidden;
/* ::-webkit-scrollbar {
  display: none;
}
scrollbar-width: none; */
`

const RowTitle = styled.div`
width: 30%;
font-family: "Bangers";
`

const CardRow = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
`

const Wallet = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: Bangers;
  font-size: 20px;
  color: white;
  border: solid 5px #27292b;

  background-color: rgba(41, 41, 41, 0.71);
  bottom: 42vh;
  left: 5vw;
  width: 300px;
  height: 12vh;
`;

const KeyShop = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  font-family: Bangers;
  font-size: 20px;
  color: white;
  /* border: solid 5px #eee; */
  border: solid 5px #27292b;

  background-color: rgba(41, 41, 41, 0.71);

//   transform: skewX(15deg);

  bottom: 18vh;
  left: 5vw;
  width: 300px;
  height: 20vh;
`;

const CardHeader = styled.div`
    width: 100%;
    min-height: 30px;
    height: 30px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    border: 0px;
    background-image: linear-gradient(
            to right,
            #b72100,
            #b72100 34%,
            #1a8eb2 68%,
            #1a8eb2
    );
    
`

const CardContent = styled.div`
width: calc(100% - 40px);
height: calc(100% - 40px);
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;;
`

const Clickable = styled.div`
width: 70%;
height: 70%;
cursor: pointer;
`

const LandingSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
flex: 1;
height: calc(100% - 130px);
width: 100%;
`

const Token = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 55vh;
  }
  
  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px) scale(1.01);
    }
    100% {
      transform: translatey(0px);
    }
  }
  
    @keyframes glow {
    0% {
      background-image: url(${LootBoxNoGlow});
    }
    50% {
      background-image: url(${LootBoxGlow});
    }
    100% {
      background-image: url(${LootBoxNoGlow});
    }
  }
`;

const Lootbox = styled.div`
  width: 30%;
  height: 50%;
  position: absolute;
  top: 32%;
  background-image: url(${LootBoxNoGlow});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-transition: background-image 1s ease-in-out;
  transition: background-image 1s ease-in-out;
  animation: float 5s ease-in-out infinite,
             glow 5s ease-in-out infinite;
`

const HeaderText = styled.div`
position: absolute;
top: 80px;
z-index: 50;
  text-shadow: 10px 10px 0 #000000;
  font-family: Bangers;
  font-size: 120px;
  line-height: 1.07;
  text-align: center;
  color: #fef9ed;
  margin-top: 2vh;
  @media only screen and (max-width: 767px) {
    font-size: 80px;
    margin-top: 0vh;
  }
`;

const BackgroundSection = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;

  /* &:before { */
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    /* content: ""; */
    /* height: 100%; */
    /* left: 0; */
    /* position: fixed; */
    /* top: 0; */
    /* width: 100%; */
    will-change: transform;
    /* z-index: -2; */
  /* } */
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
  height: 100vh;
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
margin-top: 25vh;
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

export default Store;