import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import loading from '../../assets/img/loading.gif';
import PlayIcon from '../../assets/img/icons/listen_play.svg';
import PauseIcon from '../../assets/img/icons/listen_pause.svg'
import SkipForward from '../../assets/img/icons/listen_skip_forward.svg'
import xIcon from '../../assets/img/icons/x.svg';

const AudioCtx = window.AudioContext || window.webkitAudioContext;

const MusicPlayer = (props) => {
  const { nft, setNextNft, setPrevNft, exitPlayer } = props;
  const [url, setUrl] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContextRef = useRef();

  const toArrayBuffer = (buf) => {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
      view[i] = buf[i];
    }
    return ab;
  }

  const getSong = async () => {
     axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
         .then((_songFile) => {
            console.log(_songFile);
             const abSong = toArrayBuffer(_songFile.data.Body.data);
           const bufferSrc = audioContextRef.current.createBufferSource();
           audioContextRef.current.decodeAudioData(abSong, (buffer) => {
                 bufferSrc.buffer = buffer;
                 bufferSrc.connect(audioContextRef.current.destination);
                // source.loop = true;
                 bufferSrc.start(0);
             }, (e) => { console.log("Error: ", e.err); })
             setIsPlaying(true);
             setIsLoading(false);
         })
  }

   const playSong = () => {
     if (audioContextRef.current.state === 'suspended') audioContextRef.current.resume();
     else audioContextRef.current.start(0);
     setIsPlaying(true);
   }

   const stopSong = () => {
       setIsPlaying(false);
       if ( audioContextRef.current.suspend) {
         audioContextRef.current.suspend();
       }
   }

  useEffect(() => {
    const audioCtx = new AudioContext();

    // Store context and start suspended
    audioContextRef.current = audioCtx;
  }, []);

  useEffect(() => {
    getSong();
  }, [nft]);
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

  if (isLoading)
    return (
      <Wrapper>
        <Image src={loading} />
      </Wrapper>
    )

  return (
     <Wrapper>
         <Image src={nft.imageUrl} alt="image" />
         {TrackInfo}
         <AudioControlSection>
             <div onClick={() => console.log("Foo")} >
               FOO
             </div>
             {!isPlaying ?
                 <img src={PlayIcon} onClick={() => playSong()} />
                 :
                 <img src={PauseIcon} onClick={() => stopSong()} />
             }
           <div onClick={() => console.log("Foo")} >
             BAA
           </div>
         </AudioControlSection>
     </Wrapper>
  )
}

const AudioControlSection = styled.div`
  background-color: orangered;
  
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ExitIcon = styled.img`
  filter: opacity(25%);
  backgroundColor: #5c5c5c;
  height: 35px;
  width: 35px;
  cursor: pointer;
`;

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
  height: 50px;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  background-color: #262626;
  border-top: 1px solid #232323;
`;
export default MusicPlayer;