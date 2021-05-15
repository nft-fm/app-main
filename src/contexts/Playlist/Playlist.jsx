import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';
import { useAccountConsumer } from "../Account";
import styled from "styled-components";
import MusicPlayer from "../../components/MusicPlayer"

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { user } = useAccountConsumer();

  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBuffer, setCurrentBuffer] = useState();
  const [status, setStatus] = useState();
  const [index, setIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(true);

  const animTime = 0.45;

  const fetchPrevNext = async () => {
    if (!index || index < 0) setIndex(0)
    const prevIndex = index == 0 ? nfts.length - 1 : index - 1;
    const nextIndex = index == nfts.length - 1 ? 0 : index + 1;

    let _nfts = [...nfts];
    let next_nft = _nfts[nextIndex];
    let prev_nft = _nfts[prevIndex];
    if (next_nft && !next_nft.buffer) {
      console.log("fetching next")
      const next_song = await axios.post("api/nft-type/getSong", { key: next_nft.address + "/" + next_nft.audioUrl.split('/').slice(-1)[0] })
      _nfts[nextIndex] = {..._nfts[nextIndex],
                          buffer: next_song};
    }
    if (prev_nft && !prev_nft.buffer) {
      console.log("fetching prev")
      const prev_song = await axios.post("api/nft-type/getSong", { key: prev_nft.address + "/" + prev_nft.audioUrl.split('/').slice(-1)[0] })
      _nfts[prevIndex] = {..._nfts[prevIndex],
                          buffer: prev_song};
    }
    setNfts(_nfts);
  }

  const setNextNft = () => {
    if (index && !nfts[index].buffer) {
      let _nfts = [...nfts];
      _nfts[index] = {..._nfts[index],
                      buffer: currentBuffer};
      setNfts(_nfts);
    }
    if (!index || index < 0) setIndex(0);
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    console.log("nEW INDEX", newIndex)
    setSelectedNft(nfts[newIndex]);
    setIndex(newIndex);
  }

  const setPrevNft = () => {
    if (index && !nfts[index].buffer) {
      let _nfts = [...nfts];
      _nfts[index] = {..._nfts[index],
                      buffer: currentBuffer};
      setNfts(_nfts);
    }
    if (!index || index < 0) setIndex(0);
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    setSelectedNft(nfts[newIndex]);
    setIndex(newIndex);
  }

  const setNftsCallback = (_nfts) => {
    setNfts(_nfts);
  }

  const setNftCallback = (_nft) => {
    if (selectedNft) {
      setSelectedNft(false);
      const timer = setTimeout(() => {
        setSelectedNft(_nft);
        clearTimeout(timer);
      }, 10)
    }
    else if (_nft) {
      setSelectedNft(_nft);
      setIndex(nfts.indexOf(_nft));
      setIsOpen(true);
    }
  }

  const getNSeconds = (nft, sec) => {
    axios.post("/api/nft-type/getNSecondsOfSong", {key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0],
                                                   nft: nft })
        .then((res) => {
          const songFile = res.data.Body.data;
          
        })
  }
  const exitPlayer = () => {
    setIsOpen(false);
    const timer = setTimeout(() => {
      setSelectedNft(null)
      clearTimeout(timer);
    }, animTime * 1000)
  }

  useEffect(() => {
    
  }, [nfts]);

  useEffect(() => {
    setNfts([]);
    setSelectedNft();
  }, [user]);

  return (
    <PlaylistContext.Provider
      value={{
        setPrevNft, setNextNft,
        setNftsCallback, setNftCallback,
        setIsPreview
      }}>
      {children}
      {selectedNft &&
        <Wrapper animTime={animTime} isOpen={isOpen}>
          <MusicPlayer
            isPreview={isPreview}
            nft={selectedNft}
            setSelectedNft={setSelectedNft}
            nfts={nfts}
            setCurrentBuffer={setCurrentBuffer}
            setNftsCallback={setNftsCallback}
            setNextNft={setNextNft}
            setPrevNft={setPrevNft}
            exitPlayer={exitPlayer}
            fetchPrevNext={fetchPrevNext}
            setStatus={setStatus}
            status={status}/>
        </Wrapper>
      }
    </PlaylistContext.Provider>
  );
}

export function usePlaylistConsumer() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('no context')
  }

  return context;
}


const Wrapper = styled.div`
  position: -webkit-sticky; /* Safari */
  position: fixed;
  width: 100vw;
  bottom: 0;
  animation: ${({ isOpen, animTime }) => isOpen ? `onSetNft ${animTime}s forwards` : `onCloseNft ${animTime}s forwards`};
  @keyframes onSetNft {
    0% { bottom: -50px}
    100% {bottom: 0px}
  }
  @keyframes onCloseNft {
    0% { bottom: 0px}
    100% {bottom: -100px}
  }
  `;