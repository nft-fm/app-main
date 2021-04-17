import React, { useCallback, useEffect } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import useModal from "../../../hooks/useModal";
import isMobile from "../../../utils/isMobile";
import axios from "axios";
import InstallMetamaskModal from "../../InstallMetamaskModal";



const AccountButton = (props) => {
  const [onPresentInstallMetamask] = useModal(<InstallMetamaskModal />);
  const { account, connect } = useWallet();
  const fetchAccount = async () => {
    axios.post(`api/user/get-account`,
      { address: account, }).then(res => {
        console.log("user", res.data)
      }).catch(err => {
        console.log(err);
      })
  };

  const handleUnlockClick = useCallback(() => {
    if (!window.ethereum) {
      onPresentInstallMetamask();
    }
    if (isMobile()) {
      // connect('injected');
      connect("walletconnect")//.then(() => { getS3Bucket() });
    } else {
      connect("injected")//.then(() => { getS3Bucket() });
      // onPresentWalletProviderModal()
    }
    console.log('account', account)
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
    console.log('account', account)
    fetchAccount();
  }, [account])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button onClick={handleUnlockClick}>Connect</Button>
      ) : (
        <StyledAccountInfo>
          {/* <Oval /> */}
          {isMobile() ? (
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
        </StyledAccountInfo>
      )}
    </StyledAccountButton>
  );
};

const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  color: white;
  @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
  }
`;

const StyledAccountButton = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 2px solid ${props => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  background-color: #181818;
  &:hover {
    background-color: rgba(256,256,256,0.2);
  }
  @media only screen and (max-width: 767px) {
    background-size: 100% 100%;
    width: 100px;
    margin-left: -15px;
  }
`;


const StyledAccountInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledA = styled.a`
  font-size: ${props => props.theme.fontSizes.xs};
  text-decoration: none !important;
  color: white;
  transition: all 0.1s linear;
`;

export default AccountButton;
