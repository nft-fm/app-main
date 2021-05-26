import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAccountConsumer } from "../Account";
import styled from "styled-components";
import MusicPlayer from "../../components/MusicPlayer"
import axios from 'axios'
const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { user, account } = useAccountConsumer();

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
    //setSelectedNft(nfts[newIndex]);
    //setIndex(newIndex);
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
    //setSelectedNft(nfts[newIndex]);
    //setIndex(newIndex);
  }

  const setNftsCallback = (_nfts) => {
    console.log("set nfts callback")
    setNfts(_nfts);
  }

  const setNftCallback = (_nft) => {
    console.log("setting nft callback")
    if (selectedNft) {
      console.log("set with selecting");
      setSelectedNft(false);
      const timer = setTimeout(() => {
        console.log("timer out");
        setSelectedNft(_nft);
        setIndex(nfts.indexOf(_nft));
        clearTimeout(timer);
      }, 10)
    }
    else if (_nft) {
      console.log("set not selected");
      setSelectedNft(_nft);
      setIndex(nfts.indexOf(_nft));
      setIsOpen(true);
    }
  }

  const exitPlayer = () => {
    console.log("exit player");
    setIsOpen(false);
    const timer = setTimeout(() => {
      console.log("exit player time out")
      setSelectedNft(null)
      clearTimeout(timer);
    }, animTime * 1000)
  }

  useEffect(() => {
    console.log("selected nft changed", selectedNft);
  }, [selectedNft])
  useEffect(() => {  
    setNfts([]);
    setSelectedNft();
  }, [account]);

  return (
    <PlaylistContext.Provider
      value={{
        setPrevNft, setNextNft,
        setNftsCallback, setNftCallback,
        setIsPreview, isOpen
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

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 120px;
  background-color: ${(props) => props.theme.bgColor};
`;



const Wrapper = styled.div`
  position: -webkit-sticky; /* Safari */
  position: fixed;
  width: 100vw;
  bottom: 0;
  animation: ${({ isOpen, animTime }) => isOpen ? `onSetNft ${animTime}s forwards` : `onCloseNft ${animTime}s forwards`};
  
  bottom: ${(props) => props.isOpen ? '120px': '0px'};
  @keyframes onSetNft {
    0% { bottom: -50px}
    100% {bottom: 0px}
  }
  @keyframes onCloseNft {
    0% { bottom: 0px}
    100% {bottom: -100px}
  }
  `;