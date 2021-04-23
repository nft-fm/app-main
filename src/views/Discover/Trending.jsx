import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import NftCard from "../../components/NftCards/SaleNftCard";
import LoadingFeatured from "../../components/NftCards/LoadingFeatured";

const Listen = () => {
  const [nfts, setNfts] = useState(<LoadingFeatured />)

  const formatNfts = (nftsData) => {
    return nftsData.map((nft) => {
      return (
        <NftCard nft={nft} />
      )
    });
  }

  const getFeatured = () => {
    axios.post("/api/nft-type/featured").then((res) => {
      const formattedNfts = formatNfts(res.data);
        formattedNfts.push(<FillerCard />);
        setNfts(formattedNfts);
    })
  }

  useEffect(() => {
    getFeatured();
  }, [])

  return (
    <LaunchContainer>
      <ContainerTitle>
        TRENDING
        </ContainerTitle>
      <ContainerOutline />
      <NftScroll> {nfts} </NftScroll>
    </LaunchContainer>
  );
};

const FillerCard = styled.div`
width: 226px;
height: 0px;
`

const NftScroll = styled.div`
justify-content: center;
display: flex;
flex-direction: row;
flex-wrap: wrap;
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