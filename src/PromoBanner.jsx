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
      <CountDownContainer><CountDown endTime={1635982149000}/></CountDownContainer>
    </Container>
  )
}

const CountDownContainer = styled.div`
position: absolute;
right: 10px;
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
`

const Container = styled.div`
width: 100vw;
height: ${props => props.open ? '140px' : '40px'};
border-bottom: 1px solid #232323;
background-color: #121212;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
color: #888;

`


export default GetEmailModal;
