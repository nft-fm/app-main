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
  const { account, user } = useAccountConsumer();

  const [nfts, setNfts] = useState([]);
  const [selectedNft, setSelectedNft] = useState();

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
    setSelectedNft(_nft);
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
      <Wrapper>
        {selectedNft &&
          <MusicPlayer nft={selectedNft} setNextNft={setNextNft} setPrevNft={setPrevNft} exitPlayer={() => { setSelectedNft(null) }} />
        }
      </Wrapper>
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
bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100vw;
    background-color: #262626;
`;