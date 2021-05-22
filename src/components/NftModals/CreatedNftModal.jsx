import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import axios from "axios";
import swal from "sweetalert2";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import logo from "../../assets/img/logos/logo_tiny.png";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { useAccountConsumer } from "../../contexts/Account";
import { getSetSale } from "../../web3/utils";
import IconMetamask from "../../assets/img/icons/metamask_icon.png";

import { ReactComponent as eth_icon } from "../../assets/img/icons/ethereum.svg";
import Swal from "sweetalert2";
const BuyNftModal = ({
  open,
  hide,
  nft,
  liked,
  setLiked,
  likeCount,
  setLikeCount,
  setIsShareOpen,
}) => {
  const { account, connect, usdPerEth } = useAccountConsumer();

  if (!open) return null;
  const stopProp = (e) => {
    e.stopPropagation();
  };
  console.log("nft", nft);

  const purchase = (id) => {
    axios
      .post("/api/nft-type/purchase", { id: id, address: account })
      .then((res) => {
        console.log("purchase res", res);
      })
      .catch((err) => console.log(err));
  };

  const like = async () => {
    if (account) {
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      setLiked(!liked);
      await axios.post(`api/user/like-nft`, { address: account, nft: nft._id })
        .catch(err => { console.log(err) })
    } else {
      hide();
      Swal.fire("Connect a wallet");
    }
  }

  const share = () => {
    setIsShareOpen();
    hide();
  };
  console.log('nftprice', nft.title, nft.price)

  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => hide(e)} />
          <CardTitle>
            <Logo src={logo} />
          </CardTitle>
          <CardTop>
            <Side>
              <IconArea>
                {liked ?
                  <LikedHeart onClick={() => like()} /> :
                  <Heart onClick={() => like()} />
                }
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
          <InfoContainer>
            <TrackName>{nft.title}</TrackName>
            <Artist>{nft.artist}</Artist>
          </InfoContainer>
          <StatsContainer>
            <StyledTable>
              <TableRow className="header">
                <th>Earnings</th>
              </TableRow>
              <TableRow>
                <td>ETH</td>
                <td><EthIcon
                />{parseFloat(nft.numSold * nft.price)}</td>
              </TableRow>
              <TableRow>
                <td>USD</td>
                <td>
                  ${" "}
                  {parseFloat(nft.numSold * nft.price * usdPerEth).toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </td>
              </TableRow>
            </StyledTable>
          </StatsContainer>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const EthIcon = styled(eth_icon)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  /* position: absolute; */
  /* right: -12px; */
  margin-right: 3px;
  transition: all 0.2s;
  & path {
    fill: white;
  }
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

const Cart = styled(IconCart)`
  width: 24px;
  height: 24px;
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

const LikedHeart = styled(IconHeart)`
  width: 24px;
  height: 24px;
  margin: -3px 4px 0 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  & path {
    stroke: ${props => props.theme.color.pink};
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
  backdrop-filter: blur(4.6px);
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
`;
const StatsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-bottom: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.table`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &.header {
    justify-content: center;
    border-bottom: 1px solid ${props => props.theme.color.gray};
    margin-bottom: 5px;
    
  }
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

export default BuyNftModal;
