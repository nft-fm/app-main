import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getBalanceOfVinyl,
  getAccountTotalStaked,
  getTotalEarned,
  getAvailable
} from "../../web3/utils";
import { useAccountConsumer } from "../Account";

const StakingContext = createContext();

export const StakingProvider = ({ children }) => {
  const { account } = useAccountConsumer();
  const [needToUpdateBalances, setNeedToUpdateBalances] = useState(false);
  const [balance, setBalance] = useState(0);
  const [accountTotalStaked, setAccountTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0)

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
        setTotalAvailable(res.available)
    })
    setNeedToUpdateBalances(false)
  };

  useEffect(() => {
    if (account || needToUpdateBalances) {
        console.log('UPDATING BALANCES')
        getBalances()
    }
  }, [account, needToUpdateBalances])

  return (
    <StakingContext.Provider
      value={{
        accountTotalStaked,
        setNeedToUpdateBalances,
        balance,
        totalEarned,
        totalAvailable,
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
