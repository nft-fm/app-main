import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getBalanceOfVinyl,
  getAccountTotalStaked,
  getTotalEarned,
  getAvailable,
} from "../../web3/utils";
import { useAccountConsumer } from "../Account";
import axios from "axios";

export const StakingContext = createContext();

export const StakingProvider = ({ children }) => {
  const { account, user, getUser, currChainId } = useAccountConsumer();
  const [needToUpdateBalances, setNeedToUpdateBalances] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountTotalStaked, setAccountTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [artists, setArtists] = useState(null);

  let isOnBsc = (currChainId === 56 || currChainId === 97)

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
    var m = array.length,
      t,
      i;
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

  const orderArtists = (userInfo) => {
    console.log("orderingArtists!", userInfo);
    let totalArtists = artists;
    if (userInfo.stakedArtists.length === 0) {
      getArtists();
    } else {
      userInfo.stakedArtists.map((item) => {
        totalArtists.map((artist, index) => {
          if (item === artist.address) {
            totalArtists.splice(index, 1);
            artist.isUserStaked = true;

            totalArtists.unshift(artist);
          }
        });
      });
      console.log(totalArtists);
      setArtists(totalArtists);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user && user.stakedArtists.length > 0 && isOnBsc) {
      orderArtists(user);
      setUpdate(true);
    }
  }, [user, isOnBsc]);

  const [update, setUpdate] = useState(false);

  const updateOrder = async () => {
    await axios
      .post(`/api/user/get-account`, { address: account })
      .then((res) => {
        console.log("user", res);
        orderArtists(res.data);
        setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (account || needToUpdateBalances) {
      console.log("UPDATING BALANCES");
      isOnBsc && getBalances();
    }
  }, [account, needToUpdateBalances, isOnBsc]);

  return (
    <StakingContext.Provider
      value={{
        accountTotalStaked,
        setNeedToUpdateBalances,
        balance,
        totalEarned,
        totalAvailable,
        artists,
        updateOrder,
        update,
        setUpdate
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
