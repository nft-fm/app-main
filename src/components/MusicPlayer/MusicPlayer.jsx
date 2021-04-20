import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import loading from '../../assets/img/loading.gif';
import PlayIcon from '../../assets/img/icons/listen_play.svg';
import SkipForward from '../../assets/img/icons/listen_skip_forward.svg'

const MusicPlayer = (props) => {
  const { nft } = props;
  const [url, setUrl] = useState();

  console.log("nft MusicPlayer: ", nft);

  useEffect(() => {
    getSong();
  }, []);

  const getSong = async () => {
    const _url = await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] });
    console.log("url: ", _url);
    setUrl(_url.data);
  }

  const TrackInfo = () => {
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

  if (!url)
    return (
      <Wrapper>
        <Image src={loading} />
      </Wrapper>
    )

  return (
    <Wrapper>
      <AudioPlayer
        src={url}
        onPlay={e => console.log("onPlay")}
        layout={"horizontal-reverse"}
        customProgressBarSection={
          [
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
            <DummyContainer />,
            <DummyContainer />,
            RHAP_UI.LOOP,
            <DummyContainer />,
            RHAP_UI.VOLUME_CONTROLS,
            TrackInfo(),
            <DummyContainer />
          ]
        }
        customControlsSection={
          [
            <DummyContainerWide />,
            RHAP_UI.MAIN_CONTROLS,
          ]
        }
        customIcons={{
          play: <i class="icon-listen_play" />,
          forward: <i class="icon-listen_skip_forward" />,
          rewind: <i class="icon-listen_skip_backward" />,
          volume: <i class="icon-listen_volume" />,
          pause: <i class="icon-listen_pause" />,
          loop: <i class="icon-listen_loop" />
        }}
      // other props here */}
      />
    </Wrapper>
  )
}

const DummyContainerWide = styled.div`
  width: 30%;
`;

const DummyContainer = styled.div`
  width: 5px;
`;

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
  max-width: 50px;
  max-height: 50px;
`;

const AudioControlSection = styled.div`
    margin-left: auto;
    margin-right: 25px;
`;

const TrackArtist = styled.div`
    color: grey;
`;

const TrackTitle = styled.div`
    color: white;
`;

const TrackInfoWrapper = styled.div`
    align-items: center;
    justify-content: center;
    margin-left: 14px;
    display: flex;
    flex-direction: Row;
    color: white;
`;


const Wrapper = styled.div`
position: -webkit-sticky; /* Safari */
position: sticky;
bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100vw;
    background-color: #262626;
    height: 50px;
    border-top: 1px solid white ;
`;

export default MusicPlayer;