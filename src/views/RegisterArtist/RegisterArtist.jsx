import axios from "axios";
import { providers } from "ethers";
import React, { useState } from "react";
import { useEffect } from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert2";
import BaseView from "../../components/Page/BaseView";
import { useAccountConsumer } from "../../contexts/Account";
import {
  errorIcon,
  imageHeight,
  imageWidth,
  warningIcon,
} from "../../utils/swalImages";

const RegisterArtist = () => {
  const { account, connect } = useAccountConsumer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [musicLinks, setMusicLinks] = useState("");

  const connectWallet = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    if (Number(newChainId) === process.env.REACT_APP_IS_MAINNET ? 1 : 4) {
      connect("injected");
    } else {
      swal.fire({
        title: "Wrong Chain",
        text: "You are on the wrong chain. Please connect to Ethereum Mainnet.",
        imageUrl: warningIcon,
        imageWidth,
        imageHeight,
      });
    }
  };

  const submit = () => {
    if (name === "" || email === "" || musicLinks === "") {
      swal.fire({
        title: "Missing Information",
        text: "Please fill out all fields.",
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      });
      return;
    }

    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    signer
      .signMessage(JSON.stringify({ name, email, account, musicLinks }))
      .then((authorization) => {
        console.log('here')
        axios
          .post("/api/user/send-artist-form", {
            name,
            email,
            account,
            musicLinks,
            auth: authorization,
          })
          .then((res) => {
            swal.fire({
              title: `Thank you for submitting. You will be receiving a follow up email in the next 1-3 days.`,
            });
            setName("");
            setEmail("");
            setMusicLinks("");
          })
          .catch((err) => {
            console.log("err", err.response);
            swal.fire({
              title: `Error: ${err.response ? err.response.status : 404}`,
              text: `${err.response ? err.response.data : "server error"}`,
              imageUrl: errorIcon,
              imageWidth,
              imageHeight,
            });
          });
      });
  };

  useEffect(() => {
    window.location.replace("https://www.fanfare.fm/artist-registration/?utm_source=backlink&utm_campaign=artist-registration&utm_content=beta");
  })

  return (
    <Switch>
      <BaseView>
        <CardContainer>
          <StyledTitle>Register as an Artist</StyledTitle>
          <Content>
            <SignatureRow>
              <SignatureContainer>
                Full Name:
                <Signature
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  value={name}
                />
              </SignatureContainer>
            </SignatureRow>
            <SignatureRow>
              <SignatureContainer>
                Email:
                <Signature
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
              </SignatureContainer>
            </SignatureRow>
            <SignatureRow>
              <SignatureContainer>
                Links to Music Platforms (Soundcloud, Spotify, etc. Please
                separate with commas):
                <Signature
                  name="musicLinks"
                  onChange={(e) => setMusicLinks(e.target.value)}
                  placeholder="Links"
                  value={musicLinks}
                />
              </SignatureContainer>
            </SignatureRow>
            {account ? (
              <SubmitButton onClick={submit}>Submit</SubmitButton>
            ) : (
              <SubmitButton onClick={() => connectWallet()}>
                Connect Wallet
              </SubmitButton>
            )}
          </Content>
        </CardContainer>
      </BaseView>
    </Switch>
  );
};

const SubmitButton = styled.button`
  margin: 40px auto 0 auto;
  width: 80%;
  padding: 10px 0;
  /* border: 2px solid white; */
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${(props) => props.theme.color.blue};
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
  border-bottom: 2px solid ${(props) => props.theme.color.gray};
  color: white;
  text-align: left;
  margin: 0 8px;
  margin-bottom: 2px;
  height: 24px;
  font-size: 16px;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 20px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  text-align: center;
  color: white;
`;

const CardContainer = styled.div`
  margin-top: 80px;
  color: white;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 64px);
  padding: 32px;
  margin-bottom: 40px;
  border: solid 1px #262626;
  background-color: #181818;
  h3 {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 25px;
  }
  & > span {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media only screen and (max-width: 776px) {
    & > span {
      padding-left: 0;
      padding-right: 0;
    }
    h3 {
      padding-left: 0px;
      padding-right: 0 px;
    }
  }
`;

export default RegisterArtist;
