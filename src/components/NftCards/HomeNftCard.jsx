import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import image from "../../assets/img/logos/fm_logo_1.png";
import Modal from "../Modal/Modal";
import BuyNftModal from "../BuyNftModal";
import { ReactComponent as IconHeart } from "../../assets/img/Icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/Icons/share.svg";
import {ReactComponent as IconCart} from "../../assets/img/Icons/cart.svg";

const NftCard = (props) => {
  const { nft } = props;
  const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };
  console.log('nft', nft)

  const like = () => {
    //${!}
  }

  const share = () => {
    //${!}
  }

  return (
    <Container>
      <BuyNftModal open={isOpen} hide={hide} nft={nft} />
      <CardTop>
        <Side>
          <IconArea>
            <Heart onClick={() => like()} />
            {nft.likeCount}
          </IconArea>
          <IconArea>
            <Share onClick={() => share()} />
            {nft.shareCount}
          </IconArea>
        </Side>
        <Side>
          <IconArea>
            {nft.x_numSold}<span style={{margin: "0 1px"}}>
              /
              </span>
              {nft.numMinted}
            <Cart/>
          </IconArea>
        </Side>
      </CardTop>
      <Image src={nft.imageUrl} alt="image" onClick={() => setIsOpen(!isOpen)} />
      <BottomContainer>
        <InfoContainer>
          <TrackName>{nft.title}</TrackName>
          <Artist>{nft.artist}</Artist>
        </InfoContainer>
      </BottomContainer>
    </Container>
  );
};

const Cart = styled(IconCart)`
width: 20px;
height: 20px;
margin: -2px 0 0 8px;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.gray};
    }
&:hover {
  & path {
    fill: #20a4fc;
  }
}
`

const Share = styled(IconShare)`
width: 16px;
height: 16px;
margin: 0 4px 0 0;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
     fill: ${props => props.theme.color.gray};
    }
&:hover {
  & path {
    fill: #20a4fc;
  }
}
`

const Heart = styled(IconHeart)`
width: 20px;
height: 20px;
margin: -3px 4px 0 0;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
     stroke: ${props => props.theme.color.gray};
    }
&:hover {
  & path {
    stroke: #DD4591;
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
  font-size: 14px;
  height: 100%;
  align-items: center;
`

const CardTop = styled.div`
/* width: calc(100% - 4px); */
/* padding: 0px 2px; */
width: 100%;
margin-bottom: 8px;
display: flex;
justify-content: space-between;
font-weight: bold;
font-family: Compita;
`

const Container = styled.div`
  color: ${props => props.theme.color.gray};
  padding: 12px;
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
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
color: white;
font-weight: bold;
width: 100%;
text-align: center;
font-size: ${props => props.theme.fontSizes.xs}px;
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
