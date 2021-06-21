import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Swal from "sweetalert2";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../web3/utils";
import { connect } from "mongoose";
import gold_star from "../../assets/img/icons/gold_star.png";
import silver_star from "../../assets/img/icons/silver_star.png";

const Staking = () => {
  const { account, connect } = useWallet();
  const [vinylBalance, setVinylBalance] = useState(0);
  useEffect(() => {
    if (account) {
      getVinylBalance(
        (res) => Number(res.vinyl[0]) > 0 && setVinylBalance(res.vinyl[0])
      );
    }
  }, [account]);
  return (
    <BaseView>
      <PageContents>
        <RewardSection>
          <RewardTitle>STAKING REWARDS</RewardTitle>
          <RewardMeter>
            <span>75/100</span>
            <MeterProgress style={{ width: "75%" }} />
            <RewardStar src={gold_star} alt="gold reward star" />
          </RewardMeter>
          {/* <img src={gold_star} />
          <img src={silver_star} /> */}
        </RewardSection>
        <StakingSection>
          <StakingBox>
            <StakingBoxHeader>LP</StakingBoxHeader>
            <StakingBoxItems>
              <StakingBoxItem>
                <StakingBoxItemText>Your Balance</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>0.00 ETH-VINYL-LP</StakingBoxItemText>
              </StakingBoxItem>
              <StakingBoxItem>
                <StakingBoxItemText>Currently Staked</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>0.00</StakingBoxItemText>
              </StakingBoxItem>
              <StakingBoxItem>
                <StakingBoxItemText>Rewards Available</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>0 VINYL</StakingBoxItemText>
              </StakingBoxItem>
              {account ? (
                <StakingButton>STAKE</StakingButton>
              ) : (
                <StakingButton onClick={() => connect("injected")}>
                  Connect
                </StakingButton>
              )}
            </StakingBoxItems>
          </StakingBox>
          <StakingBox>
            <StakingBoxHeader>BitTunes</StakingBoxHeader>
            <StakingBoxItems>
              <StakingBoxItem>
                <StakingBoxItemText>Your Balance</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>{vinylBalance} VINYL</StakingBoxItemText>
              </StakingBoxItem>
              <StakingBoxItem>
                <StakingBoxItemText>Currently Staked</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>0.00</StakingBoxItemText>
              </StakingBoxItem>
              <StakingBoxItem>
                <StakingBoxItemText>Rewards Available</StakingBoxItemText>
                <FillerLine />
                <StakingBoxItemText>0 VINYL</StakingBoxItemText>
              </StakingBoxItem>
              {account ? (
                <StakingButton>STAKE</StakingButton>
              ) : (
                <StakingButton onClick={() => connect("injected")}>
                  Connect
                </StakingButton>
              )}
            </StakingBoxItems>
          </StakingBox>
        </StakingSection>
      </PageContents>
    </BaseView>
  );
};

const PageContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

const RewardSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 50px 0;
`;

const RewardTitle = styled.h3`
  color: white;
  font-family: "Compita";
  padding: 0 10px 10px;
  margin: 0;
`;

const RewardMeter = styled.div`
  border: solid 1px #262626;
  border-radius: ${(props) => props.theme.borderRadius}px;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  & > span {
    margin-right: auto;
    margin-left: auto;
    z-index: 1;
  }
`;
const MeterProgress = styled.div`
  position: absolute;
  height: 100%;
  background-color: ${(props) => props.theme.color.green};
  border-radius: ${(props) => props.theme.borderRadius}px;
  left: 0;
  z-index: 0;
`;

const RewardStar = styled.img`
  height: 70px;
  aspect-ratio: 1;
  position: absolute;
  margin: -15px -35px 0 0;
`;

const StakingSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StakingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(48% - 64px);
  padding: 32px;
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: solid 1px #262626;
  background-color: #181818;
  /* padding-bottom: 50px; */
  @media only screen and (max-width: 776px) {
    width: calc(100% - 64px);
    &:first-child {
      margin-bottom: 20px;
    }
  }
`;
const StakingBoxHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 30px;
  align-self: center;
  color: white;
  font-family: "Compita";
`;
const StakingBoxItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StakingBoxItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 25px;
  font-family: "Compita";
  font-size: medium;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.12;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
  padding: 5px 0;
`;
const StakingBoxItemText = styled.div`
  // margin-left: 4px;
`;
const FillerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: gray;
  margin-left: 10px;
  margin-right: 10px;
`;
const StakingButton = styled.button`
  width: 150px;
  margin-top: 27px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.blue};
  /* margin-bottom: 20px; */
  padding: 10px 20px;
  color: white;
  filter: saturate(0.5);
  &:hover {
    filter: saturate(1);
  }
`;
export default Staking;
