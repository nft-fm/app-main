import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
// import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/coins.svg";
import { ReactComponent as PlayIcon } from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import ShareModal from "../SMShareModal/SMShareModal";
import LikeShare from "./LikeShare";

import LibraryModal from "../NftModals/LibraryModal";

const NftCard = (props) => {
  const { user } = useAccountConsumer();
  const { nft } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { setNftCallback } = usePlaylistConsumer();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // const show = () => setIsOpen(true);
  // const hide = (e) => {
  //   setIsOpen(false);
  //   console.log("isOpen", isOpen);
  // };

  const hide = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLikeCount(props.nft.likeCount);
    setLiked(props.nft.liked);
  }, [props.nft, user]);

  return (
    <Container>
      <ShareModal
        open={isShareOpen}
        hide={() => setIsShareOpen(!isShareOpen)}
        nft={nft}
      />
      <LibraryModal
        open={isModalOpen}
        hide={hide}
        nft={nft}
        liked={liked}
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
          <IconArea
            href={`https://opensea.io/assets/0x88d3e00ce938f1a591336131b859465b50d608b7/${nft.nftId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Trade
            <Cart />
          </IconArea>
        </Side>
      </CardTop>
      <Image
        src={nft.imageUrl}
        alt="image"
        onClick={() => setIsModalOpen(!isModalOpen)}
      // onClick={() => setIsOpen(!isOpen)}
      />
      <BottomWrapper>
        <Bottom>
          <TrackName onClick={() => setIsModalOpen(!isModalOpen)}>{nft.title}</TrackName>
          <Artist>{nft.artist}</Artist>
        </Bottom>
        <PlayButton src={PlayIcon} onClick={() => setNftCallback(nft)} />
      </BottomWrapper>
    </Container>
  );
};

const PlayButton = styled(PlayIcon)`
  width: 50px;
  height: 50px;
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
`;

// const Share = styled(IconShare)`
//   width: 16px;
//   height: 16px;
//   margin: 0 4px 0 0;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   & path {
//     transition: all 0.2s ease-in-out;
//     fill: ${(props) => props.theme.color.gray};
//   }
//   &:hover {
//     & path {
//       fill: #20a4fc;
//     }
//   }
// `;

// const LikedHeart = styled(IconHeart)`
//   width: 20px;
//   height: 20px;
//   margin: -3px 4px 0 0;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   & path {
//     stroke: ${(props) => props.theme.color.pink};
//   }
// `;

// const Heart = styled(IconHeart)`
//   width: 20px;
//   height: 20px;
//   margin: -3px 4px 0 0;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   & path {
//     transition: all 0.2s ease-in-out;
//     stroke: ${(props) => props.theme.color.gray};
//   }
//   &:hover {
//     & path {
//       stroke: ${(props) => props.theme.color.pink};
//     }
//   }
// `;

const Side = styled.div`
  display: flex;
  align-items: center;
`;

const IconArea = styled.a`
  margin: 0 8px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #20a4fc;
    & svg > path {
    transition: all 0.2s ease-in-out;
      fill: #20a4fc;
    }
  }
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
  margin-bottom: 24px;
`;

const Image = styled.img`
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
