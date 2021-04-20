import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import logo from "../../assets/img/logos/logo_tiny.png";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";

const BuyNftModal = ({ open, children, hide, onClose, nft }) => {
  const { account, connect } = useWallet();
  if (!open) return null;
  const stopProp = (e) => {
    e.stopPropagation();
  };
  console.log("nft", nft);

  const purchase = (id) => {
    if (!account) {
      swal.fire("You need to connect your wallet first")
      return;
    }
    axios
      .post("/api/nft-type/purchase", { id: id, address: account })
      .then((res) => {
        console.log("purchase res", res);
      })
      .catch((err) => console.log(err));
  };

  const like = () => {
    //${!}
  }

  const share = () => {
    //${!}
  }

  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => hide(e)} />
          <CardTitle>
            <Logo src={logo} />
            Buy NFT
          </CardTitle>
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
                {nft.x_numSold}
                <span style={{ margin: "0 1px" }}>
                  /
              </span>
                {nft.numMinted}
                <Cart />
              </IconArea>
            </Side>
          </CardTop>
          <Image src={nft.imageUrl} alt="image" />
          <InfoContainer>
            <TrackName>{nft.title}</TrackName>
            <Artist>{nft.artist}</Artist>
          </InfoContainer>
          <BottomContainer>
            <Row>
              <PriceItem>Price:</PriceItem>
              <PriceItem>{nft.price} &nbsp; ETH</PriceItem>
            </Row>
            <Row>
              <AvailableItem>Available:</AvailableItem>
              <AvailableItem>{nft.numMinted}</AvailableItem>
            </Row>
          </BottomContainer>
          <BuyButton onClick={() => purchase(nft._id)}>
            <Button>Purchase NFT</Button>
          </BuyButton>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const AvailableItem = styled.div`
font-size: 0.8rem;
color: ${props=> props.theme.color.lightgray};
`

const PriceItem = styled.span`
font-size: ${props => props.theme.fontSizes.xs};
color: white;
`

const X = styled(IconX)`
    position: absolute;
    right: 6px;
    top: 9px;
width: 24px;
height: 24px;
margin: 0 4px 0 0;
cursor: pointer;
transition: all 0.2s ease-in-out;
 & path {
    transition: all 0.2s ease-in-out;
    stroke: ${props => props.theme.color.gray};
    fill: ${props => props.theme.color.gray};
    }
/* &:hover {
  & path {
    stroke: #20a4fc;
  }
} */
`


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
}`

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
/* padding: 0px 2px; */
width: 280px;
margin-bottom: 8px;
display: flex;
justify-content: space-between;
font-weight: bold;
font-family: Compita;
`

const Logo = styled.img`
width: 20px;
margin-right: 8px;
height: auto;
`

const CardTitle = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
font-family: Compita;
font-weight: bold;
color: white;
font-size: ${props => props.theme.fontSizes.sm};
margin-bottom: 16px;
`

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 500;
  backdrop-filter: blur(4.6px);
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  border-radius: 8px;
  border: solid 2px #181818;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.bgColor};
  padding: 12px;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
`;

const Image = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 15px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 16px;
`;

const BottomContainer = styled.div`
  width: 278px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TrackName = styled.span`
  color: white;
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: 8px;
`;
const Artist = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.color.lightgray};
  margin-bottom: 8px;

`;
const Buy = styled.img`
  width: 25px;
  height: 25px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const BuyButton = styled.div`
  width: 140px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 2px solid rgba(0, 0, 0, 0.7);
  margin: 0 16px;
  height: 28px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.box};
  &:hover {
    background-color: ${(props) => props.theme.color.red};
  }
`;

const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor.white};
  @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
    margin-top: 0px;
    padding: 5px 0px 10px 5px;
  }
`;
export default BuyNftModal;
