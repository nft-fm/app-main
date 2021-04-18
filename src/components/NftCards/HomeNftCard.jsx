import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import image from "../../assets/img/logos/fm_logo_1.png";
import cart from "../../assets/img/listen/cart.svg";
import Modal from "../Modal/Modal";
import BuyNftModal from "../BuyNftModal";
import { ReactComponent as IconHeart } from "../../assets/img/Icons/heart.svg";

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
            <Heart />
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

const Heart = styled(IconHeart)`
width: 18px;
height: 18px;
/* fill: pink; */
cursor: pointer;
transition: all 0.2s linear;
/* margin-top: -30px; */
 & path {
     stroke: ${props => props.theme.color.gray};
    }

    &:hover {
      & path {
     stroke: pink;
    }
}

`

// const Heart = styled(SVG)`
// width: 32px;
// height: 32px;
// /* fill: palevioletred; */
// cursor: pointer;
// transition: all 0.2s linear;
// & g path {
//   /* stroke: pink; */
//     /* fill: pink; */
//   }
// /* &:hover {
//   stroke: rgb(205,154,24);
// } */
// `

const Side = styled.div`
display: flex;
align-items: center;
`

const IconArea = styled.div`
  margin: 0 8px;
  display: flex;
  font-size: ${props => props.theme.fontSizes.xs};
`

const CardTop = styled.div`
width: calc(100% - 24px);
padding: 12px;
display: flex;
justify-content: space-between;
color: ${props => props.theme.color.gray};
font-weight: bold;
font-family: Compita;
`

const Container = styled.div`
  background-color: ${props => props.theme.boxColor};
  border: 1px solid ${props => props.theme.boxBorderColor};
  border-radius: ${props => props.theme.borderRadius}px;
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
