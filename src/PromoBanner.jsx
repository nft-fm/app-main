import React from "react";
import styled from "styled-components";

const GetEmailModal = () => {
  return (
    <Container>
      <PromoText>💚 Buy an NFT for an immediate VINYL airdrop! Click on an NFT for more information. 💚</PromoText>
      <MobilePromoText>💚 Buy an NFT for a VINYL airdrop bonus! 💚</MobilePromoText>
      {/* <CountDownContainer><CountDown endTime={1637546400000}/></CountDownContainer> */}
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

  // height: 100px;
}
`


export default GetEmailModal;
