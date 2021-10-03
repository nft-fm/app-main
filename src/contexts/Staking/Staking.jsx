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

  const getArtists = () => {
    axios
      .post("/api/user/getArtists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  };
  const formatArtists = () => {
    let totalArtists = artists;
    user.stakedArtists.map((item) => {
      totalArtists.map((artist, index) => {
        if (item === artist.address) {
          totalArtists.splice(index, 1);
          totalArtists.unshift(artist);
        }
      });
    });
    setArtists(totalArtists);
  };
  useEffect(() => {
    getArtists();
  }, []);
  useEffect(() => {
    if (user && user.stakedArtists.length > 0) {
      formatArtists();
      console.log('1', artists)
    }
  }, [user]);
  // console.log('0', artists)

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
