import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';
import {useAccountConsumer} from "../Account";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { account, user } = useAccountConsumer();
  const [allTracks, setAllTracks] = useState([]);
  const [currTrackIndex, setCurrTrackIndex] = useState(0);
  const [pause, setPause] = useState(true);

  const prevTrack = () => setCurrTrackIndex(currTrackIndex - 1);
  const nextTrack = () => setCurrTrackIndex(currTrackIndex + 1);

  const initialize = async () => {
    if (account && user) {
      //FETCH ALL USER NFTS OR GET FROM MYNFTS CONTEXT
      const fakeTracksList = ["https://youtu.be/2XEmFuEbpzM", "https://youtu.be/9s9qxz8dXuA", "https://youtu.be/NNfzIgFsXEA"]
      setAllTracks(fakeTracksList);
    }
  }

  useEffect(() => {
    if (account && user && !allTracks[0]) initialize();
  }, [account]);

  return (
    <PlaylistContext.Provider
      value={{
        initialize,
        pause, setPause,
        prevTrack, nextTrack
      }}>
      {children}
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