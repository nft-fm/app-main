import React from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as IconX } from "../../assets/img/icons/x.svg";
import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

const SMShareModal = ({
  open,
  children,
  hide,
  onClose,
  nft,
  updateShareCount,
}) => {

  const url = `https://beta.fanfare.fm/market/${nft.chain}/${nft.nftId}`;
  const message = `${nft.title} by ${nft.artist}\nAvailable at: `;
  const hashtags =`#NFTCollectors, #MusicLovers, #NFTCommunity, #NFTs, #NFTMusic, #eth, #bnb, $VINYL Rocket`

  const newShare = () => {
    axios.post("/api/nft-type/newShare", nft);
    updateShareCount();
    hide();
  };

  const hideModal = (e) => {
    e.stopPropagation();
    hide();
  }

  return (
    <Buttons>
      <TwitterShareButton
        title={message}
        url={url}
        hashtags={["#NFTCollectors", "#MusicLovers", "Fanfare", "NFTCommunity"}
      >
        <ButtonHolder onClick={() => newShare()}>
          <TwitterIcon size={50} borderRadius={"10px"} />
        </ButtonHolder>
      </TwitterShareButton>
      <FacebookShareButton
        quote={message}
        url={url}
        hashtags={hashtags}
      >
        <ButtonHolder onClick={() => newShare()}>
          <FacebookIcon size={50} borderRadius={"10px"} />
        </ButtonHolder>
      </FacebookShareButton>
    </Buttons>
  );
};

const ButtonHolder = styled.div`
  width: 50%;
  background-color: ${(props) => props.theme.color.box};
  border-radius: ${(props) => props.theme.borderRadius}px;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  /* padding: 5px 5px 0px 5px; */
  margin-left: auto;
  margin-right: auto;
  & > span {
    color: white;
    font-size: ${(props) => props.theme.fontSizes.sm};
    margin-left: 10px;
  }
  transition: 0.1s ease-in-out;
  :hover {
    background-color: ${(props) => props.theme.color.gray};
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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

const OpaqueFilter = styled.div`
cursor: default;
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
  /* height: 200px; */
  /* width: 400px; */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  border-radius: 8px;
  border: solid 2px #181818;
  /* width: calc(100% - 60px); */
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
  & > span {
    font-size: ${(props) => props.theme.fontSizes.md};
    text-align: center;
  }
  @media only screen and (max-width: 776px) {
    width: 80vw;
  }
`;

export default SMShareModal;
