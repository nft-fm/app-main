import React, { useState } from 'react'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import styled from 'styled-components'
import WalletConnectLogo from '../../assets/img/wallet_connect.svg'

function Modal() {

    const [state, setState] = useState({ 
        connector: null
      });

    const walletConnectInit = async() => {
        // Bridge url
        const bridge = "https://bridge.walletconnect.org";
        const connector = new WalletConnect({ bridge });

        setState(connector)

        if (!connector.connected) {
            await connector.createSession();
        }

        QRCodeModal.open(connector.uri)

        await subscribeToEvents();
    }

    const subscribeToEvents = async() => {
        const connector = state.connector;

        if (!connector) {
            //window.alert("opps")
            return;
        } else {
            window.alert("yeah")
        }

    }

    return (
        <div>
            <ConnectButton
                onClick={() => {
                    walletConnectInit()
                }}
            >
            <LogoContainer>
            <img src= {WalletConnectLogo} />
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