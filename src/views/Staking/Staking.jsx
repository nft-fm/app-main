import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import StakingHolder from "./Components/StakingHolder";
import axios from "axios";
import { useStakingConsumer } from "../../contexts/Staking";
import { claimVinyl } from "../../web3/utils";

const Staking = () => {
  const {
    balance,
    totalEarned,
    accountTotalStaked,
    setNeedToUpdateBalances,
    totalAvailable,
  } = useStakingConsumer();

  const claimRewards = async () => {
    claimVinyl(() => {
      console.log("claimed!");
      setNeedToUpdateBalances(true);
    });
  };

  return (
    <BaseView>
      <StakingTopSection>
        <StakingHeader>NFT FM Staking</StakingHeader>
        <StakingInfo>
          <p>
            Here is where you can stake your VINYL on the NFT FM Artists!
            <br />
            Artists and Stakers are rewarded a portion of each transaction.
            <br />
            <br /> By staking on an artist, you are growing your wallet and
            theirs at the same time!
          </p>
        </StakingInfo>
      </StakingTopSection>
      <StakingUserInfoSection>
        <Side>
          <Row>
            <p>Your Balance:</p>
            <p>{balance} VINYL</p>
          </Row>
          <Row>
            <p>Currently Staked:</p>
            <p>{accountTotalStaked} VINYL</p>
          </Row>
          <LinkButton
            href="https://pancakeswap.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy VINYL
          </LinkButton>
        </Side>
        <Side>
          <Row>
            <p>Your Rewards:</p>
            <p>{totalAvailable} VINYL</p>
          </Row>
          <Row>
            <p>Total Earned:</p>
            <p>{totalEarned} VINYL</p>
          </Row>
          <ClaimButton
            available={Number(totalAvailable) > 0}
            onClick={() => totalAvailable && claimRewards()}
          >
            Claim Rewards!
          </ClaimButton>
        </Side>
      </StakingUserInfoSection>
      <StakingHolder />
    </BaseView>
  );
};


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
  padding: 0 20px;
  margin-top: 60px;
`;
const StakingHeader = styled.h1`
  font-weight: 600;
`;

const StakingInfo = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export default Staking;
