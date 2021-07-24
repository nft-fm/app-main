import React, { useState } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import TopDisplayContainer from "../../components/TopDisplayContainer";
import { providers } from "ethers";

import { NavLink } from "react-router-dom";
import isMobile from "../../utils/isMobile";
import BaseView from "../../components/Page/BaseView";
import { useWallet } from 'use-wallet';
import axios from 'axios'
import Swal from "sweetalert2";
import { warningIcon, imageWidth, imageHeight } from "../../utils/swalImages";



const RegisterArtist = () => {
  const { account, connect } = useWallet()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const connectWallet = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    if ((Number(newChainId) === process.env.REACT_APP_IS_MAINNET ? 1 : 4)) {
      connect("injected");
    } else {
      Swal.fire({
        title: "Wrong Chain",
        text: "You are on the wrong chain. Please connect to Ethereum Mainnet.",
        imageUrl: warningIcon,
        imageWidth,
        imageHeight      
      });
    }
  }

  const submit = () => {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    signer.signMessage(JSON.stringify({ name, email, account })).then((authorization) => {
      axios.post('/api/user/send-artist-form', {
        name,
        email,
        account,
        auth: authorization
      }).then(res => {
        Swal.fire({
          title: `Submitted`
        });
        setName("")
        setEmail("")
      })
    })
  }

  return (
    <Switch>
      <BaseView>
        <CardContainer>
          <TopDisplayContainer />
          <StyledTitle>Register as an Artist</StyledTitle> <ContainerOutline />
          <Content>
            <SignatureRow>
              <SignatureContainer >
                Full Name:
                <Signature name="name" onChange={(e) => setName(e.target.value)} value={name} />
              </SignatureContainer>
            </SignatureRow>
            <SignatureRow>
              <SignatureContainer>
                Email:
                <Signature name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </SignatureContainer>

            </SignatureRow>
            {account ? <SubmitButton onClick={submit}>Submit</SubmitButton> : <SubmitButton onClick={() => connectWallet()}>Connect Wallet</SubmitButton>}
          </Content>
        </CardContainer>
      </BaseView>
    </Switch >
  );
};


const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
`;

const SubmitButton = styled.button`
  margin: 20px auto 0 auto;
  width: 80%;
  padding: 10px 0;
  /* border: 2px solid white; */
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;

  &:hover {
    background-color: #444;
    color: white;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  padding-top: 0px;
  color: white;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(256, 256, 256, 0.6);
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  margin: 5px 0 20px 0;
`;

const SignatureRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  @media only screen and (max-width: 1337px) {
    flex-direction: column;
  }
`;
const SignatureContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: left;
  display: inline;
  font-size: 18px;
  margin-top: 15px;
`;
const Signature = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  border: none;
  border-bottom: 2px solid white;
  color: white;
  text-align: center;
  margin: 0 8px;
  margin-bottom: 2px;
  height: 24px;
  font-size: 16px;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Upload = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  border: none;
  margin: 5px;
  height: 24px;
  font-size: 16px;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const BulletPoint = styled.span`
  margin-bottom: 5px;
  text-align: left;
  font-size: 16px;
`;

const Title = styled.h3`
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Container = styled.div`
  margin-top: 3vh;
  width: 50%;
  border: 1px solid #2d2d34;
  border-radius: 5px;
  background-color: #17171a;
  align-items: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  box-sizing: border-box;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  text-align: center;
  color: white;
`;

const ContainerOutline = styled.div`
  /* border-radius: 24px 24px 0 0; */
  border-top: 6px solid #383838;
  /* border-bottom: none; */
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;

const StyledLinkContainer = styled.div`
  margin-top: 2vh;
  height: 70px;
  width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(NavLink)`
  font-size: 30px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  text-decoration: none;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: white;
  text-transform: uppercase;
  border: 1px solid ${(props) => props.theme.color.red};
  border-radius: ${props => props.theme.borderRadius}px;
  position: relative;
  padding: 12px;
  width: fit-content;
  background-color: #181818;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
    background-size: 12px, 100%;
    font-size: 32px;
  }
`;

const SubText = !isMobile()
  ? styled.div`
      font-size: 60px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: white;
    `
  : styled.div`
      font-size: 40px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: white;
    `;

const HeaderText = !isMobile()
  ? styled.div`
      font-size: 200px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      color: white;
      margin-top: 14vh;
    `
  : styled.div`
      font-size: 160px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      color: white;
      margin-top: 12vh;
    `;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default RegisterArtist;
