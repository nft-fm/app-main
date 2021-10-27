import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import ShareModal from "../SMShareModal/SMShareModal";
import NftModalHook from "./NftModalHook";

const NftCard = (props) => {
  const { account } = useAccountConsumer();
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

  const getSnnipetAWS = async (completeNft) => {
    await axios
      .post("/api/nft-type/getSnnipetAWS", {
        key:
          completeNft.address +
          "/snnipets/" +
          completeNft.audioUrl.split("/").slice(-1)[0],
      })
      .then((res) => {
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
        const songFile = res.data.Body.data;

        setPartialSong(songFile);
      });
  };

  useEffect(() => {
    console.log("awefjio", window.location.pathname, window.location.pathname.length);
    if (window.location.pathname.length > 7) {

      let chain = window.location.pathname.slice(8, 11).toUpperCase();
      let nftId = window.location.pathname.slice(12);

      console.log(chain, nftId);
      axios
        .post("/api/nft-type/get-one", {
          chain: chain,
          id: nftId,
          address: account,
        })
        .then((res) => {
          setNft(res.data);
          setShareCount({ count: res.data.shareCount });
          setLikeCount(res.data.likeCount);
          setLiked(res.data.liked);
          getSnnipetAWS(res.data);
          setIsModalOpen(true);
        })
        .catch(err => {
          console.log("err", err, err.res);
        });
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
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setLiked={setLiked}
        setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
      />
    </Container>
  );
};

const Container = styled.div``;

export default NftCard;
