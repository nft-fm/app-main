import React from "react";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import StakingHolder from "./Components/StakingHolder";
import axios from "axios";

const Staking = ({ artists }) => {
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
          <LinkButton
            href="https://pancakeswap.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy VINYL
          </LinkButton>
        </StakingInfo>
      </StakingTopSection>
      {artists && <StakingHolder artists={artists} />}
    </BaseView>
  );
};

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

const LinkButton = styled.a`
  text-decoration: none;
  margin: 20px auto 20px;
  width: 140px;
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
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

export default Staking;
