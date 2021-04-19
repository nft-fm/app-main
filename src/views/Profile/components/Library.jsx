import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../../components/NftCards/SaleNftCard";


const Library = () => {
    const [nfts, setNfts] = useState([])
  
    useEffect(() => {
      axios.get("/api/nft-type/all").then((res) => setNfts(res.data));
    }, [])
  
    const showNfts = nfts.map((nft) => {
      return (
        <NftCard nft={nft} />
      )
    }); 
  
    return (
      <Landing>
        <LaunchContainer>
          <ContainerTitle>
              MY LIBRARY
          </ContainerTitle>
          <ContainerOutline />
          <NftScroll> {showNfts} </NftScroll>
        </LaunchContainer>
      </Landing >
    );
  };
  
  
  
  const ContainerTitleText = styled.span`
  padding-left: 6px;
  `
  
  const Landing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* height: calc(100vh - ${props => props.theme.topBarSize}px + 1px); */
  width: ${props => props.theme.homeWidth}px;
  max-width: 80vw;
  padding-top: 40px;
  color: white;
    font-size: ${props => props.theme.fontSizes.xs};
    padding-right: 4px;
  `
  
  const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
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
    font-weight: bold;
    left: calc(10% + 50px);
    top: -4px;
    padding: 0 12px;
    font: Compita;
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
  export default Library;