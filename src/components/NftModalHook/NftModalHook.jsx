import React, { useCallback, useEffect, useState } from "react";
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
import PlaySongSnippet from "../NftModals/Components/PlaySongSnippet";

const NftModalHook = ({ 
  open,
  children,
  hide,
  onClose,
  nft,
  partialSong,
  liked,
  setLiked,
  likeCount,
  setLikeCount,
  setIsShareOpen,}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const { account, connect, usdPerEth, getUser } = useAccountConsumer();
    const { setNftCallback } = usePlaylistConsumer();
    console.log('nftmodalHokk')
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
              icon: "error",
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
            icon: "error",
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
  
    const [currChainId, setCurrChainId] = useState(null);
  
    // const getChain = async () => {
    //   console.log('here')
    //   const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
    //   setCurrChainId(Number(newChainId));
    //   console.log("chainId", Number(newChainId));
    //   return Number(newChainId);
    // }
  
    const connectWallet = async () => {
      const newChainId = await window.ethereum.request({ method: "eth_chainId" });
      if ((Number(newChainId) === process.env.REACT_APP_IS_MAINNET ? 1 : 4)) {
        connect("injected");
      } else {
        swal.fire({
          title: "Wrong Chain",
          text:
            "You are on the wrong chain. Please connect to Ethereum Mainnet.",
          icon: "warning",
        });
      }
    };
  
    if (!open) return null;
    return (
      <OpaqueFilter onClick={(e) => hide(e)}>
        <Container onClick={(e) => stopProp(e)}>
          <StyledModal>
            <X onClick={(e) => hide(e)} />
            <CardTitle>
              <Logo src={logo} />
              Buy NFT
            </CardTitle>
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
                  {nft.numSold}
                  <span style={{ margin: "0 1px" }}>/</span>
                  {nft.numMinted}
                  <Cart />
                </IconArea>
              </Side>
            </CardTop>
            <Image src={nft.imageUrl} alt="image" />
            {!isBought && <PlaySongSnippet partialSong={partialSong} />}
            <SnippetText>15 Sec Preview</SnippetText>
            <InfoContainer>
              <TrackName>{nft.title}</TrackName>
              <Artist>{nft.artist}</Artist>
            </InfoContainer>
            <PricesContainer>
              <Row>
                <PriceItem>Price:</PriceItem>
                <PriceItem>
                  {" "}
                  {nft.price
                    ? parseFloat(nft.price).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 6,
                      })
                    : "--"}{" "}
                  &nbsp; ETH
                </PriceItem>
              </Row>
              <Divider />
              <Row>
                <AvailableItem>Price:</AvailableItem>
                <AvailableItem>
                  {" "}
                  {usdPerEth
                    ? parseFloat(usdPerEth * nft.price).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )
                    : "..."}{" "}
                  &nbsp; USD
                </AvailableItem>
              </Row>
            </PricesContainer>
            {!account ? (
              <BuyButton onClick={() => connectWallet()}>
                {/* <BuyButton onClick={() => connect("injected")}> */}
                <MetaMask src={IconMetamask} />
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
                    <ButtonText>Buy</ButtonText>
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
          </StyledModal>
        </Container>
      </OpaqueFilter>
    );
  };
  
  const SnippetText = styled.span`
  /* position: absolute; */
  font-size: ${props => props.theme.fontSizes.xxs};
  margin-top: -5px;
  margin-bottom: 10px
  `
  
  const Loading = styled.img`
    width: 40px;
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
    margin-bottom: 8px;
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
    width: 340px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.color.gray};
  `;
  
  const StyledModal = styled.div`
    border-radius: 8px;
    border: solid 2px #181818;
    width: calc(100% - 60px);
    height: 100%;
    padding: 10px 30px;
    background-color: ${(props) => props.theme.bgColor};
    font-size: 16px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
  `;
  
  const Image = styled.img`
    width: 280px;
    height: 280px;
    border-radius: 15px;
    border: 1px solid #262626;
    background-color: #1e1e1e;
    object-fit: cover;
    overflow: hidden;
    margin-bottom: 16px;
  `;
  
  const PricesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  `;
  const InfoContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
  `;
  const TrackName = styled.span`
    color: white;
    font-size: ${(props) => props.theme.fontSizes.sm};
    margin-bottom: 6px;
  `;
  const Artist = styled.span`
    font-size: ${(props) => props.theme.fontSizes.xs};
    color: ${(props) => props.theme.color.lightgray};
    margin-bottom: 12px;
  `;
  
  const Row = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
  `;
  
  const BuyButton = styled.button`
    width: 140px;
    height: 64px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid ${(props) => props.theme.color.boxBorder};
    border-radius: 2px;
    background-color: ${(props) => props.theme.color.box};
    margin-bottom: 20px;
    &:hover {
      background-color: ${(props) => props.theme.color.boxBorder};
      border: 1px solid #383838;
    }
  `;
export default NftModalHook;
