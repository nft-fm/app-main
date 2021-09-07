import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import useModal from "../../../hooks/useModal";
import isMobile from "../../../utils/isMobile";
import InstallMetamaskModal from "../../InstallMetamaskModal";
import ChangeChainModal from "../../ChangeChainModal";
import ChainSelector from "./ChainSelector";
import { useAccountConsumer } from "../../../contexts/Account";

const AccountButton = (props) => {
  const { currChainId } = useAccountConsumer();
  const { account, connect } = useWallet();
  const [onPresentInstallMetamask] = useModal(<InstallMetamaskModal />);
  const [onPresentChangeChain] = useModal(<ChangeChainModal />);
  const handleUnlockClick = () => {
    if (!window.ethereum) {
      onPresentInstallMetamask();
      return;
    }

    // if (currChainId !== 4) onPresentChangeChain();
    connect("injected");
  };

  // if (account) {
  //   ReactGA.set({
  //     userId: account,
  //     // any data that is relevant to the user session
  //     // that you would like to track with google analytics
  //   });
  // }

  return (
    <>
      <ChainSelector />
      <StyledAccountButton>
        {!account ? (
          <Button onClick={handleUnlockClick}>Connect</Button>
        ) : isMobile() ? (
          <StyledA
            href={`https://etherscan.io/address/${account}`}
            target={`_blank`}
            style={{ marginLeft: "-5px" }}
          >
            <div>{account.substring(0, 6)}</div>
            <div>{"..." + account.substring(account.length - 4)}</div>
          </StyledA>
        ) : (
          <StyledA
            href={`https://etherscan.io/address/${account}`}
            target={`_blank`}
          >
            {account.substring(0, 6) +
              "..." +
              account.substring(account.length - 4)}
          </StyledA>
        )}
      </StyledAccountButton>
    </>
  );
};

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
  /* @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
  } */
`;

const StyledAccountButton = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  /* margin-left: ${(props) => props.theme.spacing[3]}px; */
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  /* @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  } */
`;

const StyledA = styled.a`
  font-size: ${(props) => props.theme.fontSizes.xs};
  text-decoration: none !important;
  color: white;
  transition: all 0.1s linear;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default AccountButton;