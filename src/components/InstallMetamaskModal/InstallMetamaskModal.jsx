import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import metamaskLogo from '../../assets/img/metamask_fox.svg'
import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Modalmd from "../Modal/Modalmd";
import Modallg from "../Modal/Modallg";

const InstallMetamaskModal = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <OpaqueFilter onClick={onDismiss}>
      <Container>
        <StyledModal>
          You need to install metamask
          <img src={metamaskLogo}/>
          <Button onClick={() => window.open("https://metamask.io/download.html",  '_blank').focus()}>Open Instructions</Button>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  )
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  padding: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  border-radius: 8px;
  /* position: absolute; */
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  padding: 15px;
  font-size: 20px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;

export default InstallMetamaskModal
