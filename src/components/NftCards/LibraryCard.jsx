import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as IconCart } from "../../assets/img/icons/coins.svg";
import { ReactComponent as PlayIcon } from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import ShareModal from "../SMShareModal/SMShareModal";
import LikeShare from "./LikeShare";

import LibraryModal from "../NftModals/LibraryModal";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";

import ReactToolTip from "react-tooltip";
const NftCard = (props) => {
  const { user } = useAccountConsumer();
  const { nft } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { setNftCallback } = usePlaylistConsumer();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const hide = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLikeCount(props.nft.likeCount);
    setLiked(props.nft.liked);
  }, [props.nft, user]);

  return (
    <Container onClick={() => setIsModalOpen(!isModalOpen)}>
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
        {/* <LikeShare
          nft={nft}
          liked={liked}
          setLiked={setLiked}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          setIsShareOpen={() => setIsShareOpen(!isShareOpen)}
        /> */}
        <Side>
          {nft.chain === "ETH" && (
            <IconArea
              href={`https://opensea.io/assets/0x88d3e00ce938f1a591336131b859465b50d608b7/${nft.nftId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Trade
              <Cart />
            </IconArea>
          )}
          {/* {(nft.chain === "BSC") && (
            <IconArea
              href={''}
            >
              BSC
              <Cart />
            </IconArea>
          )} */}
        </Side>
      </CardTop>
      <Image
        src={nft.imageUrl}
        alt="image"
        // onClick={() => setIsOpen(!isOpen)}
      />
      <BottomWrapper>
        <Bottom>
          <TrackName onClick={() => setIsModalOpen(!isModalOpen)}>
            {nft.title.length > 15 ? nft.title.slice(0, 15) + "..." : nft.title}
          </TrackName>
          <Artist>
            {nft.artist.length > 20
              ? nft.artist.slice(0, 20) + "..."
              : nft.artist}
          </Artist>
        </Bottom>
        <PlayButton src={PlayIcon} onClick={() => setNftCallback(nft)} />
      </BottomWrapper>
      <BottomSection>
        <BadgeHolder>
          {nft.badges?.map((badge) => {
            if (badge.founder) {
              return (
                <>
                  <FounderBadge
                    className="founderBadge"
                    data-tip
                    data-for="founderTip"
                  />
                  <ReactToolTip id="founderTip" place="top" effect="solid">
                    Founder
                  </ReactToolTip>
                </>
              );
            }
            if (badge.premium) {
              return (
                <>
                  <PremiumBadge
                    className="premiumBadge"
                    data-tip
                    data-for="premiumTip"
                  />
                  <ReactToolTip id="premiumTip" place="top" effect="solid">
                    Premium
                  </ReactToolTip>
                </>
              );
            }
            if (badge.prerelease) {
              return (
                <>
                  <PrereleaseBadge
                    className="prereleaseBadge"
                    data-tip
                    data-for="prereleaseTip"
                  />
                  <ReactToolTip id="prereleaseTip" place="top" effect="solid">
                    Prerelease
                  </ReactToolTip>
                </>
              );
            }
            if (badge.exclusive) {
              return (
                <>
                  <ExclusiveBadge
                    className="exclusiveBadge"
                    data-tip
                    data-for="exclusiveTip"
                  />
                  <ReactToolTip id="exclusiveTip" place="top" effect="solid">
                    Exclusive
                  </ReactToolTip>
                </>
              );
            }
          })}
        </BadgeHolder>
      </BottomSection>
    </Container>
  );
};
const ExclusiveBadge = styled(Exclusive)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const FounderBadge = styled(Founder)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const PremiumBadge = styled(Premium)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const PrereleaseBadge = styled(Prerelease)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;
const BadgeHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

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
  margin-left: 5px;
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
  padding: 12px 0;
  background-color: ${(props) => props.theme.color.box};
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius}px;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 325px;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  :focus {
    border: 1px solid white;
  }
  @media only screen and (max-width: 330px) {
    width: 300px;
  }
`;

const Image = styled.img`
  /* cursor: pointer; */
  width: 325px;
  height: 325px;
  /* border-radius: 12px; */
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  background-color: #1e1e1e;
  @media only screen and (max-width: 330px) {
    width: 300px;
    height: 300px;
  }
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
