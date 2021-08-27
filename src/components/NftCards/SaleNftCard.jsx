import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NftModalHook from "../NftModalHook/NftModalHook";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconUsd } from "../../assets/img/icons/dollar.svg";
import { useAccountConsumer } from "../../contexts/Account";
import loading from "../../assets/img/loading.gif";
import axios from "axios";
import ShareModal from "../SMShareModal/SMShareModal";
import LikeShare from "./LikeShare";
import { NavLink } from "react-router-dom";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";
import { ReactComponent as GiftIcon } from "../../assets/img/icons/rewards-gift.svg";

import ReactToolTip from "react-tooltip";

const NftCard = (props) => {
  const { user, account } = useAccountConsumer();
  const [nft, setNft] = useState(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [partialSong, setPartialSong] = useState(false);
  const [shareCount, setShareCount] = useState({ count: 0 });
  const [basicLoaded, setBasicLoaded] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);

  // const show = () => setIsModalOpen(true);
  const hide = () => {
    setIsModalOpen(false);
  };

  const getSnnipetAWS = async (completeNft) => {
    console.log(completeNft.address +
      "/snnipets/" +
      completeNft.audioUrl.split("/").slice(-1)[0])
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
          getNSeconds(props.nft);
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
    console.log("im here", basicLoaded);
    if (basicLoaded) {
      setLikesLoading(true);
    }
  }, [account]);

  useEffect(() => {
    if (props.nft) {
      setNft({
        ...props.nft,
      });
      setShareCount({ count: props.nft.shareCount });
      setLikeCount(props.nft.likeCount);
      setLiked(props.nft.liked);
      setBasicLoaded(true);
      setLikesLoading(false);
    }
  }, [props.nft, user]);

  useEffect(() => {
    if (isModalOpen && !partialSong) {
      getSnnipetAWS(props.nft);
      //setPartialSong(partialSong);
      //getNSeconds(props.nft);
    }
  }, [isModalOpen]);

  if (!nft) {
    return null;
  }
  return (
    <Container open={isModalOpen}>
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
      <CardTop>
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
      </CardTop>
      {imageLoaded ? null : <Image src={loading} alt="image" />}
      <Image
        src={nft.imageUrl}
        style={imageLoaded ? {} : { display: "none" }}
        alt="image"
        onClick={() => setIsModalOpen(!isModalOpen)}
        onLoad={() => setImageLoaded(true)}
      />
      {nft.isRedeemable && (
        <RedeemButtonBackground onClick={() => setIsModalOpen(!isModalOpen)}>
          <RedeemButton>
            {/* Merch */}
            <MerchIcon />
          </RedeemButton>
        </RedeemButtonBackground>
      )}
      <TrackName onClick={() => setIsModalOpen(!isModalOpen)}>
        {nft.title.length > 20 ? nft.title.slice(0, 20) + "..." : nft.title}
      </TrackName>
      <Artist to={`/artist/${nft.artist.replace(/ /g, "").toLowerCase()}`}>
        {nft.artist.length > 20 ? nft.artist.slice(0, 20) + "..." : nft.artist}
      </Artist>
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
            if (badge.redeem) {
              return (
                <>
                  <MerchBadge
                    className="merchBadge"
                    data-tip
                    data-for="merchTip"
                  />
                  <ReactToolTip id="merchTip" place="top" effect="solid">
                    Merch
                  </ReactToolTip>
                </>
              );
            }
          })}
        </BadgeHolder>
        <CostEth>
          {nft.price !== "..."
            ? parseFloat(nft.price).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6,
              })
            : nft.price}
          <Eth />
        </CostEth>
      </BottomSection>
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

const MerchIcon = styled(GiftIcon)`
  width: 15px;
  height: 15px;
  margin-top: 3px;
  & path {
    fill: ${(props) => props.theme.color.red};
  }
`;

const MerchBadge = styled(GiftIcon)`
  width: 12px;
  height: 12px;
  padding: 1px;
  border: 1px solid ${(props) => props.theme.color.blue};
  border-radius: 50%;
  & path {
    fill: ${(props) => props.theme.color.red};
  }
`;

const ExclusiveBadge = styled(Exclusive)`
  width: 15px;
  height: 15px;
  padding: 0 5px;
`;

const BadgeHolder = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
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

const BottomSection = styled.div`
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
  :hover {
    transform: ${(props) => !props.open && "translateY(-0.15em)"};
  }
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
`;

export default NftCard;
