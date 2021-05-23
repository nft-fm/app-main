import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { buyPresale, getVinylBalance, require } from "../../web3/utils";
import useWallet from "use-wallet";
import axios from "axios";
import isMobile from "../../utils/isMobile";
import { VinylAddress } from "../../web3/constants";
import { ReactComponent as telegram_icon } from "../../assets/img/icons/social_telegram.svg";
import Swal from "sweetalert2";

const Disclaimer = () => {
  const { account, connect } = useWallet();
  const [val, setVal] = useState(1);
  const [amountBought, setAmountBought] = useState(0);
  const [signed, setSigned] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getVinylBalance((r) => {
      setAmountBought(Number(r.vinyl[0]));
      console.log("bought!", r);
    });
  }, [account]);

  const sign = async () => {
    if (!name) {
      return;
    }
    const { provider, walletAddress } = await require();
    const signer = provider.getSigner();
    signer
      .signMessage(JSON.stringify({ name, walletAddress }))
      .then((authorization) => {
        // setLoading(true);
        axios
          .post("/api/forms/disclaimer-signed", {
            name: name,
            address: walletAddress,
            sig: authorization,
          })
          .then((res) => {
            getVinylBalance((r) => {
              setAmountBought(r);
              console.log("bought!");
            });
            setSigned(true);
            // setLoading(false);
          });
      });
  };

  const addStonk = async () => {
    const tokenAddress = VinylAddress;
    const tokenSymbol = "VINYL";
    const tokenDecimals = 18;
    const tokenImage =
      "https://cdn.discordapp.com/attachments/613478885174018084/844586797617905664/Untitled.png";
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
        getVinylBalance((r) => {
          setAmountBought(Number(r.vinyl[0]));
          console.log("bought!");
        });
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buy = () => {
    if (account) {
      buyPresale(val * 2750, (res) => {
        console.log(res);
        getVinylBalance((r) => {
          setAmountBought(Number(r.vinyl[0]));
          console.log("bought!");
        });
      });
    } else {
      if (window.ethereum) {
        connect("injected")
      } else {
        Swal.fire("No MetaMask detected!")
      }
    }
  };

  // let pageContents = (
  //   <Container>
  //     <Title>Disclaimer</Title>
  //     <Divider />
  //     <BulletPoint>
  //       - I acknowledge that this token is a utility token, not an investment:
  //       it provides access to the community governance system.
  //     </BulletPoint>
  //     <BulletPoint>
  //       - I acknowledge that I am buying the token for the ability to
  //       participate in this novel system, not as an investment.
  //     </BulletPoint>
  //     <SignatureContainer>
  //       I,
  //       <Signature onChange={(e) => setName(e.target.value)} />
  //       confirm that I have read and agree with the above statements.
  //     </SignatureContainer>
  //     <SignButton onClick={sign}>Sign With My Wallet Address</SignButton>
  //   </Container>
  // );

  let pageContents = (
    <Holder>
      <WalletTitle>Please connect your wallet to purchase tokens</WalletTitle>
      <WalletButton onClick={() => connect("injected")}>Connect</WalletButton>
      <TelegramHolder>
        <a href="https://t.me/nftfm" target="_blank">
          <TelegramIcon />
        </a>
      </TelegramHolder>
    </Holder>
  );

  // if (account) {
    //   pageContents = <Loading src={loadingGif}></Loading>;
    // } else if (signed) {
    pageContents = (
      <PrivateSaleContainer>
        <Spacer/>
        <SaleContainer>
          <Title> Buy </Title>
          <BuyContent>1 ETH = 2750 $VINYL</BuyContent>
          <Divider />
          <Row>
            <PurchaseInput
              step="1"
              min="0"
              onChange={(e) =>
                setVal(
                  parseInt(e.target.value) > 30 ? 30 : e.target.value
                )
              }
              value={val}
              type="number"
            /><Ethtext>
              ETH
              </Ethtext>
            {/* <Currency>
              ETH
            </Currency> */}
            {account ?
            <BuyButton onClick={buy}>BUY</BuyButton>
           : 
            <BuyButton onClick={() => connect("injected")}>CONNECT</BuyButton>
          }
          </Row>
          {/* <BuyContent>Wallet Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)} </BuyContent> */}
        </SaleContainer>
        <SaleContainer>
          <TitleContainer>
            {!isMobile() && (
              <StonkButton style={{ visibility: "hidden" }} onClick={addStonk}>
                Add VINYL to Metamask
              </StonkButton>
            )}
            <Title>Purchased</Title>
            <StonkButton onClick={addStonk}>Add VINYL to MetaMask</StonkButton>
          </TitleContainer>
          <Divider />
          <BuyContent style={{ fontSize: "1.25rem" }}>
            {parseFloat(amountBought).toFixed(2)} $VINYL
          </BuyContent>
        </SaleContainer>
      <TelegramHolder>
        <a href="https://t.me/nftfm" target="_blank">
          <TelegramIcon />
        </a>
      </TelegramHolder>
      </PrivateSaleContainer>
    );
  // }

  // if (!account) {
  //   return (
  //     <>
  //       <WalletTitle>Please connect your wallet to purchase tokens</WalletTitle>
  //       <WalletButton onClick={() => connect("injected")}>Connect</WalletButton>
  //     </>
  //   );
  // }
  return <>{pageContents}</>;
};

