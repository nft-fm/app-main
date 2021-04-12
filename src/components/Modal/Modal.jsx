import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import Card from "../Card";
import axios from "axios";
import NftCard from "../NftCard/NftCard";
import image from "../../assets/img/logos/fm_logo_1.png";
import cart from "../../assets/img/listen/cart.svg";
import x from "../../assets/img/listen/x.svg";

const Modal = ({ open, children, hide, onClose, nft }) => {
  if (!open) return null;
  const stopProp = (e) => {
    e.stopPropagation();
  };

  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <Buy src={cart} alt="cart" />
          <X src={x} onClick={(e) => hide(e)} />
          <Image src={image} alt="image" />
          <InfoContainer>
            <TrackName>{nft.title}</TrackName>
            <Artist>{nft.artist}</Artist>
          </InfoContainer>
          <BottomContainer>
            <span>Price:</span>
            <span>{nft.price} &nbsp; ETH</span>
          </BottomContainer>
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
  justify-content: space-between;
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

export default Modal;
