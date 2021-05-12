import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import NftCard from "../../../components/NftCards/SaleNftCard";
import { useAccountConsumer } from "../../../contexts/Account";

const Listen = () => {
  const { user, account } = useAccountConsumer();
  const [allNfts, setAllNfts] = useState([]);

  const formatNfts = (nftsData) => {
    return nftsData.map((nft) => <NftCard nft={nft} />);
  };

  const getAll = () => {
    axios.post("/api/nft-type/all", { address: account }).then((res) => {
      const formattedNfts = formatNfts(res.data);
      for (let i = 0; i < 5; i++) {
        formattedNfts.push(<FillerCard />);
      }
      setAllNfts(formattedNfts);
    });
  };

  useEffect(() => {
    getAll();
  }, [user]);
  return (
    <LaunchContainer>
      <ContainerTitle>MARKET</ContainerTitle>
      <ContainerOutline />
      <NftScroll> {allNfts} </NftScroll>
    </LaunchContainer>
  );
};

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

const NftScroll = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LaunchContainer = styled.div`
  position: relative;
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
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 776px) {
    left: auto;
  }
`;

const ContainerOutline = styled.div`
  border-radius: 24px 24px 0 0;
  border: 6px solid #383838;
  border-bottom: none;
  height: 40px;
  width: 80%;
  /* display: flex;
  flex-direction: row; */
  @media only screen and (max-width: 776px) {
    border-radius: 0;
    width: 100%;
  }
`;

export default Listen;
