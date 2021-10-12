import React from "react";
import styled from "styled-components";
import switchNetwork from "../../../utils/switchNetwork";
import { useAccountConsumer } from "../../../contexts/Account";

const UseBscSorry = () => {
  const { currChainId, account, connect } = useAccountConsumer();
  const switchBsc = async () => {
    await switchNetwork("BSC");
    window.location.reload();
  };
  return (
    <StyledLinkContainer>
      {!account && (currChainId === 56 || currChainId === 97) ? (
        <StyledLink>
          <BigTitle>Connect Wallet</BigTitle>
          <SubTitle>
            you need to be connected to access staking
          </SubTitle>
          <ButtonContainer>
            <Button onClick={() => connect('injected')}>Connect Your MetaMask</Button>
          </ButtonContainer>
        </StyledLink>
      ) : (
        <StyledLink>
          <BigTitle>Change Network</BigTitle>
          <SubTitle>
            you need to be on Binance Smart Chain to access staking
          </SubTitle>
          <ButtonContainer>
            <Button onClick={switchBsc}>Switch To Binance Smart Chain</Button>
          </ButtonContainer>
        </StyledLink>
      )}
    </StyledLinkContainer>
  );
};

const ButtonContainer = styled.div`
  margin-top: 20px;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  border: 2px solid ${(props) => props.theme.color.red};
  cursor: pointer;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  padding: 20px;
  border-radius: 15px;
  &:hover {
    background-size: 12px, 100%;
    font-size: 22px;
    background-color: rgba(256, 256, 256, 0.2);
  }
`;

const StyledLink = styled.div`
  font-size: 40px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: black;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  position: relative;
  padding: 30px;
  width: fit-content;
  border-radius: ${(props) => props.theme.borderRadius}px;
  color: white;
`;

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  height: 300px;
  width: 90vw;
  position: absolute;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin-bottom: 20px;
`;

const BigTitle = styled.div`
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  max-width: 80vw;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
`;

export default UseBscSorry;
