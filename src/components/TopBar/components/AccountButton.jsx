import React from "react";
import styled from "styled-components";
import swal from 'sweetalert2';
import { useWallet } from "use-wallet";
import metamaskLogo from '../../../assets/img/metamask_fox.svg';
import isMobile from "../../../utils/isMobile";
import ChainSelector from "./ChainSelector";


// https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system

function getMetaMaskLink() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return {
      title: "Open in App Store",
      link: "https://metamask.app.link/bxwkE8oF99"
    }
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return {
      title: "Open in App Store",
      link: "https://metamask.app.link/skAH3BaF99"
    }
  }
  return {
    title: "Open Instructions",
    link: "https://metamask.io/download.html"
  }
}

const AccountButton = (props) => {
  const { account, connect } = useWallet();
  // const [onPresentInstallMetamask] = useModal(<InstallMetamaskModal />);
  const handleUnlockClick = () => (
    window.ethereum ? connect("injected") : openMetamaskAlert()
  );

  const openMetamaskAlert = async () => {
    if (account) return;

    const { title, link } = getMetaMaskLink()
    swal.fire({
      title: 'You need to install metamask.', 
      confirmButtonText: title,
      imageUrl: metamaskLogo, 
      imageWidth: 100
    }).then(({isConfirmed}) => {
      if (isConfirmed) {
        window.open(link, '_blank').focus()
      }
    })
  }

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
