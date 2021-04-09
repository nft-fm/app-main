import React from "react";
import styled from "styled-components";
import image from "../../assets/img/logos/fm_logo_1.png";
import cart from "../../assets/img/listen/cart.svg";

const NftCard = (props) => {
  return (
    <Container>
      <Image src={props.nft.image} alt="image" />
      <BottomContainer>
        <InfoContainer>
          <TrackName>{props.nft.title}</TrackName>
          <Artist>{props.nft.artist}</Artist>
        </InfoContainer>
        <Buy src={cart} alt="cart" />
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 10px;
`;
const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 15px;
  border: 1px solid #707070;
`;
const BottomContainer = styled.div`
width: 250px;
/* height: 100px; */
display: flex;
justify-content: space-between;
align-items: center;
/* padding: 10px */
`
const InfoContainer = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: flex-start;
padding-left: 10px;
`
const TrackName = styled.span`
font-size: .9rem;
`
const Artist = styled.span`
font-size: .8rem;
color: #7e2ce3;
padding-left: 5px;
`
const Buy = styled.img`
width: 25px;
height: 25px;
padding-right: 10px;
`

export default NftCard;
