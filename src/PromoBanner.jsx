import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AccountProvider, useAccountConsumer } from "./contexts/Account";
import { ReactComponent as XIcon } from "./assets/img/icons/x.svg";
import { ReactComponent as CheckIcon } from "./assets/img/icons/check_circle.svg";
import { CountDown } from './components/Countdown'

const GetEmailModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container open={open}>
      <PromoText>💚 Announcing a new airdrop campaign for NFT purchasers! Click an NFT to learn more! 💚</PromoText>
      <MobilePromoText>💚 Buy an NFT for a VINYL airdrop bonus! 💚</MobilePromoText>
      <CountDownContainer><CountDown endTime={1637546400000}/></CountDownContainer>
    </Container> 
  )
}

const MobilePromoText = styled.div`
display: none;
@media only screen and (max-width: 776px) {
  display: block;
}
`

const CountDownContainer = styled.div`
position: absolute;
right: 10px;
@media only screen and (max-width: 776px) {
  position: relative;
  right: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
`

const Row = styled.div`
`

const DetailsText = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
`

const XButton = styled.div`
width: 20px;
height: 20px;
position: absolute;
right: 10px;
cursor: pointer;

`

const PromoText = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
@media only screen and (max-width: 776px) {
display: none;
}
`

const Container = styled.div`
width: 100vw;
height: 40px;
border-bottom: 1px solid #232323;
background-color: #121212;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: #888;
@media only screen and (max-width: 776px) {
  flex-direction: column;
  justify-content: space-evenly;

  height: 100px;
}
`


export default GetEmailModal;
