import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BuyNftModal from "../BuyNftModal";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/coins.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";

import PlayIcon from "../../assets/img/icons/listen_play.svg"

const NftCard = (props) => {
  const { usdPerEth, account, setUser } = useAccountConsumer();
  const { nft, selectNft } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(props.liked);
  const show = () => setIsOpen(true);
  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };
  console.log("nft", nft);

  const like = async () => {
    if (account) {
      setLiked(!liked);
      await axios.post(`api/user/like-nft`,
        { address: account, nft: nft._id}).then(res => {
        if (res.data) {
          props.updateNft(props.index, res.data.nft);
          setUser(res.data.user);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }

  const share = () => {
    //${!}
  };

  return (
    <Container>
      <BuyNftModal open={isOpen} hide={hide} nft={nft} />
      <CardTop>
        <Side>
          <IconArea>
            {liked ?
              <LikedHeart onClick={() => like()}/> :
              <Heart onClick={() => like()} />
            }
            {nft.likeCount}
          </IconArea>
          <IconArea>
            <Share onClick={() => share()} />
            {nft.shareCount}
          </IconArea>
        </Side>
        <Side>
          <IconArea>
            Trade
            <Cart />
          </IconArea>
        </Side>
      </CardTop>
      <Image
        src={nft.imageUrl}
        alt="image"
        onClick={() => setIsOpen(!isOpen)}
      />
      <BottomWrapper>
        <Bottom>
          <TrackName>{nft.title}</TrackName>
          <Artist>{nft.artist}</Artist>
        </Bottom>
        <PlayButton src={PlayIcon} onClick={() => selectNft(nft)} />
      </BottomWrapper>
    </Container>
  );
};

const PlayButton = styled.img`
  opacity: .4;
  max-height: 50 px;
  max-width: 50px;
  align-self: flex-end;
`;

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
`;

const Bottom = styled.div`
width: 85%;
display: flex;
flex-direction: column;
/* justify-content: column; */
align-items: flex-start;
`

const Cart = styled(IconCart)`
  width: 20px;
  height: 20px;
  margin: -2px 0 0 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      fill: #20a4fc;
    }
  }
`;

const Share = styled(IconShare)`
  width: 16px;
  height: 16px;
  margin: 0 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      fill: #20a4fc;
    }
  }
`;

const LikedHeart = styled(IconHeart)`
  width: 20px;
  height: 20px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${(props) => props.theme.color.pink};
  }
`;

const Heart = styled(IconHeart)`
  width: 20px;
  height: 20px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    stroke: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      stroke: ${(props) => props.theme.color.pink};
    }
  }
`;

const Side = styled.div`
  display: flex;
  align-items: center;
`;

const IconArea = styled.div`
  margin: 0 8px;
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
`;

const CardTop = styled.div`
  /* width: calc(100% - 4px); */
  /* padding: 0px 2px; */
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
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
  color: white;
  font-weight: 500;
  /* width: 100%; */
  /* text-align: center; */
  padding-left: 10px;
  font-size: ${(props) => props.theme.fontSizes.xs};
  /* margin-bottom: 12px; */
`;

const Artist = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  padding-left: 10px;
  /* text-align: center; */
  color: ${(props) => props.theme.gray};
`;

export default NftCard;
