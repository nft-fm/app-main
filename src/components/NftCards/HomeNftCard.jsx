import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import image from "../../assets/img/logos/fm_logo_1.png";
import cart from "../../assets/img/listen/cart.svg";
import Modal from "../Modal/Modal";
import BuyNftModal from "../BuyNftModal";

const NftCard = (props) => {
  const { nft } = props;
  const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };
  console.log('nft', nft)
  return (
    <Container>
      <BuyNftModal open={isOpen} hide={hide} nft={nft} />
      <CardTop>
        <Side>

        <IconArea>

          {nft?.likeCount}
        </IconArea>
        <IconArea>

          {nft?.shareCount}
        </IconArea>
        </Side>
        <Side>

        </Side>
      </CardTop>
      <Image src={nft.imageUrl} alt="image" onClick={() => setIsOpen(!isOpen)} />
      <BottomContainer>
        <InfoContainer>
          <TrackName>{nft.title}</TrackName>
          <Artist>{nft.artist}</Artist>
        </InfoContainer>
        <Buy src={cart} alt="cart" onClick={() => setIsOpen(!isOpen)} />
      </BottomContainer>
    </Container>
  );
};

const Side = styled.div`

`

const IconArea = styled.div`
  display: flex;
  font-size: ${props => props.theme.fontSizes.xs};
`

const CardTop = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

const Container = styled.div`
  background-color: ${props => props.theme.boxColor};
  border-radius: ${props => props.theme.borderRadius};
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const Image = styled.img`
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-radius: 15px;
  object-fit: cover;
`;

const BottomContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
`;

const TrackName = styled.span`
  font-size: 0.9rem;
`;

const Artist = styled.span`
  font-size: 0.8rem;
  color: #7e2ce3;
  padding-left: 5px;
`;

const Buy = styled.img`
  width: 25px;
  height: 25px;
  padding-right: 10px;
  cursor: pointer;
`;

export default NftCard;
