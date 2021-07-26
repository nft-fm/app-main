import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import logo from "../../assets/img/logos/logo_tiny.png";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import PlayIcon from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";
import loading from "../../assets/img/loading.gif";
import Swal from "sweetalert2";
import { usePlaylistConsumer } from "../../contexts/Playlist";
import { buyNFT, getEthBalance } from "../../web3/utils";
import swal from "sweetalert2";
import ReactToolTip from "react-tooltip";
import PlaySongSnippet from "./Components/PlaySongSnippet";
import { ReactComponent as IconEth } from "../../assets/img/icons/ethereum.svg";
import { ReactComponent as Founder } from "../../assets/img/Badges/founder.svg";
import { ReactComponent as Premium } from "../../assets/img/Badges/premium.svg";
import { ReactComponent as Prerelease } from "../../assets/img/Badges/prerelease.svg";
import { ReactComponent as Exclusive } from "../../assets/img/Badges/exclusive.svg";

import moment from "moment";
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import { errorIcon, warningIcon, imageWidth, imageHeight } from "../../utils/swalImages";

const BuyNftModal = (props) => {
  const {
    open,
    hide,
    nft,
    partialSong,
    liked,
    setLiked,
    likeCount,
    setLikeCount,
    setIsShareOpen,
  } = props;

  // console.log("buynftmodal", props);

  const [isLoading, setIsLoading] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const { account, connect, usdPerEth, getUser } = useAccountConsumer();
  const { setNftCallback } = usePlaylistConsumer();
  
  const stopProp = (e) => {
    e.stopPropagation();
  };

  const purchase = async (id) => {
    setIsLoading(true);
    await getEthBalance(async (balance) => {
      if (parseFloat(balance) >= nft.price) {
        await buyNFT(
          { nftID: id, amount: 1, saleId: nft.nftId, price: String(nft.price) },
          () => {
            console.log("pending");
          },
          () => {
            axios
              .post("/api/nft-type/purchase", { id: id, address: account })
              .then((res) => {
                setTimeout(function () {
                  setIsLoading(false);
                  setIsBought(true);
                  getUser();
                }, 1000);
              })
              .catch((err) => {
                console.error(err.status, err.message, err.error);
                Swal.fire(
                  `Error: ${err.response ? err.response.status : 404}`,
                  `${err.response ? err.response.data : "server error"}`,
                  "error"
                );
                setIsLoading(false);
                console.log(err);
              });
          }
        ).catch((err) => {
          console.log(err);
          swal.fire({
            imageUrl: errorIcon,
            imageWidth,
            imageHeight,            
            title: "Couldn't complete sale!",
            text: "Please try again",
          });
        });
      } else {
        setIsLoading(false);
        swal.fire({
          title: `Not Enough ETH`,
          text: `in wallet address: ...${account.substring(
            account.length - 4
          )}`,
          imageUrl: errorIcon,
          imageWidth,
          imageHeight        
        });
        return;
      }
    });
  };

  const playSong = () => {
    hide();
    setNftCallback(nft);
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

  // const [currChainId, setCurrChainId] = useState(null);

  // const getChain = async () => {
  //   console.log('here')
  //   const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
  //   setCurrChainId(Number(newChainId));
  //   console.log("chainId", Number(newChainId));
  //   return Number(newChainId);
  // }

  const connectWallet = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    if (Number(newChainId) === process.env.REACT_APP_IS_MAINNET ? 1 : 4) {
      connect("injected");
    } else {
      swal.fire({
        title: "Wrong Chain",
        text: "You are on the wrong chain. Please connect to Ethereum Mainnet.",
        imageUrl: warningIcon,
        imageWidth,
        imageHeight
      });
    }
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
          {/* if videoUrl exists, render video instead of image */}
          {/* {nft.videoUrl ? (
            <ReactPlayer
              url={nft.videoUrl}
              controls="true"
              onStart="false"
              playing={false}
              loop="true"
              width="500px"
              height="500px"
              style={{ marginTop: "auto", marginBottom: "auto" }}
              onContextMenu={e => e.preventDefault()}
              config={{ file: { 
                attributes: {
                  controlsList: 'nodownload'
                }
              }}}
            />
          ) : ( */}
            <Image src={nft.imageUrl} alt="image" />
          {/* )} */}
          <RightSide>
            <CardTop>
              <Side>
                <IconArea>
                  {liked ? (
                    <LikedHeart onClick={() => like()} />
                  ) : (
                    <Heart onClick={() => like()} />
                  )}
                  {likeCount}
                </IconArea>
                <IconArea>
                  <Share onClick={() => share()} />
                  {nft.shareCount}
                </IconArea>
              </Side>
              <Side>
                <IconArea>
                  {nft.numMinted - nft.numSold}
                  <span style={{ margin: "0 1px" }}>&nbsp;of&nbsp;</span>
                  {nft.numMinted}
                </IconArea>
              </Side>
            </CardTop>
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
            <InfoContainer>
              <TrackName>{nft.title}</TrackName>
              <Artist
                to={`/artist/${nft.artist.replace(/ /g, "").toLowerCase()}`}
              >
                {nft.artist}
              </Artist>
            </InfoContainer>
            <SnippetHolder>
              {/* {!isBought && <PlaySongSnippet partialSong={partialSong} />} */}
              <PlaySongSnippet partialSong={partialSong} />
              <SnippetText>15 Sec Preview</SnippetText>
            </SnippetHolder>
            <TrackDetailsHolder>
              <span>Genre: {nft.genre}</span>
              {/* <span>Producer: {nft.producer}</span> */}
              {/* <span>Track Length: {formatSongDur(nft.dur)}</span> */}
              <span>
                Release Date: {moment(nft.timestamp).format("MMM Do YYYY")}
              </span>
            </TrackDetailsHolder>
            <DescriptionHolder>
              <DescriptionLegend>Description</DescriptionLegend>
              <DescriptionContent>{nft.description}</DescriptionContent>
            </DescriptionHolder>
            <PricesContainer>
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
            </PricesContainer>
            {!account ? (
              <BuyButton onClick={() => connectWallet()}>
                {/* <MetaMask src={IconMetamask} /> */}
                <ButtonText>Connect Wallet</ButtonText>
              </BuyButton>
            ) : nft.numSold !== nft.numMinted ? (
              !isLoading ? (
                isBought ? (
                  <BuyButton
                    style={{ backgroundColor: "#bbb" }}
                    onClick={() => playSong()}
                  >
                    <Loading src={PlayIcon} />
                  </BuyButton>
                ) : (
                  <BuyButton onClick={() => purchase(nft._id)}>
                    <ButtonText>Purchase</ButtonText>
                  </BuyButton>
                )
              ) : (
                <BuyButton
                  style={{
                    backgroundColor: "#262626",
                    border: "1px solid #383838",
                  }}
                >
                  <Loading src={loading} />
                </BuyButton>
              )
            ) : (
              <BuyButton
                style={{
                  backgroundColor: "#262626",
                  border: "1px solid #383838",
                }}
              >
                <ButtonText>Sold Out!</ButtonText>
              </BuyButton>
            )}
          </RightSide>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const TrackDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 50px;
  margin-bottom: 10px;
  justify-content: space-around;
  color: #666;
  padding-left: 20px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
  & > span {

  }
`;
const ExclusiveBadge = styled(Exclusive)`
  width: 20px;
  height: 20px;
  padding: 0 5px;
`;
const FounderBadge = styled(Founder)`
  width: 20px;
  height: 20px;
  padding: 0 5px;
`;
const PremiumBadge = styled(Premium)`
  width: 20px;
  height: 20px;
  padding: 0 5px;
`;
const PrereleaseBadge = styled(Prerelease)`
  width: 20px;
  height: 20px;
  padding: 0 5px;
`;

const DescriptionHolder = styled.fieldset`
  width: calc(100% - 10px);
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.lightgray};
  padding: 2px 0px 0px 10px;
  height: 60px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 6px;
    background: rgb(217, 217, 217, 0.6);
  }
  /* margin-top: 10px; */
