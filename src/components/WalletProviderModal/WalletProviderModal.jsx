import React, { useEffect } from "react";
import styled from "styled-components";
import metamaskLogo from "../../assets/img/metamask_fox.svg";
import walletConnectLogo from "../../assets/img/wallet_connect.svg";
import { useAccountConsumer } from "../../contexts/Account";
import Button from "../Button";
import Modal from "../Modal";
import ModalActions from "../ModalActions";
import ModalContent from "../ModalContent";
import ModalTitle from "../ModalTitle";
import WalletCard from "./components/WalletCard";

const WalletProviderModal = ({ onDismiss }) => {
  const { account, connect } = useAccountConsumer();

  useEffect(() => {
    if (account) {
      onDismiss();
    }
  }, [account, onDismiss]);

  return (
    <Modal>
      <Space />
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect("injected")}
              title="Metamask"
            />
          </StyledWalletCard>
          <Spacer />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect("walletconnect")}
              title="WalletConnect"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button
          text="Cancel"
          variant="secondary"
          onClick={onDismiss}
          textColor="black"
        />
      </ModalActions>
      <Space />
    </Modal>
  );
};

const Spacer = styled.div`
  height: 4px;
`;

const Space = styled.div`
  height: 20px;
`;

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 400px) {
    flex-direction: column;
    flex-wrap: none;
  }
`;

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`;

export default WalletProviderModal;
