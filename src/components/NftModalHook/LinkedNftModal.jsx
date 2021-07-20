import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NftModalHook from "./NftModalHook";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
// import { ReactComponent as PlayIcon } from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";
import ShareModal from "../SMShareModal/SMShareModal";
import { NavLink } from "react-router-dom";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";

import ReactToolTip from "react-tooltip";

const NftCard = (props) => {
  const { usdPerEth, user, account } = useAccountConsumer();
  const [nft, setNft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [partialSong, setPartialSong] = useState(false);
  const [shareCount, setShareCount] = useState({ count: 0 });

  // const show = () => setIsModalOpen(true);
  const hide = () => {
    setIsModalOpen(false);
  };

  console.log("nftModalData", props);

  const getSnnipetAWS = async (completeNft) => {
    await axios
      .post("/api/nft-type/getSnnipetAWS", {
        key:
          completeNft.address +
          "/snnipets/" +
          completeNft.audioUrl.split("/").slice(-1)[0],
      })
      .then((res) => {
        console.log("res", res);
        if (!res.data) {
          getNSeconds(nft);
        } else {
          setPartialSong(res.data);
        }
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const getNSeconds = async (completeNft) => {
    await axios
      .post("/api/nft-type/getNSecondsOfSong", {
        key:
          completeNft.address +
          "/" +
          completeNft.audioUrl.split("/").slice(-1)[0],
        nft: completeNft,
        startTime: 30,
      })
      .then((res) => {
        console.log("got snnipet");
        const songFile = res.data.Body.data;

        setPartialSong(songFile);
      });
  };

  useEffect(() => {
    if (window.location.pathname.length > 7) {
      axios.post("/api/nft-type/get-one", { id: window.location.pathname.slice(8), address: account })
      .then((res) => {
        console.log("res modal @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@22", res);
        setNft(res.data);
        setShareCount({ count: res.data.shareCount });
        setLikeCount(res.data.likeCount);
        setLiked(res.data.liked);
        getSnnipetAWS(res.data);
        setIsModalOpen(true);
      })
    }
  }, []);

  if (!nft) {
    return null;
  }
  return (
    <Container>
      <ShareModal
        open={isShareOpen}
        hide={() => setIsShareOpen(!isShareOpen)}
        updateShareCount={() => setShareCount({ count: shareCount.count + 1 })}
        nft={nft}
      />
      <NftModalHook
        open={isModalOpen}
        hide={hide}
        nft={nft}
        partialSong={partialSong}
        liked={liked}
        SetLiked={setLiked}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
      />
    </Container>
  );
};

const Container = styled.div`
`;

export default NftCard;
