import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import LibraryCard from "../../../components/NftCards/LibraryCard";
import ArtistCard from "../../../components/NftCards/ArtistCard";

import { usePlaylistConsumer } from "../../../contexts/Playlist";

const Library = ({ user, isCreating, newNft }) => {
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();
  const { setNftsCallback } = usePlaylistConsumer();

  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => {
      return isCreating ? (
        <ArtistCard
          nft={nft}
          key={index}
          index={index}
          updateNft={updateNft}
          liked={
            user
              ? user.likes.find((like) => like.toString() === nft._id.toString())
              : false
          }
        />
      ) : (
        <LibraryCard
          nft={nft}
          key={index}
          index={index}
          updateNft={updateNft}
          selectNft={setSelectedNft}
          liked={
            user
              ? user.likes.find((like) => like.toString() === nft._id.toString())
              : false
          }
        />
      );
    });
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard/>)
    }
    return formattedNfts;
  }

  const getArtistNfts = async () => {
    axios
      .post("api/nft-type/artist-nfts", user)
      .then((res) => {
        setNfts(formatNfts(res.data));
        setNftsCallback(res.data)
      });
  };

  const getUserNfts = async () => {
    axios
      .post("api/nft-type/get-user-nfts", user)
      .then((res) => {
        setNfts(formatNfts(res.data));
        setNftsCallback(res.data)
      });
    // axios
    //   .get("api/nft-type/featured")
    //   .then((res) => {
    //     setNfts(res.data);
    //     setNftsCallback(res.data)
    //   });
  };

  useEffect(() => {
    !isCreating ? getUserNfts() : getArtistNfts();
  }, [user, isCreating, newNft]);

  const updateNft = (index, update) => {
    let newNfts = nfts;
    newNfts[index] = update;
    setNfts(newNfts);
  };


  return (
    <Landing>
      <LaunchContainer>
        <ContainerTitle>{isCreating ? "MY NFTS" : "MY LIBRARY"}</ContainerTitle>
        <ContainerOutline />
        <NftScroll> {nfts} </NftScroll>
      </LaunchContainer>
    </Landing>
  );
};

const FillerCard = styled.div`
width: 226px;
height: 0px;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  /* width: ${(props) => props.theme.homeWidth}px; */
  /* max-width: 80vw; */
  padding-top: 40px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
  padding-right: 4px;
`;

const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  /* & > * {
    margin: 0 5px 20px;
  } */
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
`;

const ContainerOutline = styled.div`
  /* border-radius: 24px 24px 0 0; */
  border-top: 6px solid #383838;
  /* border-bottom: none; */
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;
`;
export default Library;
