import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import Card from "../Card";
import axios from "axios";
import NftCard from "../NftCards/NftCard";
import image from "../../assets/img/logos/fm_logo_1.png";
import cart from "../../assets/img/listen/cart.svg";
import x from "../../assets/img/listen/x.svg";
import swal from "sweetalert2";

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

  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <Buy src={cart} alt="cart" />
          <X src={x} onClick={(e) => hide(e)} />
          <Image src={nft.imageUrl} alt="image" />
          <InfoContainer>
            <TrackName>{nft.title}</TrackName>
            <Artist>{nft.artist}</Artist>
          </InfoContainer>
          <BottomContainer>
            <Row>
              <span>Price:</span>
              <span>{nft.price} &nbsp; ETH</span>
            </Row>
            <Row>
              <span>Available:</span>
              <span>{nft.numMinted}</span>
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

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  padding: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  border-radius: 8px;
  /* position: absolute; */
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  padding: 15px;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  border: 1px solid #707070;
  object-fit: cover;
  overflow: hidden;
`;
const BottomContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
`;
const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TrackName = styled.span`
  font-size: 1.2rem;
`;
const Artist = styled.span`
  font-size: 1rem;
  color: #7e2ce3;
  padding-left: 5px;
`;
const Buy = styled.img`
  width: 25px;
  height: 25px;
`;
const X = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 0px;
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
