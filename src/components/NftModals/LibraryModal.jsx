import React from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { useAccountConsumer } from "../../contexts/Account";
import Swal from "sweetalert2";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import ReactToolTip from "react-tooltip";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";
import ReactPlayer from "react-player";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { ReactComponent as PlayIcon } from "../../assets/img/icons/listen_play.svg";
import Ticker from "../../components/Ticker";
import LikeShare from '../NftCards/LikeShare'

const LibraryModal = ({
  open,
  hide,
  nft,
  liked,
  setLiked,
  likeCount,
  setLikeCount,
  setIsShareOpen,
}) => {
  const { account } = useAccountConsumer();
  const { setNftCallback } = usePlaylistConsumer();
  const stopProp = (e) => {
    e.stopPropagation();
  };

  const like = async () => {
    if (account) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
      setLiked(!liked);
      await axios
        .post(`api/user/like-nft`, { address: account, nft: nft._id })
        .catch((err) => {
          console.log(err);
        });
    } else {
      hide();
      Swal.fire("Connect a wallet");
    }
  };

  const share = () => {
    setIsShareOpen();
    hide();
  };

  const formatSongDur = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "0:";
    var sDisplay = s < 10 ? "0" + s : s;
    return hDisplay + mDisplay + sDisplay;
  };

  if (!open) return null;
  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => hide(e)} />
          {nft.videoUrl ? (
            <ReactPlayer
              url={nft.videoUrl}
              controls="true"
              onStart="false"
              playing={false}
              loop="true"
              width="500px"
              height="500px"
              style={{ marginTop: "auto", marginBottom: "auto" }}
              onContextMenu={(e) => e.preventDefault()}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            />
          ) : (
            <Image src={nft.imageUrl} alt="image" />
          )}
          <RightSide>
            <CardTop>
              <Side>
                <LikeShare
                  nft={nft}
                  liked={liked}
                  setLiked={setLiked}
                  likeCount={likeCount}
                  setLikeCount={setLikeCount}
                />
              </Side>
              <Side>
                <IconArea>
                  {nft.numMinted - nft.numSold}
                  <span style={{ margin: "0 1px" }}>&nbsp;of&nbsp;</span>
                  {nft.numMinted}
                </IconArea>
              </Side>
            </CardTop>
            <TitleAndPlayButton>
              <InfoContainer>
                {nft.title.length > 18 ? (
                  <Ticker>
                    <TrackName>{nft.title}</TrackName>
                  </Ticker>
                ) : (
                  <TrackName>{nft.title}</TrackName>
                )}
                <Artist
                  to={`/artist/${nft.artist.replace(/ /g, "").toLowerCase()}`}
                >
                  {nft.artist.length > 20
                    ? nft.artist.slice(0, 20) + "..."
                    : nft.artist}
                </Artist>
              </InfoContainer>
              <PlayButtonMobile
                src={PlayIcon}
                onClick={() => setNftCallback(nft)}
              />
            </TitleAndPlayButton>
            <BadgeHolder>
              {nft.badges?.map((badge) => {
                if (badge.founder) {
                  return (
                    <FounderBadge
                      key={badge}
                      data-tip
                      data-for="founderBadge"
                    />
                  );
                }
                if (badge.premium) {
                  return (
                    <PremiumBadge
                      key={badge}
                      data-tip
                      data-for="premiumBadge"
                    />
                  );
                }
                if (badge.prerelease) {
                  return (
                    <PrereleaseBadge
                      key={badge}
                      data-tip
                      data-for="prereleaseBadge"
                    />
                  );
                }
                if (badge.exclusive) {
                  return (
                    <ExclusiveBadge
                      key={badge}
                      data-tip
                      data-for="exclusiveBadge"
                    />
                  );
                }
              })}
              <ReactToolTip id="founderBadge" place="top" effect="solid">
                Founder
              </ReactToolTip>
              <ReactToolTip id="premiumBadge" place="top" effect="solid">
                Premium
              </ReactToolTip>
              <ReactToolTip id="prereleaseBadge" place="top" effect="solid">
                Prerelease
              </ReactToolTip>
              <ReactToolTip id="exclusiveBadge" place="top" effect="solid">
                Exclusive
              </ReactToolTip>
            </BadgeHolder>

            <TrackDetailsHolder>
              <span>Genre: {nft.genre}</span>
              <span>Producer: {nft.producer}</span>
              <span>Track Length: {formatSongDur(nft.dur)}</span>
              <span>
                Release Date: {moment(nft.timestamp).format("MMM Do YYYY")}
              </span>
            </TrackDetailsHolder>
            {/* <DescriptionHolder>
              <DescriptionLegend>Description</DescriptionLegend>
              <DescriptionContent>alskhgyfawe,jkfbhv</DescriptionContent>
            </DescriptionHolder> */}
            {/* <PricesContainer>
              <PriceHolder>
                <PriceItem>
                  {nft.price
                    ? parseFloat(nft.price).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 6,
                      })
                    : "--"}{" "}
                </PriceItem>
                &nbsp;
                <Eth />
              </PriceHolder>
            </PricesContainer> */}
            {/* {!isLoading ? (
              <BuyButton
                style={{ backgroundColor: "#bbb" }}
                onClick={() => playSong()}
              >
                <Loading src={PlayIcon} />
              </BuyButton>
            ) : (
              <BuyButton
                style={{
                  backgroundColor: "#262626",
                  border: "1px solid #383838",
                }}
              >
                <Loading src={loading} />
              </BuyButton>
            )} */}
            <PlayButtonDesktop
              src={PlayIcon}
              onClick={() => setNftCallback(nft)}
            />
          </RightSide>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const TitleAndPlayButton = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const PlayButtonMobile = styled(PlayIcon)`
  display: none;
  /* margin-top: -55px;
  margin-left: 70%; */
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

  @media only screen and (max-width: 776px) {
    display: block;
    /* width: 50px;
  height: 50px; */
  }
`;
const PlayButtonDesktop = styled(PlayIcon)`
  margin-top: 10px;
  width: 100px;
  height: 100px;
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

  @media only screen and (max-width: 776px) {
    display: none;
    /* width: 50px;
  height: 50px; */
  }
`;
const TrackDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 125px;
  /* justify-content: space-around; */
  padding-left: 20px;
  /* margin-top: 10px; */
  & > span {
    padding-bottom: 10px;
  }
  @media only screen and (max-width: 776px) {
    height: auto;
  }
