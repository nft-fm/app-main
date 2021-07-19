import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import PlaySongSnippet from "../../../../components/NftModals/Components/PlaySongSnippet"
import moment from "moment";
import { ReactComponent as IconEth } from "../../../../assets/img/icons/ethereum.svg";
import { ReactComponent as IconHeart } from "../../../../assets/img/icons/heart.svg";
import { ReactComponent as IconShare } from "../../../../assets/img/icons/share.svg";
import { ReactComponent as IconCart } from "../../../../assets/img/icons/cart.svg";

const PreviewBuyModal = ({ nft, partialSong }) => {
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
  return (
    <>
      <CardTop>
        <Side>
          <IconArea>
            <Heart/>
          </IconArea>
          <IconArea>
            <Share/>
            0
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
      <BadgeHolder />
      <InfoContainer>
        <TrackName>{nft.title}</TrackName>
        <Artist
          to={`/artist/${nft.artist ? nft.artist.replace(/ /g, "").toLowerCase() : ''}`}
        >
          {nft.writer}
        </Artist>
      </InfoContainer>
      <SnippetHolder>
        <PlaySongSnippet partialSong={partialSong} />
        <SnippetText>15 Sec Preview</SnippetText>
      </SnippetHolder>
      <TrackDetailsHolder>
        <span>Genre: {nft.genre}</span>
        <span>Producer: {nft.producer}</span>
        <span>Track Length: {formatSongDur(nft.dur)}</span>
        <span>
          Release Date: {moment(nft.timestamp).format("MMM Do YYYY")}
        </span>
      </TrackDetailsHolder>
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
      <BuyButton>
        <ButtonText>Purchase</ButtonText>
      </BuyButton>
    </>
  )
}

const TrackDetailsHolder = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 125px;
  justify-content: space-around;
  padding-left: 20px;
  @media only screen and (max-width: 776px) {
    height: auto;
  }
  span {
    color: ${(props) => props.theme.color.gray};
  }
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
  @media only screen and (max-width: 776px) {
    margin-bottom: 0;
  }
  color: white;
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
  color: white;
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

export default PreviewBuyModal;