import React from "react";
import styled from "styled-components";
import switchNetwork from "../../../utils/switchNetwork";
import { useAccountConsumer } from "../../../contexts/Account";
import IconMetamask from "../../../assets/img/icons/metamask_icon.png";
import AccountButton from '../../../components/TopBar/components/AccountButton'


const UseBscSorry = () => {
  const { currChainId, account, connect } = useAccountConsumer();
  const switchBsc = async () => {
    await switchNetwork("BSC");
    window.location.reload();
  };
  return (
    <StyledLinkContainer>
      {!account && (currChainId === 56 || currChainId === 97) ? (
        <IsConnected>
          <GetConnected>
            <AccountButton />
          </GetConnected>
        </IsConnected>
      ) : (
        <StyledLink>
          <BigTitle>Change Network</BigTitle>
          <SubTitle>
            you need to be on Binance Smart Chain to access staking
          </SubTitle>
          <ButtonContainer>
            <Button
              aria-label="Switch to BSC"
              onClick={switchBsc}
            >Switch To Binance Smart Chain</Button>
          </ButtonContainer>
        </StyledLink>
      )}
    </StyledLinkContainer>
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
        background - color: ${(props) => props.theme.color.boxBorder};
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
      /* background-color: rgba(0, 0, 0, 0.7); */
      position: absolute;
      z-index: 11;
      `;

const ButtonContainer = styled.div`
      margin-top: 20px;
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      `;

const Button = styled.button`
      color: white;
      background: transparent;
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
        background - size: 12px, 100%;
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
      margin-top: 0px;
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