`;
const ExclusiveBadge = styled(Exclusive)`
  width: 30px;
  height: 30px;
  padding: 0 10px;
`;
const FounderBadge = styled(Founder)`
  width: 30px;
  height: 30px;
  padding: 0 10px;
`;
const PremiumBadge = styled(Premium)`
  width: 30px;
  height: 30px;
  padding: 0 10px;
`;
const PrereleaseBadge = styled(Prerelease)`
  width: 30px;
  height: 30px;
  padding: 0 10px;
`;

const X = styled(IconX)`
  position: absolute;
  right: 2px;
  top: 9px;
  width: 24px;
  height: 24px;
  margin: 0 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    stroke: ${(props) => props.theme.color.gray};
    fill: ${(props) => props.theme.color.gray};
  }
`;

const LikedHeart = styled(IconHeart)`
  width: 24px;
  height: 24px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${(props) => props.theme.color.pink};
  }
`;
const Share = styled(IconShare)`
  width: 19px;
  height: 19px;
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

const Heart = styled(IconHeart)`
  width: 24px;
  height: 24px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    stroke: ${(props) => props.theme.color.gray};
  }
  &:hover {
    & path {
      stroke: #dd4591;
    }
  }
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 776px) {
    margin-left: 0;
  }
`;

const IconArea = styled.div`
  margin: 0 8px;
  display: flex;
  font-size: 14px;
  height: 100%;
  align-items: center;
`;

const CardTop = styled.div`
  /* padding: 0px 2px; */
  width: 100%;
  /* margin-bottom: 8px; */
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-family: "Compita";
`;

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  cursor: unset;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 500;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 500px);
  padding: 10px 30px;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: calc(100vh / 2);
    justify-content: space-between;
  }
`;
const StyledModal = styled.div`
  border-radius: 16px;
  border: solid 1px #181818;
  width: 800px;
  /* width: 700px; */
  /* height: 600px; */
  /* padding: 10px 30px; */
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  font-weight: normal;
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 95vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Image = styled.img`
  width: 500px;
  /* height: 400px; */
  aspect-ratio: 1;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  /* margin-bottom: 16px; */
  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 90vw;
  }
`;

const BadgeHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 40px;
  padding: 15px 0;
  align-items: center;
  /* & > span {
    padding: 0 10px;
  } */
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
  /* margin-top: 20px; */
  @media only screen and (max-width: 776px) {
    width: 90%;
    /* align-items: center; */
    /* margin-top: -25px; */
  }
`;
const TrackName = styled.span`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 600;
  margin-bottom: 6px;
`;
const Artist = styled(NavLink)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: white;
  /* margin-bottom: 12px; */
`;

export default LibraryModal;
