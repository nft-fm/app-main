import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";

import { NavLink } from "react-router-dom";
import BaseView from "../BaseView";
import { useAccountConsumer } from "../../contexts/Account";

import CreateForm from "./Components/CreateForm";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";

const Create = () => {
  const { account, connect, user, setUser, usdPerEth } = useAccountConsumer();
  return (
    <BaseView>
    {!account && (
      <IsConnected>
        <GetConnected>
          <ConnectButton onClick={() => connect("injected")}>
            <MetaMask src={IconMetamask} />
            <ButtonText>Connect Wallet</ButtonText>
          </ConnectButton>
        </GetConnected>
      </IsConnected>
    )}
    {user && !user?.username && (
      <IsConnected>
        <GetConnectedNav>
          <span>Head to the Profile page and set a username. Then you can start making NFT's!</span>
          <ConnectNavLink to="/profile">
            <ButtonTextNav>Profiles</ButtonTextNav>
          </ConnectNavLink>
        </GetConnectedNav>
      </IsConnected>
    )}
     <CreateForm />
    </BaseView>
  );
};


const ButtonTextNav = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 600;
  color: white;
  padding: 5px;
`;
const GetConnectedNav = styled.div`
  width: 400px;
  height: 200px;
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
  font-size: ${props => props.theme.fontSizes.md};
  text-align: center;
  padding: 20px;
`;


const ConnectNavLink = styled(NavLink)`
text-decoration: none;
  width: 140px;
  /* height: 64px; */
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

export default Create;
