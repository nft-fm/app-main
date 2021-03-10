import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Switch } from "react-router-dom";
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import Background from '../../assets/img/background.jpg'
import TopDisplayContainer from "../../components/TopDisplayContainer";
import UserProfile from "./UserProfile";
import isMobile from "../../utils/isMobile";
import { MyNftsProvider } from "../../contexts/MyNfts";

const Profile = () => {
  const { account, connect } = useWallet()

  return (
    <Switch>
      <MyNftsProvider>
        <StyledCanvas>
          <BackgroundSection />
          <ContentContainer>
            <Page>
              <TopDisplayContainer />
              {account ?
                <UserProfile />
                :
                <StyledLinkContainer onClick={() => connect('injected')}>
                  <StyledLink>
                    <BigTitle>
                      Connect Your Wallet
              </BigTitle>
                    <SubTitle>
                      to access your profile
                </SubTitle>
                  </StyledLink>
                </StyledLinkContainer>
              }
            </Page>
          </ContentContainer>
        </StyledCanvas>
      </MyNftsProvider>
    </Switch>
  )
}


const StyledLink = styled.a`
font-family: "Comic Book";
font-size: 80px;
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
background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.3" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23250E17"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
  #fff;
background-size: 12px, 100%;
border: 4px solid #000;
position: relative;
padding: 30px;
box-shadow:10px 10px 0 #222;
width: fit-content;
cursor: pointer;
&:hover {
    color: black;
    background: url('data:image/svg+xml;utf8,<svg width="100" height="100" transform="rotate(25)" opacity="0.8" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="%23d68810"><circle cx="25" cy="25" r="12.5" /><circle cx="75" cy="75" r="12.5" /><circle cx="75" cy="25" r="12.5" /><circle cx="25" cy="75" r="12.5" /></g></svg>'),
    #ffcd28;
    background-size: 12px, 100%;
    font-size: 85px;
  }
`

const StyledLinkContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 20vh;
height: 300px;
width: 800px;
`

const SubTitle = styled.div`
font-family: "Bangers";
font-size: 30px;
color: rgba(0,0,0,0.8);
font-stretch: normal;
font-style: normal;
line-height: 1;
letter-spacing: normal;
`

const BigTitle = styled.div`
font-family: "Bangers";
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: rgb(255, 204, 74);
  max-width: 80vw;
	margin: 0 auto 20px auto;
	display: flex;
  align-items: center;
  color: black;
  text-shadow: rgb(120,120,120) 3px 3px 0px;
`

const BackgroundSection = styled.div`
  background-image: url(${Background});
  filter: brightness(90%);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;`

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

export default Profile