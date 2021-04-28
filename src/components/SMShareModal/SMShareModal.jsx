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
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  InstapaperShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

const SMShareModal = ({ open, children, hide, onClose, nft }) => {
  const { account, connect, usdPerEth } = useAccountConsumer();

  if (!open) return null;
  const stopProp = (e) => {
    e.stopPropagation();
  };
  const url = `https://www.nftfm.io/discover/${nft._id}`;
  const message = `Check out this amazing NFT of ${nft.artist}'s song, ${nft.title}`

  return (
    <OpaqueFilter onClick={(e) => hide(e)}>
      <Container onClick={(e) => stopProp(e)}>
        <StyledModal>
          <X onClick={(e) => hide(e)} />
          <span>Share {nft.title} by {nft.artist}!</span>
          <Buttons>
            <TwitterShareButton
              title={message}
              url={url}
            >
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>
            <FacebookShareButton
              quote={message}
              url={url}
            >
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>
          </Buttons>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const Buttons = styled.div`
width: 60%;
display: flex;
justify-content: space-evenly;
`

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
  height: 200px;
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
      font-size: ${props => props.theme.fontSizes.md}
  }
`;

export default SMShareModal;
