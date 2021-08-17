import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import RedemptionGif from "../../../assets/img/redemption.gif";

const Redemption = () => {
  return (
    <Container>
      <Header>We're on it!</Header>
      <RedeemGif src={RedemptionGif} alt="Thank you for redeeming your NFT!" />
      <TextSection>
        Thank you for your purchase!
      </TextSection>
    </Container>
  );
};

const Container = styled.form`
  /* width: 100%; */
  /* height: 800px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.box};
  border: 2px solid ${(props) => props.theme.color.boxBorder};
  margin-top: 100px;
  /* padding: 36px 0 40px; */
  padding: 20px;
  color: white;
  @media only screen and (max-width: 776px) {
    margin: 50px 0;
    border-radius: 0px;
  }
`;

const RedeemGif = styled.img`
  width: 250px;
  aspect-ratio: 1;
`;

const Header = styled.h1`
  text-align: center;
`;
const TextSection = styled.span`
  text-align: center;
`;
export default Redemption;
