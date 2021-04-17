import React, { useEffect } from 'react';
import styled from 'styled-components';
import Loading from '../../assets/img/loading.gif';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import CloseModal from '../Modal/CloseModal';
import Modalmd from "../Modal/Modalmd";
import Modallg from "../Modal/Modallg";
import Modalsm from "../Modal/Modalsm";
import {useAccountConsumer} from "../../contexts/Account";

const ChangeChainModal = ({ onDismiss }) => {
  const { account } = useAccountConsumer();
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
          <ModalTitle>Change Network</ModalTitle>
          <b>To be able to access our pages you need to be on Ethereum Mainnet</b>
          <b>Please Switch Networks</b>
          <LoadIcon src={Loading}/>
        </Content>
       </Modalsm>
    </Modal>
  )
}


const LoadIcon= styled.img`
  width: 50px;
`;

const Content = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default ChangeChainModal
