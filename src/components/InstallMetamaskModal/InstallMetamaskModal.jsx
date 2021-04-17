import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import metamaskLogo from '../../assets/img/metamask_fox.svg';
import Button from '../Button';
import Modal, { ModalProps } from '../Modal';
import ModalActions from '../ModalActions';
import ModalContent from '../ModalContent';
import ModalTitle from '../ModalTitle';
import CloseModal from '../Modal/CloseModal';
import Modalmd from "../Modal/Modalmd";
import Modallg from "../Modal/Modallg";
import Modalsm from "../Modal/Modalsm";

const InstallMetamaskModal = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal>
      <Modalsm>
        <CloseModal onDismiss={onDismiss} />
        <Content>
          <ModalTitle>You need to install metamask</ModalTitle>
          <Logo src={metamaskLogo}/>
          <Button size="xlg" onClick={() => window.open("https://metamask.io/download.html",  '_blank').focus()}>Open Instructions</Button>
        </Content>
       </Modalsm>
    </Modal>
  )
}


const Logo = styled.img`
  width: 100px;
`;

const Content = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default InstallMetamaskModal
