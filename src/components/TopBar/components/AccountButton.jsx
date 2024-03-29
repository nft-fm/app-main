import React, { useEffect } from "react";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { noMetaMaskWarning } from '../../../utils/connectWallet';
import isMobile from "../../../utils/isMobile";
import ChainSelector from "./ChainSelector";
import IconMetamask from "../../../assets/img/icons/metamask_icon.png";
import Cookies from 'universal-cookie'
import swal from 'sweetalert2'
import metamaskLogo from "../../../assets/img/metamask_fox.svg";
import axios from 'axios'
import {
  useLocation,
} from "react-router-dom";
import queryString from "query-string";

// https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system

function getMetaMaskLink() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return {
      title: "Open in App Store",
      link: "https://metamask.app.link/dapp/beta.fanfare.fm",
    };
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return {
      title: "Open in App Store",
      link: "https://metamask.app.link/dapp/beta.fanfare.fm",
    };
  }
  return {
    title: "Open Instructions",
    link: "https://metamask.io/download.html",
  };
}

const AccountButton = (props) => {
  const { account, connect } = useAccountConsumer();
  const cookies = new Cookies()
  // const [onPresentInstallMetamask] = useModal(<InstallMetamaskModal />);

  const handleUnlockClick = () => {
    if (window.ethereum) {
      connect("injected")
      cookies.set('connected', true)
    }
    else
      openMetamaskAlert();
  }

  useEffect(() => {
    if (queryString.parse(location.search).utm_source) {
      axios.post('/api/email/referral', {
        joiner: account,
        referrer: queryString.parse(location.search).utm_content,
      })
    }
    // if (window.location.pathname.substring(0, 3) === '/r/') {
    //   axios.post('/api/email/referral', {
    //     referrer: window.location.pathname.substring(3, window.location.pathname.length),
    //     joiner: account
    //   })
    // }
  }, [account])
  const location = useLocation();

  const openMetamaskAlert = async () => {
    if (account) return;

    const { title, link } = getMetaMaskLink();
    window.open(link, "_blank").focus();

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
      {!account ? (
        <ConnectButton onClick={handleUnlockClick}>
          <LogoContainer>
            <MetaMask src={IconMetamask} />
            <Spacer />
            <MetaMask src={"https://trustwallet.com/assets/images/media/assets/trust_platform.svg"} />
          </LogoContainer>
          <ButtonText>{isMobile() ? 'Connect Metamask' : 'Connect Wallet'}</ButtonText>
        </ConnectButton>
      ) : isMobile() ? (
        <StyledAccountButton>
          <StyledA
            href={`https://etherscan.io/address/${account}`}
            target={`_blank`}
            style={{ marginLeft: "-5px" }}
          >
            <div>{account.substring(0, 6)}</div>
            <div>{"..." + account.substring(account.length - 4)}</div>
          </StyledA>
        </StyledAccountButton>
      ) : (
        <StyledAccountButton>
          <StyledA
            href={`https://etherscan.io/address/${account}`}
            target={`_blank`}
          >
            {account.substring(0, 6) +
              "..." +
              account.substring(account.length - 4)}
          </StyledA>
        </StyledAccountButton>
      )}
    </>
  );
};


const Spacer = styled.div`
width: 10px;
`

const LogoContainer = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 5px;
`

const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
`;

const MetaMask = styled.img`
  width: 18px;
  height: auto;
`;

const ConnectButton = styled.button`
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.red};
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.box};
  margin-left: 10px;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }
`;

const GetConnected = styled.div`
  width: 300px;
  height: 150px;
  color: white;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 300px;
`;

const IsConnected = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 11;
`;

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
  margin-left: ${(props) => props.theme.spacing[3]}px;
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
