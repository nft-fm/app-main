import React from "react";
import styled from "styled-components";
import logo from "../../../assets/img/logos/logo.png";
import Modalmd from "../../../components/Modal";
import ModalTitle from "../../../components/ModalTitle";

const BetRulesModal = () => {
  return (
    <Modalmd>
      <Container>
        <Image src={logo} alt="logo" />
        <Space />
        <ModalTitle text="Help suggest what we should do next!" />
        <ModalSpacer>
          <ModalContent>
            {/* You must have BDT or ETH-BDT-LP staked to participate in community governance. The more you have staked, the more voting power you wield. */}
          </ModalContent>
          <ModalContent>You can make one proposal every 24 hours.</ModalContent>
        </ModalSpacer>
      </Container>
    </Modalmd>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Space = styled.div`
  height: 30px;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
  margin: 0 auto 10px auto;
`;

const ModalContent = styled.div`
  font-family: "Nunito";
  font-size: 18px;
  font-stretch: normal;
  text-align: center;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  margin: 10px;
`;

const ModalSpacer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default BetRulesModal;
