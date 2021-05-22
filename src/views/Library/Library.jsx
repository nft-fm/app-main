import React from "react";
import BaseView from "../../components/Page/BaseView";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import Library from "./components/LibraryNfts";
import swal from "sweetalert2";

const Profile = () => {
  const { account, connect, user } = useAccountConsumer();

  const connectWallet = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    if ((Number(newChainId) === process.env.REACT_APP_IS_MAINNET ? 1 : 4)) {
      connect("injected");
    } else {
      swal.fire({
        title: "Wrong Chain",
        text:
          "You are on the wrong chain. Please connect to Ethereum Mainnet.",
        icon: "warning",
      });
    }
  }

  return (
    <BaseView>
      {!account && (
        <IsConnected>
          <GetConnected>
            <ConnectButton onClick={() => connectWallet()}>
              <MetaMask src={IconMetamask} />
              <ButtonText>Connect Wallet</ButtonText>
            </ConnectButton>
          </GetConnected>
        </IsConnected>
      )}
      <Library user={user} />
    </BaseView>
  );
};

const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
`;

const MetaMask = styled.img`
  width: 32px;
  height: auto;
`;

const ConnectButton = styled.button`
  width: 140px;
  height: 64px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.box};
  /* margin-bottom: 20px; */
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
export default Profile;
