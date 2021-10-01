import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StakingCard from "../../../components/NftCards/StakingCard";
import { claimVinyl } from "../../../web3/utils";
import { useStakingConsumer } from "../../../contexts/Staking";

const StakingHolder = ({ artists }) => {
  const {
    balance,
    totalEarned,
    accountTotalStaked,
    setNeedToUpdateBalances,
    totalAvailable,
  } = useStakingConsumer();
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

  const claimRewards = async () => {
    claimVinyl(() => {
      console.log("claimed!");
      setNeedToUpdateBalances(true);
    });
  };

  return (
    <Container>
      <StakingInfoSection>
        <p>Your VINYL Balance: {balance}</p>
        <p>Total VINYL you have staked: {accountTotalStaked}</p>
        <p>Available Rewards: {totalAvailable}</p>
        <p>Total Rewards Earned: {totalEarned}</p>
        <button onClick={() => claimRewards()}>Claim Rewards!</button>
      </StakingInfoSection>
      <Wrapper>
        {formattedArtists && <NftScroll>{formattedArtists}</NftScroll>}
      </Wrapper>
    </Container>
  );
};

const StakingInfoSection = styled.div`
  display: flex;
  flex-direction: column;
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

const Wrapper = styled.div`
  /* border: 2px solid ${(props) => props.theme.color.boxBorder}; */
`;

const Legend = styled.p`
  bottom: 0px;
  border: 2px solid ${(props) => props.theme.color.blue};
  border-radius: 10px;
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  text-align: center;
  transition: opacity 0.35s ease-in-out;
`;

const ArtistHolder = styled.div``;
const ProfilePic = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default StakingHolder;
