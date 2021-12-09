import React from "react";
import styled from "styled-components";

const ArtistNfts = ({ nfts }) => {
  return <NftScroll> {nfts} </NftScroll>;
};

const NftScroll = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (max-width: 776px) {
    flex-direction: column;
    align-items: center;
  }
  @media only screen and (max-width: 460px) {
    width: auto;
    margin-top: 30px;
    flex-direction: column;
  }
`;
export default ArtistNfts;
