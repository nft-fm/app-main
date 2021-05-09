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

  console.log("NFTS", nfts);
  const fetchPrevNext = async () => {
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const prevIndex = index == 0 ? nfts.length - 1 : index - 1;
    const nft = nfts[newIndex];
    if (!nft.buffer) {
      console.log("fetching");
      await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
      .then((songFile) => {
         let _nfts = [...nfts];
         _nfts[newIndex] = {..._nfts[newIndex],
                           buffer: songFile}
        setNfts(_nfts);
        console.log("nfts", nfts);
       }, (e) => { console.log("Error: ", e.err); })
    }
  }
  const fetchPrevBuffer = async () => {
    console.log("fetch prev buffer")
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    const nft = nfts[newIndex];
    if (!nft.buffer) {
      console.log("fetching");
      await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
      .then((songFile) => {
         let _nfts = [...nfts];
         _nfts[newIndex] = {..._nfts[newIndex],
                           buffer: songFile}
        setNfts(_nfts);
        console.log("nfts", nfts);
       }, (e) => { console.log("Error: ", e.err); })
    }
  }

  const fetchNextBuffer = async () => {
    console.log("fetch next buffer")
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    const nft = nfts[newIndex];
    if (!nft.buffer) {
      console.log("fetching");
      await axios.post("api/nft-type/getSong", { key: nft.address + "/" + nft.audioUrl.split('/').slice(-1)[0] })
      .then((songFile) => {
        let _nfts = [...nfts];
        _nfts[newIndex] = {..._nfts[newIndex],
                          buffer: songFile}
        setNfts(_nfts);
        console.log("nfts", nfts);
       }, (e) => { console.log("Error: ", e.err); })
    }
  }

  const setNextNft = () => {
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    setSelectedNft(nfts[newIndex]);
  }

  const setPrevNft = () => {
    let index = nfts.indexOf(selectedNft);
    if (!index) index = 0
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    setSelectedNft(nfts[newIndex]);
  }

  const setNftsCallback = (_nfts) => {
    setNfts(_nfts);
  }

  const setNftCallback = (_nft) => {
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
            nfts={nfts}
            setNftsCallback={setNftsCallback}
            setNextNft={setNextNft}
            setPrevNft={setPrevNft}
            exitPlayer={exitPlayer}
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