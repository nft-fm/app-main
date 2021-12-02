import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NftCard from "../../../components/NftCards/SaleNftCard";

const ArtistNfts = ({ nfts }) => {
  const [pauseSong, setPauseSong] = useState(() => () => { }) // this is fucking weird, don't touch me.
  const [formattedNft, setFormattedNft] = useState();

  const formatNfts = (nftsData) => {
    const formattedNfts = nftsData.map((nft, index) => (
      <NftCard nft={nft} pauseSong={pauseSong} setPauseSong={setPauseSong} />
    ));
    for (let i = 0; i < 3; i++) {
      formattedNfts.push(<FillerCard />);
    }
    setFormattedNft(formattedNfts);
  };

  useEffect(() => {
    if (nfts) {
      formatNfts(nfts);
    }
  }, [nfts]);

  return <NftScroll> {formattedNft} </NftScroll>;
};

const FillerCard = styled.div`
  width: 377px;
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
