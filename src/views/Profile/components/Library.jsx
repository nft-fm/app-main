import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import LibraryCard from "../../../components/NftCards/LibraryCard";
import ArtistCard from "../../../components/NftCards/ArtistCard";

import MusicPlayer from "../../../components/MusicPlayer";
const Library = ({ user, isCreating }) => {
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();

  const setNextNft = () => {
    const index = nfts.indexOf(selectedNft);
    const newIndex = index == nfts.length ? 0 : index + 1;
    setSelectedNft(nfts[newIndex]);
  }

  const setPrevNft = () => {
    const index = nfts.indexOf(selectedNft);
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    console.log("index, new Index, nfts.length:", index, newIndex, nfts.length);
    setSelectedNft(nfts[newIndex]);
  }

  const getArtistNfts = async () => {
    axios
      .post("api/nft-type/artist-nfts", user)
      .then((res) => setNfts(res.data));
  };

  const getUserNfts = async () => {
    axios
      .post("api/nft-type/get-user-nfts", user)
      .then((res) => setNfts(res.data));
    // axios
    //   .get("api/nft-type/featured")
    //   .then((res) => setNfts(res.data));
  };

  useEffect(() => {
    !isCreating ? getUserNfts() : getArtistNfts();
  }, [user, isCreating]);

  const updateNft = (index, update) => {
    let newNfts = nfts;
    newNfts[index] = update;
    setNfts(newNfts);
  };

  const showNfts = nfts.map((nft, index) => {
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

  return (
    <Landing>
      <LaunchContainer>
        <ContainerTitle>{isCreating ? "MY NFTS" : "MY LIBRARY"}</ContainerTitle>
        <ContainerOutline />
        <NftScroll> {showNfts} </NftScroll>
      </LaunchContainer>
      {selectedNft &&
        <MusicPlayer nft={selectedNft} setNextNft={setNextNft} setPrevNft={setPrevNft} exitPlayer={() => { setSelectedNft(null) }} />
      }
    </Landing>
  )
};

const Landing = styled.div`
  display: flex;
  flex-direction: column;);

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
  justify-content: space-evenly;
  flex-wrap: wrap;
  & > * {
    margin: 0 5px 10px;
  }
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
  font-weight: bold;
  left: calc(10% + 50px);
  top: -4px;
  padding: 0 12px;
  font: Compita;
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
