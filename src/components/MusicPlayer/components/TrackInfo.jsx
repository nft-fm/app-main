import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";

const TrackInfo = ({nft}) => {
  return (
      <TrackInfoWrapper>
      <Image src={nft.imageUrl} />
      <TitleAndArtistSection>
        <Title>{`${nft.title}`}</Title>
        <Artist>{`${nft.artist}`}</Artist>
      </TitleAndArtistSection>
    </TrackInfoWrapper>
  )
}
const Artist = styled.div`
  color: #5c5c5c;
`;

const Title = styled.div`
  color: white;
`;

const TitleAndArtistSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Image = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 5px;
  & path {
    stroke: ${props => props.theme.color.lightgray};
  }
`;

const TrackInfoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    margin-left: 14px;
    display: flex;
    flex-direction: Row;
    color: white;
`;

export default TrackInfo;