import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CreatedNftModal from "../NftModals/CreatedNftModal";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";
import ShareModal from "../SMShareModal/CreatedShareModal";
import LikeShare from "./LikeShare";
import { getSetSale } from "../../web3/utils";

const NftCard = (props) => {
  const { usdPerEth, user } = useAccountConsumer();
  const [nft, setNft] = useState({
    address: "",
    artist: "",
    audioUrl: "",
    genre: "",
    imageUrl: "",
    likeCount: 0,
    liked: false,
    nftId: 0,
    title: "",
    writer: "",
    price: "--",
    quantity: "--",
    sold: "--",
  })
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(props.nft.liked);
  const [likeCount, setLikeCount] = useState(props.nft.likeCount);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const show = () => setIsOpen(true);
  const hide = (e) => {
    setIsOpen(false);
  };

  useEffect(() => {
    setNft(props.nft);
    setLiked(props.nft.liked);
    setLikeCount(props.nft.likeCount);
  }, [props, user]);

  console.log("i am the nft", nft);

  useEffect(() => {
    if (nft && nft.price === "--") {
      getSetSale(nft.nftId, (res) => {
        const { price, quantity, sold } = res;
        setNft(prevState => ({ ...prevState, price, quantity, sold }));
      });
    }
  }, [nft]);

  return (
    <Container>
      <ShareModal
        open={isShareOpen}
        hide={() => setIsShareOpen(!isShareOpen)}
        nft={nft}
      />
      <CreatedNftModal
        open={isOpen}
        hide={hide}
        liked={liked}
        nft={nft}
        setLiked={setLiked}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
      />
      <CardTop>
        <LikeShare
          nft={nft}
          liked={liked}
          setLiked={setLiked}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
        />
        <Side>
          <IconArea>
            {nft.sold}
            <span style={{ margin: "0 1px" }}>/</span>
            {nft.quantity}
            <Cart />
          </IconArea>
        </Side>
      </CardTop>
      <Image
        src={nft.imageUrl}
        alt="image"
        onClick={() => setIsOpen(!isOpen)}
      />
      <TrackName>{nft.title}</TrackName>
      <Artist>{nft.artist}</Artist>
      <CostFields>
        <CostEth>
          {nft?.price?.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
          <Eth />
        </CostEth>
        <CostUsd>
          {usdPerEth
            ? (usdPerEth * nft.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            : "..."}
          <Usd />
        </CostUsd>
      </CostFields>
    </Container>
  );
};

const Usd = styled(IconUsd)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 8px;
  transition: all 0.2s ease-in-out;
  & path {
    fill: ${(props) => props.theme.color.gray};
  }
`;

const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
  transition: all 0.2s ease-in-out;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const CostUsd = styled.span`
  display: flex;
  color: white;
  color: ${(props) => props.theme.color.gray};
`;

const CostEth = styled.span`
  display: flex;
  color: white;
`;

const CostFields = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

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
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.xs}px;
  margin-bottom: 12px;
`;

const Artist = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xxs}px;
  text-align: center;
  color: ${(props) => props.theme.gray};
  margin-bottom: 12px;
`;

export default NftCard;
