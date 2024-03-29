import React from "react";
import styled from "styled-components";
import swal from "sweetalert2";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import BaseView from "../../components/Page/BaseView";
import { useAccountConsumer } from "../../contexts/Account";
import { noMetaMaskWarning } from '../../utils/connectWallet';
import { imageHeight, imageWidth, warningIcon } from "../../utils/swalImages";
import Library from "./components/LibraryNfts";
import AccountButton from '../../components/TopBar/components/AccountButton'

const Profile = () => {
  const { account, connect, user } = useAccountConsumer();


  return (
    <BaseView>
      {!account && (
        <IsConnected>
          <GetConnected>
            <AccountButton />
          </GetConnected>
        </IsConnected>
      )}
      <Library user={user} />
    </BaseView>
  );
};

const Spacer = styled.div`
width: 10px;
`

const LogoContainer = styled.div`
display: flex;
flex-direction: row;
`


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
