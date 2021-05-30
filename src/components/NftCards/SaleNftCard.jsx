import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BuyNftModal from "../NftModals";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
import { ReactComponent as PlayIcon } from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import loading from "../../assets/img/loading.gif";
import axios from "axios";
import ShareModal from "../SMShareModal/SMShareModal";
import LikeShare from "./LikeShare";
import { NavLink } from "react-router-dom";

import solPreload from "./Lowkey.json";
import sexPreload from "./SexKazoo2.json";
import touchPreload from "./TOUCHIDv2.json";
import herePreload from "./hereforareason.json";

import sol from "../../assets/img/nftcovers/sol_rising.gif";
import sex from "../../assets/img/nftcovers/sex_kazoo_updated.gif";
import touch from "../../assets/img/nftcovers/touch_id_glitch.gif";
import here from "../../assets/img/nftcovers/here_for_a_reason_glitch.gif";

const preloads = {
  1: sexPreload,
  2: touchPreload,
  3: herePreload,
  4: solPreload
}

const images = {
  1: sex,
  2: touch,
  3: here,
  4: sol
}

const NftCard = (props) => {
  const { usdPerEth, user, account } = useAccountConsumer();
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
    price: "...",
    quantity: "--",
    sold: "--",
  });

  const { isOpen } = usePlaylistConsumer();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [partialSong, setPartialSong] = useState(false);
  const [shareCount, setShareCount] = useState({count: 0 })
  const [basicLoaded, setBasicLoaded] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);

  const show = () => setIsModalOpen(true);
  const hide = () => {
    setIsModalOpen(false);
  };

  /*const saveData = (data, fileName) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const json = JSON.stringify(data),
      blob = new Blob([json], {type: "octet/stream"}),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };*/

  const getSnnipetAWS = async (completeNft) => {
    await axios
    .post("/api/nft-type/getSnnipetAWS", {
      key:
        completeNft.address +
        "/snnipets/" +
        completeNft.audioUrl.split("/").slice(-1)[0]
    })
    .then((res) => {
      console.log("res", res.data)
    })
    .catch(err => {
      console.log("ERR", err)
    })
  };

  const getNSeconds = async (completeNft) => {
    await axios
      .post("/api/nft-type/getNSecondsOfSong", {
        key:
          completeNft.address +
          "/" +
          completeNft.audioUrl.split("/").slice(-1)[0],
        nft: completeNft,
        startTime: 30
      })
      .then((res) => {
        console.log("got snnipet");
        const songFile = res.data.Body.data;
        //const fileName = completeNft.title + ".json";

        //saveData(songFile, fileName);
        setPartialSong(songFile);
      });
  };

  const getFromPreload = (nftId) => {
    const preload = preloads[nftId];
    if (!preload) {
      getNSeconds(props.nft);
    } else {
      setPartialSong(preload);
    }

  }

  /*const getSnnipet = async (completeNft) => {
    console.log("going to get snnipets");
    await axios
    .post("/api/nft-type/getSnnipet", {
      nftId: completeNft.nftId,
      account: account
    })
    .then((res) => {
      console.log("got it", res.data.snnipet)
      const fileName = completeNft.title + ".json";

      saveData(res.data, fileName);
      setPartialSong(res.data.snnipet);
    });
  }*/

  useEffect(() => {
    console.log("im here", basicLoaded);
    if(basicLoaded) {
      setLikesLoading(true);
    }
  }, [account])
  
  useEffect(() => {
    if (props.nft) {
      setNft({
        ...props.nft,
      });
      setShareCount({count: props.nft.shareCount});
      setLikeCount(props.nft.likeCount);
      setLiked(props.nft.liked);
      setBasicLoaded(true);
      setLikesLoading(false);
    }
  }, [props.nft, user]);

  useEffect(() => {
    if (isModalOpen && !partialSong) {
      getSnnipetAWS(props.nft);
      //getFromPreload(props.nft.nftId)
      //setPartialSong(partialSong);
      //getNSeconds(props.nft);
    }
  }, [isModalOpen]);

  return (
    <Container>
      <ShareModal
        open={isShareOpen}
        hide={() => setIsShareOpen(!isShareOpen)}
        updateShareCount={() => setShareCount({ count: shareCount.count + 1 })}
        nft={nft}
        
      />
      <BuyNftModal
        open={isModalOpen}
        hide={hide}
        nft={nft}
        partialSong={partialSong}
        liked={liked}
        setLiked={setLiked}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
      />
      <CardTop >
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
            {nft.numSold}
            <span style={{ margin: "0 1px" }}>/</span>
            {nft.numMinted}
            <Cart onClick={() => setIsModalOpen(!isModalOpen)} />
          </IconArea>
        </Side>
      </CardTop>
      {imageLoaded ? null : (
        <Image
          src={loading}
          alt="image"
          
        />
      )}
        <Image
          // 
          src={nft.imageUrl}
          style={imageLoaded ? {} : { display: "none" }}
          alt="image"
          onClick={() => setIsModalOpen(!isModalOpen)}
          onLoad={() => setImageLoaded(true)}
        />
      {!imageLoaded && images[props.nft.nftId] && (
        <Image
          // 
          src={images[props.nft.nftId]}
          style={imageLoaded ? {} : { display: "none" }}
          alt="image"
          onClick={() => setIsModalOpen(!isModalOpen)}
          onLoad={() => setImageLoaded(true)}
        />
      )}

      <TrackName
        onClick={() => setIsModalOpen(!isModalOpen)}
        
      >
        {nft.title}
      </TrackName>
      <Artist
        to={`/artist/${nft.artist.replace(/ /g, "").toLowerCase()}`}
        
      >
        {nft.artist}
      </Artist>
      <CostFields>
        <CostEth>
          {nft.price !== "..."
            ? parseFloat(nft.price).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })
            : nft.price}
          <Eth />
        </CostEth>
        <CostUsd>
          {usdPerEth
            ? parseFloat(usdPerEth * nft.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "..."}
          <Usd />
        </CostUsd>
      </CostFields>
      {/* <PlayButton src={PlayIcon} onClick={() => {setIsModalOpen(true)}} /> */}
    </Container>
  );
};

const PlayButton = styled(PlayIcon)`
  width: 30px;
  height: 30px;
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
  /* margin-left: 5px;
  margin-right: 5px; */
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

// const Artist = styled(NavLink)`
//   font-size: ${(props) => props.theme.fontSizes.xxs}px;
//   text-align: center;
//   color: ${(props) => props.theme.gray};
//   margin-bottom: 12px;
//   text-decoration: none;
//   /* cursor: pointer; */
// `;
const Artist = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.xxs}px;
  text-align: center;
  color: ${(props) => props.theme.gray};
  margin-bottom: 12px;
  text-decoration: none;
  /* cursor: pointer; */
`;

export default NftCard;
