import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import LibraryCard from "../../../components/NftCards/LibraryCard";
import loading from "../../../assets/img/loading.gif";

import { usePlaylistConsumer } from "../../../contexts/Playlist";
import { useAccountConsumer } from "../../../contexts/Account";

const Library = ({ user }) => {
  const {account} = useAccountConsumer();
  const [nfts, setNfts] = useState();
  // const [selectedNft, setSelectedNft] = useState();
  const { setNftsCallback, setIsPreview } = usePlaylistConsumer();
  const [noNfts, setNoNfts] = useState(false);

  // const [isViewingLibrary, setIsViewingLibrary] = useState(true) //to default to library
  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => {
      return (
        <LibraryCard
          nft={nft}
          key={index}
          index={index}
          // selectNft={setSelectedNft}
        />
      );
    });
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    return formattedNfts;
  };

  useEffect(() => {
    const getUserNfts = async () => {
      console.log("gonna get them")
      axios.post("api/nft-type/get-user-nfts", user).then((res) => {
        console.log(res);
        if (res.data === "no nfts!") {
          setNoNfts(true);
          setNfts([]);
        } else {
          console.log("this", res.data);
          setNfts(formatNfts(res.data));
          setNftsCallback(res.data);
          setIsPreview(false);
        }
      });
    };
    if (user) {
      getUserNfts();
    }
  }, [user]);

  return (
    <Landing>
      <LaunchContainer>
        <StyledTitle>LIBRARY</StyledTitle> <ContainerOutline />
        {nfts && !noNfts ?
          <NftScroll> {nfts} </NftScroll>
          : noNfts && account ?  <StyledTitle>It seems like you don't have any NFTs yet</StyledTitle>
          : account ? <img style={{ width: "40px" }} src={loading} /> : <p></p>}
      </LaunchContainer>
    </Landing>
  );
};

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  color: white;
`;
const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  /* width: ${(props) => props.theme.homeWidth}px; */
  /* max-width: 80vw; */
  /* padding-top: 40px; */
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

const ContainerOutline = styled.div`
  /* border-radius: 24px 24px 0 0; */
  border-top: 6px solid #383838;
  /* border-bottom: none; */
  height: 40px;
  width: 80%;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 776px) {
    width: 100%;
  }
`;
export default Library;
