import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StakingCard from "../../../components/NftCards/StakingCard";

const StakingHolder = ({ artists }) => {
  const [formattedArtists, setFormattedArtists] = useState(null);

  const formatNfts = (artistData) => {
    const formattedNfts = artistData.map((artist, index) => {
      return <StakingCard artist={artist} key={index} index={index} />;
    });
    for (let i = 0; i < 5; i++) {
      formattedNfts.push(<FillerCard />);
    }
    return formattedNfts;
  };

  useEffect(() => {
    setFormattedArtists(formatNfts(artists));
  }, [artists]);

  return (
    <Container>
      {formattedArtists && <NftScroll>{formattedArtists}</NftScroll>}
    </Container>
  );
};

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

const FillerCard = styled.div`
  width: 226px;
  height: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default StakingHolder;