`;
const DescriptionLegend = styled.legend`
  padding: 0 5px;
  margin-left: 10px;
`;
const DescriptionContent = styled.span`
  margin-top: -10px;
`;

const SnippetHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px, 0;
  width: 100%;
  margin-top: 10px;
  @media only screen and (max-width: 776px) {
    width: 90%;
  }
`;

const SnippetText = styled.span`
  /* position: absolute; */
  font-size: ${(props) => props.theme.fontSizes.xxs};
  margin-top: -5px;
  margin-bottom: 10px;
  color: #666;
  @media only screen and (max-width: 776px) {
    margin-bottom: 0;
  }
`;

const Loading = styled.img`
  width: 17px;
  height: auto;
`;

const ButtonText = styled.span`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  color: white;
`;

const MetaMask = styled.img`
  width: 32px;
  height: auto;
`;

const Divider = styled.div`
  margin: 5px 0;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray};
`;

const AvailableItem = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.color.lightgray};
`;

const PricesContainer = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
  display: flex;
  justify-content: center;
  /* margin-left: 10%; */
  margin: 30px 0;
  @media only screen and (max-width: 776px) {
    margin: 20px 0;
  }
`;
const PriceHolder = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.bgColor};
  margin-top: -8px;
  padding: 0 10px;
`;
const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const PriceItem = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: white;
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

const Cart = styled(IconCart)`
  width: 24px;
  height: 24px;
  margin: -2px 0 0 8px;
  transition: all 0.2s ease-in-out;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.gray};
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
  margin-left: -25px;
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

const Logo = styled.img`
  width: 20px;
  margin-right: 8px;
  height: auto;
`;

const CardTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Compita";
  font-weight: 600;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin-bottom: 12px;
`;

const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
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
  color: #666;
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
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media only screen and (max-width: 776px) {
    width: 90vw;
    height: 95vh;
    flex-direction: column;
    align-items: center;
    /* justify-content: flex-start; */
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
  justify-content: flex-end;
  height: 20px;
  padding: 10px 0;
  & > span {
    padding: 0 5px;
  }
  @media only screen and (max-width: 776px) {
    padding-bottom: 0px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
  /* margin-top: -10px; */
  @media only screen and (max-width: 776px) {
    width: 90%;
    /* align-items: center; */
    margin-top: -25px;
  }
`;
const TrackName = styled.span`
  color: white;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: 600;
  margin-bottom: 6px;
  @media only screen and (max-width: 776px) {
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: ${(props) => props.theme.fontSizes.sm};
  }
`;
const Artist = styled(NavLink)`
  text-decoration: none;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: white;
  margin-bottom: 12px;
  @media only screen and (max-width: 776px) {
    margin-bottom: 0px;
  }
`;

const Row = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const BuyButton = styled.button`
  width: 150px;
  /* height: 64px; */
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.box};
  /* margin-bottom: 20px; */
  padding: 10px 20px;
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }
`;

export default BuyNftModal;
