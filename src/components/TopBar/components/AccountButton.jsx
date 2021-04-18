import React, {useCallback, useEffect, useState} from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import useModal from "../../../hooks/useModal";
import isMobile from "../../../utils/isMobile";
import axios from "axios";
import InstallMetamaskModal from "../../InstallMetamaskModal";
import {useAccountConsumer} from "../../../contexts/Account";
import ChangeChainModal from "../../ChangeChainModal";



const AccountButton = (props) => {
  const [currChainId, setCurrChainId ] = useState(props.chainId);
  const {  account, connect } = useWallet();
  const [onPresentInstallMetamask] = useModal(<InstallMetamaskModal />);
  const [onPresentChangeChain] = useModal(<ChangeChainModal />)

  console.log(currChainId);
  const fetchAccount = async () => {
    axios.post(`api/user/get-account`,
      { address: account, }).then(res => {
        console.log("user", res.data)
      }).catch(err => {
        console.log(err);
      })
  };

  const handleUnlockClick = useCallback(() => {
    console.log("CURR CHAIN ID", currChainId)
    if (!window.ethereum) onPresentInstallMetamask();
    else if (currChainId !== 1) onPresentChangeChain();
    if (isMobile()) {
      // connect('injected');
      connect("walletconnect")//.then(() => { getS3Bucket() });
    } else {
      connect("injected")//.then(() => { getS3Bucket() });
      // onPresentWalletProviderModal()
    }
    // fetchAccount();
  }, [connect]);


  if (account) {
    ReactGA.set({
      userId: account,
      // any data that is relevant to the user session
      // that you would like to track with google analytics
    });
  }

  useEffect(() => {
    fetchAccount();
  }, [account])

  useEffect(() => {
    setCurrChainId(props.chainId)
  }, [props.chainId])
  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick}>Connect</Button>
      ) : (
        isMobile() ? (
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
        )
      )
      }
    </StyledAccountButton >
  );
};

const AddressSpan = styled.span`
font: Compita;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: ${props => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
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
  border: 1px solid ${props => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  /* margin-left: ${props => props.theme.spacing[3]}px; */
  &:hover {
    background-color: rgba(256,256,256,0.2);
  }
  /* @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  } */
`;


const StyledA = styled.a`
  font-size: ${props => props.theme.fontSizes.xs};
  text-decoration: none !important;
  color: white;
  transition: all 0.1s linear;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default AccountButton;
