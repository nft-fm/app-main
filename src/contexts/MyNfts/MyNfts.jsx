import React, { createContext, useContext, useEffect, useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import { getMyNFTs } from "../../web3/utils";

const NftsContext = createContext();

export const MyNftsProvider = ({ children }) => {
  const { account, connect } = useWallet();
  const [user, setUser] = useState(false);
  const [myNfts, setMyNfts] = useState([]);
  const [activeNft, setActiveNft] = useState(false);
  const [hasNfts, setHasNfts] = useState(true);

  const [battleHistory, setBattleHistory] = useState([]);
  const [battlePage, setBattlePage] = useState(0);
  const [battleLoading, setBattleLoading] = useState(true);
  const [battleAllLoaded, setBattleAllLoaded] = useState(false);

  const getNextBattlePage = async () => {
    setBattlePage(battlePage + 1);
  }

  const getBattleHistory = async (battlePage, limit) => {
    setBattleLoading(true);
    await axios.post(`api/battle/battleHistory`,
      {
        address: account,
        page: battlePage,
        limit: limit
      }).then(res => {
        console.log("GOT BATTLE HISTORY", res.data)
        setBattleHistory([...battleHistory, ...res.data]);
        if (res.data.length < limit) {
          setBattleAllLoaded(true);
        }
        setBattleLoading(false);
      }).catch(err => {
        console.log(err);
      })
  }

  const getActiveNft = (user, nfts) => {
    if (user.activeNFT) {
      const active = nfts.find(nft => nft.nftId === user.activeNFT);

      if (active)
        setActiveNft(active);
    }
  }

  const getUser = async (nfts) => {
    await axios.post(`api/user/get-account`,
      { address: account }).then(res => {
        getActiveNft(res.data, nfts);
        setUser(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const fetchNfts = async (nftIds) => {
    let nfts = [];
    for (const nftId of nftIds) {
      const nftData = await axios.post('/api/nft/get-one', {
        nftId
      }).then(res => {
        return res.data;
      })
      nfts.push(nftData);
    }
    getUser(nfts);
    setMyNfts(nfts);
  }

  // useEffect(() => {
  //   if (account) {
  //     getMyNFTs(res => {
  //       res = res.map(nft => {
  //         return nft.map(s => s.toNumber())
  //       })
  //       if (!res[0].length) {
  //         setHasNfts(false);
  //       } else {
  //         fetchNfts(res[0]);
  //       }
  //     })
  //     getBattleHistory(battlePage, 4);
  //   }
  // }, [account, battlePage])

  return (
    <NftsContext.Provider
      value={{
        myNfts,
        hasNfts,
        activeNft, setActiveNft,
        battleHistory,
        getNextBattlePage,
        battleLoading,
        battleAllLoaded,
      }}>
      {children}
    </NftsContext.Provider>
  );
}

export function useMyNfts() {
  const context = useContext(NftsContext);

  if (!context) {
    throw new Error('nao existe o context input')
  }

  return context;
}
