import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ArtistCard from "../../../components/NftCards/ArtistCard";

import { usePlaylistConsumer } from "../../../contexts/Playlist";

const ArtistNfts = ({ user }) => {
  const [nfts, setNfts] = useState([]);
  // const [selectedNft, setSelectedNft] = useState();
  const { setNftsCallback } = usePlaylistConsumer();
  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => (
      <ArtistCard nft={nft} key={index} index={index} />
    ));
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    return formattedNfts;
  };

  const getArtistNfts = async () => {
    setNfts([]);
    axios.post("api/nft-type/artist-nfts", user).then((res) => {
      setNfts(formatNfts(res.data));
      setNftsCallback(res.data);
    });
  };

  useEffect(() => {

    getArtistNfts();
  }, [user]);

  return (
    // <CreatedNftHolder>
    //   <NftContainer>
    //     <NftContainerTitle>CREATED NFTs</NftContainerTitle>
    //     <NftContainerOutline />
        <NftScroll> {nfts} </NftScroll>
    //   </NftContainer>
    // </CreatedNftHolder>
  );
};

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

// const CreatedNftHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   align-items: center;
//   justify-content: space-around;
//   /* width: ${(props) => props.theme.homeWidth}px; */
//   /* max-width: 80vw; */
//   padding-top: 40px;
//   color: white;
//   font-size: ${(props) => props.theme.fontSizes.xs};
//   padding-right: 4px;
// `;

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

// const NftContainer = styled.div`
//   position: relative;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 40px;
// `;

// const NftContainerTitle = styled.span`
//   position: absolute;
//   font-weight: 600;
//   margin-left: auto;
//   margin-right: auto;
//   top: -13px;
//   padding: 5px 12px 3px;
//   font: "Compita";
//   background-color: ${(props) => props.theme.bgColor};
//   font-size: ${(props) => props.theme.fontSizes.xs};
//   color: ${(props) => props.theme.color.gray};
//   display: flex;
//   flex-direction: row;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 4px solid #383838;
//   border-radius: 20px;
//   transition: 0.2s;
//   ${({ active }) =>
//     !active &&
//     `
//   color:  white;
//   `}
//   &:hover {
//     color: white;
//   }
// `;

// const NftContainerOutline = styled.div`
//   /* border-radius: 24px 24px 0 0; */
//   border-top: 6px solid #383838;
//   /* border-bottom: none; */
//   height: 40px;
//   width: 80%;
//   display: flex;
//   flex-direction: row;

//   @media only screen and (max-width: 776px) {
//     width: 100%;
//   }
// `;
export default ArtistNfts;