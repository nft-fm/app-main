import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getBalanceOfVinyl,
  getAccountTotalStaked,
  getTotalEarned,
  getAvailable,
} from "../../web3/utils";
import { useAccountConsumer } from "../Account";
import axios from "axios";

const StakingContext = createContext();

export const StakingProvider = ({ children }) => {
  const { account, user } = useAccountConsumer();
  const [needToUpdateBalances, setNeedToUpdateBalances] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountTotalStaked, setAccountTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [artists, setArtists] = useState(null);
  const getBalances = () => {
    getBalanceOfVinyl((res) => {
      setBalance(res.balance);
    });
    getAccountTotalStaked((res) => {
      setAccountTotalStaked(res.totalStaked);
    });
    getTotalEarned(account, (res) => {
      setTotalEarned(res.totalEarned);
    });
    getAvailable((res) => {
      setTotalAvailable(res.available);
    });
    setNeedToUpdateBalances(false);
  };

  function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  const getArtists = () => {
    axios
      .post("/api/user/getArtists")
      .then((res) => {
        setArtists(shuffle(res.data));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    if (account || needToUpdateBalances) {
      console.log("UPDATING BALANCES");
      getBalances();
    }
  }, [account, needToUpdateBalances]);

  return (
    <StakingContext.Provider
      value={{
        accountTotalStaked,
        setNeedToUpdateBalances,
        balance,
        totalEarned,
        totalAvailable,
        artists,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export function useStakingConsumer() {
  const context = useContext(StakingContext);
  if (!context) {
    throw new Error("no context");
  }

  return context;
}
