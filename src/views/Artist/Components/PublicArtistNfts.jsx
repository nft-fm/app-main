import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NftCard from "../../../components/NftCards/SaleNftCard";

// import { usePlaylistConsumer } from "../../../contexts/Playlist";

// const preloads = {
//   1: sexPreload,
//   2: touchPreload,
//   3: herePreload,
//   4: solPreload,
// };
const ArtistNfts = ({ nfts }) => {
  // const [nfts, setNfts] = useState([]);
  // const [selectedNft, setSelectedNft] = useState();
  // const { setNftsCallback } = usePlaylistConsumer();
  const [formattedNft, setFormattedNft] = useState();

  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => (
      <NftCard nft={nft} key={index} index={index} />
    ));
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    setFormattedNft(formattedNfts);
  };

  // const getArtistNfts = async () => {
  //   setNfts([]);
  //   axios.post("api/nft-type/artist-nfts", user).then((res) => {
  //     setNfts(formatNfts(res.data));
  //     setNftsCallback(res.data);
  //   });
  // };

  useEffect(() => {
    // getArtistNfts();
    if (nfts) {
      formatNfts(nfts);
    }
  }, [nfts]);

  return <NftScroll> {formattedNft} </NftScroll>;
};

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
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

export default ArtistNfts;
