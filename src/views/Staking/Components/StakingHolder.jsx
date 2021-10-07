import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StakingCard from "../../../components/NftCards/StakingCard";
import { useStakingConsumer } from "../../../contexts/Staking";
import { addArtistToStake } from "../../../web3/utils";

const StakingHolder = () => {
  const { artists, update, setUpdate } = useStakingConsumer();
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
    console.log(artists);
    if (artists && update) {
      setFormattedArtists(formatNfts(artists));
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    artists && setFormattedArtists(formatNfts(artists));
  }, [artists]);

  const addArtists = () => {
    for (let artist of artists) {
      addArtistToStake(artist.address, () => {
        console.log("callbacked!");
      });
    }
  };
  return (
    <Container>
      <button onClick={() => addArtists()}>Add Artists</button>
      <ContainerTitle>ARTISTS</ContainerTitle>
      <ContainerOutline />
      {formattedArtists && <NftScroll>{formattedArtists}</NftScroll>}
    </Container>
  );
};

const ContainerTitle = styled.span`
  position: absolute;
  outline: none;
  padding: 5px 8px 7px 8px;
  height: 20px;
  font: "Compita";
  font-weight: 600;
  background-color: ${(props) => props.theme.color.boxBorder};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => (props.faq ? "#3d3d3d" : props.theme.color.gray)};
  border: 4px solid #383838;
  border-radius: 20px;
  display: flex;
  margin-top: -17px;
  right: 68%;
  @media only screen and (max-width: 776px) {
    margin-left: auto;
    margin-right: auto;
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
