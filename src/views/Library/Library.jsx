import React, { useCallback, useEffect, useState, useRef } from "react";
import BaseView from "../BaseView";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import default_pic from "../../assets/img/profile_page_assets/default_profile.png";
import { useAccountConsumer } from "../../contexts/Account";
import cog from "../../assets/img/icons/cog.svg";
import { ReactComponent as CopyIcon } from "../../assets/img/icons/copy_icon.svg";
import { ReactComponent as plus_icon } from "../../assets/img/icons/plus_icon.svg";
import { ReactComponent as lock_icon } from "../../assets/img/icons/lock.svg";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import Library from "./components/Library";
import ProfilePic from "./components/ProfilePic";

const Profile = () => {
  const { account, connect, user, setUser } = useAccountConsumer();

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
      <Library user={user} />
    </BaseView>
  );
};

const Divider = styled.div`
width: 200px;
height: 1px;
background-color: ${props => props.theme.fontColor.gray};
margin-bottom: 6px;
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

const Landing = styled.div`
  /* height: 450px; */
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CopyButton = styled(CopyIcon)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: all 0.2s linear;
  position: absolute;
  margin-left: 150px;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }

  &:hover {
    & path {
      fill: ${(props) => props.theme.color.lightgray};
    }
  }
`;

const Username = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  white-space: nowrap;
`;

const AddressSpan = styled.span`
  color: ${(props) => props.theme.color.gray};
  display: flex;
  /* align-items: center;s */
  position: relative;
  height: 20px;
`;
const SideSpan = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BlueSpan = styled.span`
  padding-left: ${(props) => props.theme.spacing[1]}px;
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const Cog = styled.img`
  width: 15px;
  right: 45px;
  position: absolute;
  cursor: pointer;
  :hover {
    animation: rotation 4s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @media only screen and (max-width: 776px) {
    top: 0px;
    right: -25px;
  }
`;

const ProfileInfoHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Side = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  & > span:nth-child(1) {
    margin-top: 40px;
  }
`;

const ProfileHolder = styled.div`
  position: relative;
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProfileHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  height: 200px;
  /* margin-top: 80px; */
  color: ${(props) => props.theme.fontColor.white};
  width: 100%;
    justify-content: space-between;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const StyledInput = styled.input`
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${props => props.theme.fontSizes.sm};
  border: none;
  outline: none;
  color: white;
  opacity: 0.6;
  text-align: center;
`;

const AccountDetails = styled.div`
  width: 100%;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Banner = styled.div`
  height: 50px;
`;
export default Profile;
