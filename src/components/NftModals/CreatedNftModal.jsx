import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { ReactComponent as IconCart } from "../../assets/img/icons/cart.svg";
import { ReactComponent as IconHeart } from "../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../assets/img/icons/share.svg";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import loadingGif from "../../assets/img/loading.gif";
import logo from "../../assets/img/logos/logo_tiny.png";
import { useAccountConsumer } from "../../contexts/Account";
import { chooseFlatPriceSale, require } from "../../web3/utils";

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
  const { account, usdPerEth, usdPerBnb, currChainId } = useAccountConsumer();
  const [loading, setLoading] = useState(false);

  if (!open) return null;
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

  const getChain = () => {
    console.log(currChainId);
    switch (currChainId) {
      case 1:
        return "ETH";
      case 4:
        return "ETH";
      case 56:
        return "BSC";
      case 97:
        return "BSC";
    }
  };

  const changeNftPrice = async () => {
    if (nft.chain !== getChain()) 
      return Swal.fire({
        title: `You need to be on ${nft.chain} to change the price of this NFT.`,
      });
    const res = await Swal.fire({
      title: `Change price for: ${nft.title}?`,
      text: `Any contract interactions do incur gas fees. Enter the new price in ${
        getChain() === "BSC" ? "BNB" : "ETH"
      } below`,
      input: "number",
      inputValidator: (value) => {
        if (Number(value) < 0) {
          return "You cannot set a negative price!";
        }
      },
      confirmButtonText: "Change Price!",
    })
    if (res.isConfirmed) {
      console.log(res.value);
      setLoading(true);
      try {
        const { provider } = await require();
        const signer = provider.getSigner();
        const flatPriceSale = await chooseFlatPriceSale()
        const data = {
          address: account,
          nftId: nft.nftId,
          flatPriceSale,
          price: res.value,
          chain: nft.chain,
        }
        const sig = await signer.signMessage(JSON.stringify(data))
        await axios.post("/api/nft-type/updatePrice", {
          ...data,
          sig
        })
        setLoading(false)
        Swal.fire({ title: "Success! Reload the page to see the changes." });
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  };

  const share = () => {
    setIsShareOpen();
    hide();
  };

  return (
    <OpaqueFilter onClick={(e) => !loading && hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => !loading && hide(e)} />
          <CardTitle>
            <Logo src={logo} />
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
          <InfoContainer>
            <TrackName>{nft.title}</TrackName>
            <Artist>{nft.artist}</Artist>
          </InfoContainer>
          <StatsContainer>
            <StyledTable>
              <TableRow className="header">
                <th>Earnings</th>
              </TableRow>
              {nft.chain === "ETH" && (
                <TableRow>
                  <td>ETH</td>
                  <td>
                    {/* <EthIcon /> */}
                    {parseFloat(nft.numSold * nft.price)}
                  </td>
                </TableRow>
              )}
              {nft.chain === "BSC" && (
                <TableRow>
                  <td>BNB</td>
                  <td>
                    {/* <BnbIcon /> */}
                    {parseFloat(nft.numSold * nft.price)}
                  </td>
                </TableRow>
              )}
              <TableRow>
                <td>USD</td>
                {nft.chain === "ETH" && (
                  <td>
                    ${" "}
                    {parseFloat(
                      nft.numSold * nft.price * usdPerEth
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                )}
                {nft.chain === "BSC" && (
                  <td>
                    ${" "}
                    {parseFloat(
                      nft.numSold * nft.price * usdPerBnb
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                )}
              </TableRow>
            </StyledTable>
          </StatsContainer>
          {loading ? (
            <Loading src={loadingGif} alt="loading gif" />
          ) : (
            <PriceButton onClick={() => changeNftPrice()}>
              Change NFT price
            </PriceButton>
          )}
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};
const PriceButton = styled.button`
  /* width: 32%; */
  color: white;
  border: 2px solid ${(props) => props.theme.color.yellow};
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  padding: 5px 10px;
  cursor: pointer;
`;

const Loading = styled.img`
  width: 20px;
  height: 20px;
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
    stroke: ${(props) => props.theme.color.pink};
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
    border-bottom: 1px solid ${(props) => props.theme.color.gray};
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

export default BuyNftModal;
