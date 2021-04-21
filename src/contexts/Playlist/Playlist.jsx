import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';
import { useAccountConsumer } from "../Account";
import styled from "styled-components";
import MusicPlayer from "../../components/MusicPlayer"
import Slide from "react-reveal/Slide"


const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { account, user } = useAccountConsumer();

  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();
  const [nftIsSelected, setNftIsSelected] = useState(false);

  const setNextNft = () => {
    const index = nfts.indexOf(selectedNft);
    const newIndex = index == nfts.length - 1 ? 0 : index + 1;
    setSelectedNft(nfts[newIndex]);
  }

  const setPrevNft = () => {
    const index = nfts.indexOf(selectedNft);
    const newIndex = index == 0 ? nfts.length - 1 : index - 1;
    setSelectedNft(nfts[newIndex]);
  }

  const setNftsCallback = (_nfts) => {
    setNfts(_nfts);
  }

  const setNftCallback = (_nft) => {
    console.log("hello", _nft);
    setSelectedNft(_nft);
    if (_nft)
      setNftIsSelected(true);
    else
      setNftIsSelected(false);
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
      {/* {selectedNft && */}
      {/* <Slide bottom={true} duration={1000} when={nftIsSelected}> */}
      {selectedNft &&
        <Wrapper>
          <MusicPlayer nft={selectedNft}
            setNextNft={setNextNft}
            setPrevNft={setPrevNft}
            exitPlayer={() => { setSelectedNft(null) }} />
        </Wrapper>
      }
      {/* </Slide> */}
      {/* // } */}
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
  animation: onSetNft 1.25s forwards;
  @keyframes onSetNft {
    0% { bottom: -50px}
    100% {bottom: 0px}
  }
  `;