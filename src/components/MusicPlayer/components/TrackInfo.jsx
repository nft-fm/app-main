import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as XIcon } from '../../../assets/img/icons/x.svg'


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
    width: 52px;
    height: 52px;
    border-radius: 3px;
    object-fit: cover;
`;

const TrackInfoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: Row;
    color: white;
    /* margin-bottom: 2px; */
`;

export default TrackInfo;