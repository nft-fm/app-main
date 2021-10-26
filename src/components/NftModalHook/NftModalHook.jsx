import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import PlayIcon from "../../assets/img/icons/listen_play.svg";
import { useAccountConsumer } from "../../contexts/Account";
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
import { ReactComponent as GiftIcon } from "../../assets/img/icons/rewards-gift.svg";
import moment from "moment";
import { NavLink } from "react-router-dom";
import {
  errorIcon,
  warningIcon,
  imageWidth,
  imageHeight,
} from "../../utils/swalImages";
import Ticker from "../../components/Ticker";
import { ReactComponent as IconBinance } from "../../assets/img/icons/binance-logo.svg";

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

  const [isLoading, setIsLoading] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const { account, connect, getUser, currChainId } = useAccountConsumer();
  const { setNftCallback } = usePlaylistConsumer();
  const history = useHistory();

  useEffect(() => {
    if (open) {
      axios
        .post("/api/nft-type/trackNftView", {
          address: account,
          nftId: nft.nftId,
          artistAddress: nft.address,
          artist: nft.artist,
          title: nft.title,
        })
        .then()
        .catch((err) => console.log(err));
    }
  }, [open]);

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const purchase = async (id) => {
    if (
      (nft.chain === "ETH" && currChainId !== 1 && currChainId !== 4) ||
      (nft.chain === "BSC" && currChainId !== 56 && currChainId !== 97)
    ) {
      swal.fire({
        title: `Wrong Chain`,
        text: `You must be on the ${nft.chain} blockchain to purchase this NFT. You can change chains in the navbar.`,
        imageUrl: errorIcon,
        imageWidth,
        imageHeight,
      });
      return;
    }
    setIsLoading(true);
    // {!} simplify the below
    await getEthBalance(async (balance) => {
      if (parseFloat(balance) >= nft.price) {
        Swal.fire({
          title: "Purchasing, please do not leave this page.",
          showConfirmButton: false,
          timer: 3000,
        }).then(async () => {
          await buyNFT(
            {
              nftID: id,
              amount: 1,
              saleId: nft.nftId,
              price: String(nft.price),
            },
            (err) => {
              if (err) {
                setIsLoading(false);
                swal.fire({
                  imageUrl: errorIcon,
                  imageWidth,
                  imageHeight,
                  title: "Couldn't complete sale!",
                  text: "Please try again",
                });
              } else {
                setTimeout(function () {
                  setIsLoading(false);
                  setIsBought(true);
                  getUser();
                }, 1000);
                if (nft.isRedeemable) {
                  Swal.fire({
                    title: "Redeem Merch!",
                    text: "You just bought an NFT with redeemable merch! Click this button to go to the redemption portal",
                    confirmButtonText: "Redeem!",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      history.push("/redeem");
                    }
                  });
                } else {
                  Swal.fire({
                    title: "Succesful purchase!",
                    html: `<div>View in your library (can take a few minutes to appear)<div>`,
                  });
                }
              }
            }
          ).catch((err) => {
            setIsLoading(false);
            swal.fire({
              imageUrl: errorIcon,
              imageWidth,
              imageHeight,
              title: "Couldn't complete sale!",
              text: "Please try again",
            });
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
          imageHeight,
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
        imageHeight,
      });
    }
  };

  //add in to the nft modal
  // const formatSongDur = (d) => {
  //   d = Number(d);
  //   var h = Math.floor(d / 3600);
  //   var m = Math.floor((d % 3600) / 60);
  //   var s = Math.floor((d % 3600) % 60);

  //   var hDisplay = h > 0 ? h + ":" : "";
  //   var mDisplay = m > 0 ? m + ":" : "0:";
  //   var sDisplay = s < 10 ? "0" + s : s;
  //   return hDisplay + mDisplay + sDisplay;
  // };

  if (!open) return null;
  return (
    <OpaqueFilter onClick={(e) => !isLoading && hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => !isLoading && hide(e)} />
          <Image src={nft.imageUrl} alt="image" />
          <RightSide>
            <CardTop>
              <Side>
                <ProfilePicture img={props.profilePic} />
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
              {
                // {!} refactor badges into independent component
                nft.badges?.map((badge) => {
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
                })
              }
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
              <ReactToolTip id="merchTip" place="top" effect="solid">
                Merch
              </ReactToolTip>
            </BadgeHolder>
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
            <TrackDetailsHolder>
              <Info>
                <span>Genre: {nft.genre}</span>
                {/* <span>Producer: {nft.producer}</span> */}
                {/* <span>Track Length: {formatSongDur(nft.dur)}</span> */}
                <span>
                  Release Date: {moment(nft.timestamp).format("MMM Do YYYY")}
                </span>
              </Info>
              <Actions>
                <IconArea>
                  <LikeButton
                    onClick={() => like()}
                    aria-pressed={liked}
                    aria-label="like button"
                  >
                    {liked ? (
                      <LikedHeart aria-hidden="true" />
                    ) : (
                      <Heart aria-hidden="true" />
                    )}
                  </LikeButton>
                  {likeCount}
                </IconArea>
                <IconArea onClick={() => share()}>
                  <ShareButton
                    onClick={() => share()}
                    aria-label="share button"
                  >
                    <Share onClick={() => share()} />
                  </ShareButton>
                  {/* {nft.shareCount}  */}
                  Share
                </IconArea>
              </Actions>
            </TrackDetailsHolder>
            <DescriptionHolder>
              <DescriptionLegend>Description</DescriptionLegend>
              <DescriptionContent>{nft.description}</DescriptionContent>
            </DescriptionHolder>
            <SnippetHolder>
              {/* {!isBought && <PlaySongSnippet partialSong={partialSong} />} */}
              <PlaySongSnippet partialSong={partialSong} />
              <SnippetText>15 Sec Preview</SnippetText>
            </SnippetHolder>

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
                {nft.chain === "ETH" ? <Eth /> : <Bsc />}
              </PriceHolder>
            </PricesContainer>
            {!account ? (
              <BuyButton onClick={() => connectWallet()}>
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
                  <BuyButton
                    onClick={() => purchase(nft._id)}
                    className="buyButton"
                  >
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

const ProfilePicture = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-left: 20px;
  margin-top: 10px;
  background-image: url(${(props) => props.img});
  background-size: cover;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: start;
`;

const LikeButton = styled.button`
  background-color: transparent;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;

const ShareButton = styled.button`
  background-color: transparent;
  padding: 0px;
  border: none;
  width: min-content;
  height: min-content;
  margin: 0px 4px 0 0;
`;

const Bsc = styled(IconBinance)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
`;

const Eth = styled(IconEth)`
  width: 18px;
  height: 18px;
  margin: -2px 0 0 4px;
  & path {
    fill: ${(props) => props.theme.color.white};
  }
`;

const TrackDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-bottom: 10px;
  justify-content: space-between;
  color: #666;
  padding-left: 10px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 776px) {
    margin-left: 15px;
    margin-top: 5px;
  }
`;

const Actions = styled.div`
  display: flex;
`;

const MerchBadge = styled(GiftIcon)`
  width: 16px;
  height: 16px;
  padding: 1px;
  border: 1px solid ${(props) => props.theme.color.blue};
  border-radius: 50%;
  & path {
    fill: ${(props) => props.theme.color.red};
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
  height: 100px;
  overflow-y: scroll;
  padding: 2px 0px 0px 10px;
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
  margin: 10px;
  margin-left: 0px;
`;

const SnippetHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px, 0;
  width: 100%;
  margin-top: 20px;
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

const PricesContainer = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid ${(props) => props.theme.color.gray};
  display: flex;
  justify-content: center;
  /* margin-left: 10%; */
  margin: 20px 0;
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

const Share = styled(IconShare)`
  width: 19px;
  height: 19px;
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
  cursor: pointer;
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
  cursor: default;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: brightness(20%) blur(2px);
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
  z-index: 505;
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
    padding-top: 0px;
  }
`;
const StyledModal = styled.div`
  border-radius: 16px;
  border: solid 1px #181818;
  width: 1100px;
  height: 600px;
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
    justify-content: flex-start;
  }
`;

const Image = styled.img`
  width: 750px;

  /* height: 400px; */
  aspect-ratio: 1;
  border-radius: 16px;
  border: 1px solid #262626;
  background-color: #1e1e1e;
  object-fit: cover;
  overflow: hidden;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
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
  height: 10px;
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
    margin-top: -20px;
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

const BuyButton = styled.button`
  width: 200px;
  height: 60px;
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

  &.buyButton {
    background-color: ${(props) => props.theme.color.green};
  }
`;

export default BuyNftModal;
