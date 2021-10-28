import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import StakingHolder from "./Components/StakingHolder";
import axios from "axios";
import { useStakingConsumer } from "../../contexts/Staking";
import { AccountContext } from "../../contexts/Account/Account";
import { useAccountConsumer } from "../../contexts/Account";
import { claimVinyl } from "../../web3/utils";
import UseBscSorry from "./Components/UseBscSorry";
import Swal from "sweetalert2";
import loadingGif from "../../assets/img/loading.gif";
import { StakingAddress } from "../../web3/constants";
import Community from "./Components/Community";

const Staking = () => {
  const {
    balance,
    totalEarned,
    accountTotalStaked,
    setNeedToUpdateBalances,
    totalAvailable,
    totalEarnedByAllStakers,
    totalEarnedByAllArtists,
    artists,
  } = useStakingConsumer();
  const { currChainId, account } = useAccountConsumer();
  const [isBsc, setIsBsc] = useState(false);

  const [loading, setLoading] = useState(false);

  const claimRewards = async () => {
    setLoading(true);
    claimVinyl((err) => {
      setLoading(false);
      if (err) {
        Swal.fire({
          title: `Something went wrong, please refresh and try again.`,
          timer: 5000,
        });
      } else {
        Swal.fire({
          title: `Successfully claimed ${totalAvailable} VINYL!`,
          timer: 5000,
        });
        console.log("claimed!");
        setNeedToUpdateBalances(true);
      }
    });
  };

  useEffect(() => {
    if (currChainId === 56 || currChainId === 97) {
      setIsBsc(true);
    }
  }, [currChainId]);

  const addVinyl = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: StakingAddress,
            symbol: "VINYL",
            decimals: 18,
            // image: '',
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseView>
      <StakingHeader>Fanfare Staking</StakingHeader>
      {!isBsc || !account ? (
        <UseBscSorry />
      ) : (
        <>
          <StakingTopSection>
            <StakingInfo>
              <p>
                Here is where you can stake your VINYL on the Fanfare Artists!
                <br />
                Artists and Stakers are rewarded a portion of each transaction.
                <br />
                <br /> By staking on an artist, you are rewarding yourself and
                your artist at the same time!
                <br />
              </p>
              <Row>
                <p>Total Earned By Stakers:</p>
                <p>{Math.round(totalEarnedByAllStakers * 100) / 100} VINYL</p>
              </Row>
              <Row>
                <p>Total Earned By Artists:</p>
                <p>{Math.round(totalEarnedByAllArtists * 100) / 100} VINYL</p>
              </Row>
              <Row>
                <p>Total Stakable Artists:</p>
                <p>{artists.length}</p>
              </Row>
              <AddButton onClick={() => addVinyl()}>
                Add VINYL to Wallet
              </AddButton>
            </StakingInfo>
          </StakingTopSection>
          <StakingUserInfoSection>
            <Side>
              <Row>
                <p>Your Balance:</p>
                <p>{Math.round(balance * 100) / 100} VINYL</p>
              </Row>
              <Row>
                <p>Currently Staked:</p>
                <p>{Math.round(accountTotalStaked * 100) / 100} VINYL</p>
              </Row>
              <LinkButton
                href="https://pancakeswap.finance/swap?outputCurrency=0x5A2Df2e3D11dcDb645fbA2008c06fdBb114E805e"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy VINYL
              </LinkButton>
              {/* <ButtonRow>
                <AddButton onClick={() => addVinyl()}>Add VINYL</AddButton>
              </ButtonRow> */}
            </Side>
            <Side>
              <Row>
                <p>Your Rewards:</p>
                <p>{Math.round(totalAvailable * 100) / 100} VINYL</p>
              </Row>
              <Row>
                <p>Total Earned:</p>
                <p>{Math.round(totalEarned * 100) / 100} VINYL</p>
              </Row>
              <ClaimButton
                available={Number(totalAvailable) > 0 && !loading}
                onClick={() =>
                  Number(totalAvailable) > 0 && !loading && claimRewards()
                }
              >
                {!loading ? (
                  "Claim Rewards!"
                ) : (
                  <Loading src={loadingGif} alt="loading gif" />
                )}
              </ClaimButton>
            </Side>
          </StakingUserInfoSection>
          <StakingHolder />
          {artists.length > 0 && <Community balance={balance} />}
        </>
      )}
    </BaseView>
  );
};

const Loading = styled.img`
  width: 20px;
  height: 20px;
  & path {
    stroke: ${(props) => props.theme.color.lightgray};
  }
`;

const AddButton = styled.button`
  text-decoration: none;
  margin: 0px auto 20px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  font-weight: 600;
  background-color: #181818;
  font-size: ${(props) => props.theme.fontSizes.sm};
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const LinkButton = styled.a`
  text-decoration: none;
  margin: 0px auto 20px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  font-weight: 600;
  background-color: #181818;
  font-size: ${(props) => props.theme.fontSizes.sm};
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const ClaimButton = styled.button`
  cursor: ${(props) => (props.available ? "pointer" : "not-allowed")};
  text-decoration: none;
  margin: 0px auto 20px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  font-weight: 600;
  background-color: #181818;
  font-size: ${(props) => props.theme.fontSizes.sm};
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const Side = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  /* padding: 0 20px; */

  @media only screen and (max-width: 776px) {
    width: 95%;
    margin-bottom: 20px;
  }
`;

const StakingUserInfoSection = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  color: white;
  margin: 30px 0;
  font-size: ${(props) => props.theme.fontSizes.sm};
  @media only screen and (max-width: 776px) {
    justify-content: center;
  }
`;

const StakingTopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  margin-top: 30px;
  @media only screen and (max-width: 776px) {
    width: 90vw;
  }
`;
const StakingHeader = styled.h1`
  font-family: "Compita";
  font-weight: 600;
  color: white;
  margin-top: 60px;
  font-size: 1.75rem;
  font-weight: 600;
`;

const StakingInfo = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 0 10px;
  & > p {
    max-width: 85%;
  }
`;
export default Staking;
