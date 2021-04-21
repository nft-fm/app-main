import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../components/NftCards/SaleNftCard";
import logo from "../../assets/img/logos/logo.png";
import { ReactComponent as IconDiscord } from "../../assets/img/icons/coins.svg";
import { ReactComponent as IconMedium } from "../../assets/img/icons/social_medium.svg";
import { ReactComponent as IconTelegram } from "../../assets/img/icons/social_telegram.svg";
import { ReactComponent as IconTwitter } from "../../assets/img/icons/social_twitter.svg";

const Listen = () => {
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    axios.get("/api/nft-type/featured").then((res) => setNfts(res.data));
  }, [])

  const showNfts = nfts.map((nft) => {
    return (
      <NftCard nft={nft} />
    )
  });

  return (
    <Landing>
      <StyledTitle>
        MARKETPLACE
        </StyledTitle>
      <LaunchContainer>
        <ContainerTitle>
          TRENDING
        </ContainerTitle>
        <ContainerOutline />
        <NftScroll> {showNfts} </NftScroll>
      </LaunchContainer>

      <LaunchContainer>
        <ContainerTitle>
          MARKET
        </ContainerTitle>
        <ContainerOutline />
        <NftScroll> {showNfts} </NftScroll>
      </LaunchContainer>
    </Landing >
  );
};

const Landing = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
/* height: calc(100vh - ${props => props.theme.topBarSize}px + 1px); */
width: 100%;
color: white;
  font-size: ${props => props.theme.fontSizes.xs};
`

const IconContainer = styled.a`
margin: 0 8px;
  align-items: center;
  border: solid #707070;
  height: 28px;
  width: 98px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${props => props.theme.color.boxBorder};
  border-radius: 18px;
  background-color: ${props => props.theme.color.box};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
  background-color: ${props => props.theme.color.boxBorder};
  border: solid 1px #383838;
  }
`;


const SocialsBar = styled.div`
  width: 100%;
  position:relative;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const NftScroll = styled.div`
justify-content: center;
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
/* @media only screen and (max-width: 1500px) {
  & > * {
    &:nth-last-child(1) {
        display: none;
   }}}
   @media only screen and (max-width: 1191px) {
  & > * {
    &:nth-last-child(2) {
        display: none;
   }}}
   @media only screen and (max-width: 890px) {
  & > * {
    &:nth-last-child(3) {
        display: none;
   }}} */
`;

const LaunchContainer = styled.div`
  position:relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ContainerTitle = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 50px);
  top: -4px;
  padding: 0 12px;
  font: "Compita";
  background-color: ${props => props.theme.bgColor};
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 24px;
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${props => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  color: white;
`;

const NftFmTagline = styled.div`
  padding-bottom: 20px;
  font-size: large;
  color: white;
  text-align: center;
  text-wrap: wrap;
`;

export default Listen;