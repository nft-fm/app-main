import React, { createContext, useContext, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import axios from "axios";
import {useMyNfts} from "../MyNfts";

const DuelsContext = createContext();

export const DuelsProvider = ({ children }) => {
  const { account, connect } = useWallet();

  const [user, setUser] = useState(null);

  const [battleHistory, setBattleHistory] = useState(false);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [error, setError] = useState(undefined);

  const getBattleHistory = async (start, limit) => {
    await axios.post(`api/battle/battleHistory`,
      { address: account,
             start: start,
             limit: limit}).then(res => {
                setBattleHistory(res.data);
              }).catch(err => {
                console.log(err);
              })
  }

  const getBattle = async () => {
    await axios.post(`api/battle/activeBattle`,
      { address: account }).then(res => {
      setInGame(res.data.activeBattle);
      setSelectedOpponent(res.data.opponent);
    }).catch(err => {
      console.log(err);
    })
  }

  const prepareDuel = (opponent, nft) => {
    setSelectedOpponent({...opponent,
                               nft
                              })
  }

  const getUser = async () => {
    await axios.post(`api/user/get-account`,
      { address: account }).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const getLeaderBoard = async () => {
    await axios.get('/api/user/battles-leaderboard')
               .then(res => {
                      setLeaderBoard(res.data)
                    })
              .catch(err => {
                setError(err);
              })
  }

  const getOpponents = async () => {
    console.log("getting opponents");
    await axios.post('/api/battle/opponents', {address: account})
                .then(res => {
                  setOpponents(res.data)
                })
                .catch(err => {
                  console.log("error")
                  setError(err);
                })
  }

  const initialize = async () => {
    await getUser();
    await getBattle(0, 4);
    await getOpponents();
    await getBattleHistory();
    await getLeaderBoard();

  }

  useEffect(() => {
    if (!user) {
      initialize();
    }
  }, [])
  return (
    <DuelsContext.Provider
      value={{
        initialize,
        leaderboard,
        opponents, setOpponents,
        user, getUser, setUser,
        battleHistory,
        selectedOpponent, setSelectedOpponent, prepareDuel,
        inGame, setInGame,
      }}>
      {children}
    </DuelsContext.Provider>
  );
}

export function useDuels() {
  const context = useContext(DuelsContext);

  if(!context){
    throw new Error('nao existe o context input')
  }

  return context;
}