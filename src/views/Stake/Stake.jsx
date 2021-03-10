import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Background from "../../assets/img/background.jpg";
import Logo from "../../assets/img/logo.png";
import Page from "../../components/Page";
import TopDisplayContainer from "../../components/TopDisplayContainer";
import { getDCBalance } from "../../web3/utils";
import NewTokenPool1 from "./NewTokenPool1";
import NewTokenPool2 from "./NewTokenPool2";

const Farms = () => {
  const { account, connect, ethereum } = useWallet();
  let [balance, setBalance] = useState(0);

  const checkDCBal = async () => {
    getDCBalance((res) => {
      console.log(res);
      setBalance(parseFloat(res).toFixed(4));
    });
  };

  useEffect(() => {
    if (account) {
      checkDCBal();
      setInterval(function () {
        checkDCBal();
      }, 6000);
    }
  }, [account]);

  if (balance === 0) {
    balance = null;
  }

  return (
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
            <HeaderText>Staking</HeaderText>
            {balance && <Text>Duelers Credits: {balance}</Text>}
            {/* <StyledA
              style={{ marginTop: "-10px" }}
              href="https://uniswap.info/token/${tokenaddress}"
              target="_blank"
            >
              Get BDT
              </StyledA> */}

            {/* <LandingSection> */}
            <PoolContainer>
              <NewTokenPool1 />
              <NewTokenPool2 />
            </PoolContainer>
            {/* <RedeemContainer>
              <ComicTitle>
                Get NFTs!
              </ComicTitle>
              <RedeemWrapper>
                <RedeemColumn>
                  <ComicSubTitle>
                    Sample
                </ComicSubTitle>
                  <DemoImage src={'https://cdn.discordapp.com/attachments/613478885174018084/794334893143883846/chonk_andre.gif'} />
                </RedeemColumn>
                <RedeemColumn>

                  <ComicSubTitle>
                    Price: 1DC
                </ComicSubTitle>
                  <RedeemImage src={StakingDice} />
                </RedeemColumn>
                <RedeemColumn>
                  <ComicSubTitle>
                    Sample
                </ComicSubTitle>
                  <DemoImage src={'https://cdn.discordapp.com/attachments/613478885174018084/794334893143883846/chonk_andre.gif'} />
                </RedeemColumn>
              </RedeemWrapper>
            </RedeemContainer> */}
            {/* <Seperator /> */}
            {/* </LandingSection> */}
          </CardContainer>
        </Page>
      </ContentContainer>
    </StyledCanvas>
  );
};

const HeaderText = styled.div`
  flex: 1;
  text-shadow: 10px 10px 0 #000000;
  font-family: Bangers;
  font-size: 120px;
  line-height: 1.07;
  text-align: center;
  color: #fef9ed;
  margin-top: 3vh;
  @media only screen and (max-width: 767px) {
    font-size: 80px;
    margin-top: 0vh;
  }
`;

const Text = styled.div`
  text-shadow: 4px 4px 0 #000000;
  font-family: Bangers;
  font-size: 22px;
  line-height: 1.07;
  text-align: center;
  color: #fef9ed;
`;

const PoolContainer = styled.div`
  flex: 1;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

const BigLogoContainer = styled.div`
  position: fixed;
  height: 100vh;
  left: -26vw;
  display: flex;
  align-items: center;
  top: -10vh;
`;

const BigLogo = styled.img`
  width: 75vw;
  opacity: 0.08;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  // background-image: linear-gradient(to right, #292929 50%, rgba(41, 41, 41, 0.97) 58%, rgba(41, 41, 41, 0.95) 66%, rgba(41, 41, 41, 0.85) 74%, rgba(41, 41, 41, 0.75) 82%, rgba(41, 41, 41, 0.6) 86%, rgba(41, 41, 41, 0.4) 90%, rgba(41, 41, 41, 0.2) 94%, rgba(52, 52, 52, 0) 100%);
  background-image: linear-gradient(
    to right,
    #292929 30%,
    rgba(41, 41, 41, 0.95) 40%,
    rgba(41, 41, 41, 0.5) 60%,
    rgba(41, 41, 41, 0) 80%,
    rgba(52, 52, 52, 0) 100%
  );
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
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
