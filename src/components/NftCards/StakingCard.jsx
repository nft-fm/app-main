import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as IconBinance } from "../../assets/img/icons/binance-logo.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import loading from "../../assets/img/loading.gif";
import { useAccountConsumer } from "../../contexts/Account";
import StakingModalHook from "../NftModalHook/StakingModalHook";

const StakingCard = (props) => {
  const { user, account } = useAccountConsumer();
  const [artist, setArtist] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [partialSong, setPartialSong] = useState(false);
  const [basicLoaded, setBasicLoaded] = useState(false);

  // const show = () => setIsModalOpen(true);
  const hide = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (props.artist) setArtist(props.artist);
  }, [props.artist]);

  if (!artist) {
    return null;
  }

  return (
    <Container
      //   onClick={() => setIsModalOpen(!isModalOpen)}
      role="button"
      aria-pressed="false"
      tabindex="0"
      open={isModalOpen || isShareOpen}
    >
      <StakingModalHook
        open={isModalOpen}
        hide={hide}
        artist={artist}
        setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
      />
      {/* <CardTop>
        <LikeShare
          nft={nft}
          liked={liked}
          setLiked={setLiked}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
          shareCount={shareCount}
          isLoading={likesLoading}
        />
        <Side>
          <IconArea>
            {nft.numMinted - nft.numSold}
            <span style={{ margin: "0 1px" }}>&nbsp;of&nbsp;</span>
            {nft.numMinted}
            <span style={{ margin: "0 1px" }}>&nbsp;Available</span>
          </IconArea>
        </Side>
      </CardTop> */}
      {imageLoaded ? null : <Image src={loading} alt="image" />}
      <Image
        src={artist.profilePic}
        style={imageLoaded ? {} : { display: "none" }}
        alt="image"
        onLoad={() => setImageLoaded(true)}
        onClick={() => setIsModalOpen(true)}
      />
      <Artist to={`/artist/${artist.suburl}`}>
        {artist.username.length > 20
          ? artist.username.slice(0, 20) + "..."
          : artist.username}
      </Artist>
      {/* <BottomSection>
        <CostEth>
          {nft.price !== "..."
            ? parseFloat(nft.price).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })
            : nft.price}
          {nft.chain === "ETH" ? <Eth /> : <Bsc />}
        </CostEth>
      </BottomSection> */}
    </Container>
  );
};

const RedeemButton = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.box};
  border-radius: 7px;
  padding: 3px 8px;
`;

const RedeemButtonBackground = styled.div`
  position: absolute;
  padding: 2px;
  top: 205px;
  left: 20px;
  background-image: linear-gradient(to right, #fde404, #fa423e);

  cursor: pointer;
  text-decoration: none;
  border-radius: 7px;
  :hover {
    animation: wiggle 100ms;
  }
  @keyframes wiggle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
const Bsc = styled(IconBinance)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
`;

const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const CostEth = styled.span`
  display: flex;
  color: white;
`;

const BottomSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Side = styled.div`
  display: flex;
  align-items: center;
`;

const IconArea = styled.div`
  /* margin: 0 8px; */
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
`;

const CardTop = styled.div`
  /* width: calc(100% - 4px); */
  /* padding: 0px 2px; */
  width: calc(100% - 8px);
  margin-bottom: 12px;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-family: "Compita";
`;

const Container = styled.div`
  color: ${(props) => props.theme.color.gray};
  padding: 12px;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  :focus {
    border: 1px solid white;
  }
  /* :hover {
    transform: ${(props) => !props.open && "translateY(-0.15em)"};
  } */
`;

const Image = styled.img`
  cursor: pointer;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: #1e1e1e;
`;

const TrackName = styled.span`
  cursor: pointer;
  color: white;
  font-weight: 500;
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.xs}px;
  margin-bottom: 12px;
`;

const Artist = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.xxs}px;
  text-align: center;
  color: ${(props) => props.theme.gray};
  margin-bottom: 12px;
  text-decoration: none;
  /* cursor: pointer; */
  &:hover {
    text-decoration: underline;
  }
`;

export default StakingCard;
