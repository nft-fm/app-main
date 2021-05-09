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
  const [nextBuffer, setNextBuffer] = useState();
  const [prevBuffer, setPrevBuffer] = useState();
  const [status, setStatus] = useState();

  const animTime = 0.45;

  const fetchPrevBuffer = () => {
    console.log("fetching prev buffer")
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    const nft = nfts[newIndex];
    axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
         .then((songFile) => {
            let _nfts = [...nfts];
            _nfts[newIndex] = {..._nfts[newIndex],
                               buffer: songFile}
          }, (e) => { console.log("Error: ", e.err); })
  }

  const fetchNextBuffer = () => {
    console.log("fetching next buffer");
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    const nft = nfts[newIndex];
    axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
         .then((_songFile) => {
            setNextBuffer(_songFile);  
          }, (e) => { console.log("Error: ", e.err); })
  }

  const setNextNft = () => {
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    setPrevBuffer(currentBuffer);
    setSelectedNft(nfts[newIndex]);
    setStatus("NEXT");
  }

  const setPrevNft = () => {
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    setNextBuffer(currentBuffer);
    setSelectedNft(nfts[newIndex]);
    setStatus("PREV");
  }

  const setNftsCallback = (_nfts) => {
    setNfts(_nfts);
  }

  const setNftCallback = (_nft) => {
    setNextBuffer();
    setPrevBuffer();
    setStatus();
    setSelectedNft(_nft);
    if (_nft)
      setIsOpen(true);
  }

  const exitPlayer = () => {
    setIsOpen(false);
    const timer = setTimeout(() => {
      setSelectedNft(null)
      clearTimeout(timer);
    }, animTime * 1000)
  }

  useEffect(() => {
    setNfts([]);
    setSelectedNft();
  }, [user]);

  return (
    <PlaylistContext.Provider
      value={{
        setPrevNft, setNextNft,
        setNftsCallback, setNftCallback
      }}>
      {children}
      {selectedNft &&
        <Wrapper animTime={animTime} isOpen={isOpen}>
          <MusicPlayer
            nft={selectedNft}
            setNextNft={setNextNft}
            setPrevNft={setPrevNft}
            exitPlayer={exitPlayer}
            setCurrentBuffer={setCurrentBuffer}
            prevBuffer={prevBuffer}
            setPrevBuffer={setPrevBuffer}
            nextBuffer={nextBuffer}
            setNextBuffer={setNextBuffer}
            fetchNextBuffer={fetchNextBuffer}
            fetchPrevBuffer={fetchPrevBuffer}
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