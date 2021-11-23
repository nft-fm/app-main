import React, { useState } from 'react'
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";
import styled from 'styled-components'
import WalletConnectLogo from '../../assets/img/wallet_connect.svg'
import Web3 from "web3"
import { useAccountConsumer } from "../../contexts/Account";

function Modal() {

    const [state, setState] = useState({
        connector: null
    });
    const { account, connect } = useAccountConsumer();


    return (
        <div>
            <ConnectButton
                onClick={() => {
                    connect()
                }}
            >
                <LogoContainer>
                    <img src={WalletConnectLogo} />
                    <Spacer />
                </LogoContainer>
                <ButtonText>Connect Wallet</ButtonText>
            </ConnectButton>
        </div>
    )
}

const Spacer = styled.div`
width: 10px;
`

const LogoContainer = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 5px;
img {
    width: 25px;
    height: 25px;
}
`
const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
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



export default Modal;