const Ethtext = styled.div`
position: absolute;
margin-left: -19px;
margin-top: 12px;
`

const Spacer = !isMobile() ? styled.div`
height: 200px;
` : styled.div``

const TelegramHolder = styled.div`
  margin-top: 45px;
  margin-bottom: 75px;
  /* display: flex; */
`;

const TelegramIcon = styled(telegram_icon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  fill: white;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50%;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PrivateSaleContainer = !isMobile()
  ? styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-bottom: 30%;
    `
  : styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

const Currency = styled.div`
  width: 0px;
  margin-left: -130px;
  margin-top: 5px;
`;

const BuyContent = styled.span`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  /* width: 60%; */
`;

const Divider = styled.div`
  height: 1px;
  width: calc(100% + 80px);
  background-color: rgba(256, 256, 256, 0.6);
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  margin: 5px 0 20px 0;
`;

const UtilityContainer = styled.div`
  width: 60%;
  color: white;
  padding: 20px 40px;
  align-items: center;
  position: relative;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const SaleContainer = styled.div`
  width: 60%;
  border: 2px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  background-color: ${(props) => props.theme.color.box};
  color: white;
  padding: 20px 40px;
  align-items: center;
  position: relative;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StonkButton = !isMobile() ? styled.button`
  /* width: 250px; */
  /* height: 30px; */
  /* border: 2px solid white; */
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;
  margin-top: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  &:hover {
    background-color: ${(props) => props.theme.color.blue};
    color: white;
    cursor: pointer;
  }
` :  styled.button`
/* width: 250px; */
/* height: 30px; */
/* border: 2px solid white; */
border: none;
border-radius: 8px;
font-size: 16px;
transition: all 0.2s linear;
margin-top: -10px;
padding: 0 10px;
&:hover {
  background-color: ${(props) => props.theme.color.blue};
  color: white;
  cursor: pointer;
}
`;

const BuyButton = styled.button`
  width: 100px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;
  background-color: ${(props) => props.theme.color.blue};
  color: white;
  &:hover {
    background-color: ${(props) => props.theme.color.green};
    /* color: black; */
    cursor: pointer;
  }
`;

const WalletButton = styled.button`
  width: 140px;
  padding: 10px 0;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${(props) => props.theme.color.blue};
    color: white;
    cursor: pointer;
  }
`;

const Row = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const PurchaseInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid white;
  color: white;
  text-align: right;
  margin: 0 8px;
  height: 34px;
  font-size: 24px;
  /* padding-right: 60px; */
  width: 100px;
  &:focus {
    outline: none;
  }
`;

const SignButton = styled.button`
  margin: 20px auto 0 auto;
  width: 80%;
  padding: 10px 0;
  /* border: 2px solid white; */
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;
  &:hover {
    background-color: ${(props) => props.theme.color.blue};
    color: white;
    cursor: pointer;
  }
`;

const SignatureContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  display: inline;
`;

const Signature = styled.input`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid white;
  color: white;
  text-align: center;
  margin: 0 8px;
  height: 24px;
  font-size: 16px;
  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Loading = styled.img`
  width: 100px;
  height: 100px;
  padding: 20px;
  border: 2px solid rgba(256, 256, 256, 0.5);
  border-radius: 2px;
  background-color: rgba(180, 180, 180, 0.3);
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: calc(20vh + 200px);
`;

const Title = styled.h1`
  margin: 0;
  /* margin-top: -12px; */
`;
const WalletTitle = styled(Title)`
  margin-top: 200px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;

const Container = !isMobile()
  ? styled.div`
      /* margin-top: 20vh; */
      margin-top: 20px;
      width: 540px;
      border: 2px solid rgba(256, 256, 256, 0.5);
      border-radius: 2px;
      background-color: rgba(180, 180, 180, 0.3);
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 20px 40px;
      align-items: center;
      position: relative;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `
  : styled.div`
      margin-top: 20px;
      width: 300px;
      border: 2px solid rgba(256, 256, 256, 0.5);
      border-radius: 2px;
      background-color: rgba(180, 180, 180, 0.3);
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 20px 20px;
      align-items: center;
      position: relative;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

export default Disclaimer;
