import React, { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import LibraryCard from "../../../components/NftCards/LibraryCard";
import ArtistCard from "../../../components/NftCards/ArtistCard";
import loading from "../../../assets/img/loading.gif";

import { usePlaylistConsumer } from "../../../contexts/Playlist";
import { resolveContent } from "nodemailer/lib/shared";

const Library = ({ user }) => {
  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();
  const { setNftsCallback, setIsPreview } = usePlaylistConsumer();
  // const [isViewingLibrary, setIsViewingLibrary] = useState(true) //to default to library
  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => {
      return (
        <LibraryCard
          nft={nft}
          key={index}
          index={index}
          selectNft={setSelectedNft}
        />
      );
    });
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    return formattedNfts;
  };

  const [noNfts, setNoNfts] = useState(false);

  const getUserNfts = async () => {
    setNfts([]);
    axios.post("api/nft-type/get-user-nfts", user).then((res) => {
      console.log(res);
      if (res.data === "no nfts!") {
        setNoNfts(true);
      } else {
        console.log("this", res.data);
        setNfts(formatNfts(res.data));
        setNftsCallback(res.data);
        setIsPreview(false);
      }
    });
  };

  useEffect(() => {
    getUserNfts();
  }, [user]);

  return (
    <Landing>
      <LaunchContainer>
        <StyledTitle>LIBRARY</StyledTitle> <ContainerOutline />
        {nfts && nfts[0] ? (
          <NftScroll> {nfts} </NftScroll>
        ) : (
          <img style={{ width: "40px" }} src={!noNfts ? loading : null} />
        )}
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

const ContainerTitleLeft = styled.span`
  position: absolute;
  font-weight: 600;
  left: calc(10% + 20px);
  top: -13px;
  padding: 5px 12px 3px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  ${({ active }) =>
    active &&
    `
  color: white;
  `}
  &:hover {
    color: white;
  }
`;

const ContainerTitleRight = styled.span`
  position: absolute;
  font-weight: 600;
  right: calc(10% + 20px);
  top: -13px;
  padding: 5px 12px 3px;
  font: "Compita";
  background-color: ${(props) => props.theme.bgColor};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.color.gray};
  display: flex;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 4px solid #383838;
  border-radius: 20px;
  transition: 0.2s;
  ${({ active }) =>
    !active &&
    `
  color:  white;
  `}
  &:hover {
    color: white;
  }
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
