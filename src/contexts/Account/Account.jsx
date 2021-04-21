import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { account, connect } = useWallet();
  const [user, setUser] = useState(null);
  const [currChainId, setCurrChainId] = useState(false);
  const [usdPerEth, setUsdPerEth] = useState(0);

  const fetchUsdPerEth = async () => {
    console.log("fetchinafioe");
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD"
      )
      .then((res) => setUsdPerEth(res.data.ethereum.usd));
  };

  const getUser = async () => {
    await axios.post(`api/user/get-account`,
      { address: account }).then(res => {
        setUser(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const initialize = () => {
    if (account) getUser();
  }

  const getChain = async () => {
    const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("new chain", Number(newChainId));
    setCurrChainId(Number(newChainId));
  }

  useEffect(() => {
    if (window.ethereum) {
      console.log("getting chain");
      getChain();
    }
    if (!usdPerEth) fetchUsdPerEth();
  }, [])

  useEffect(() => {
    // if (isMobile() && !window.ethereum) {
      Swal.fire("Mobile site only supported via MetaMask Browser")
      return;
    // }
    
    // if (window.ethereum) {
    //   window.ethereum.on('accountsChanged', (accounts) => {
    //     window.location.reload();
    //   });
    //   window.ethereum.on('chainChanged', (chainId) => {
    //     window.location.reload();
    //   });
    // }



    if (account && !user) initialize();
  }, [account, currChainId, user]);

  return (
    <AccountContext.Provider
      value={{
        account,
        connect,
        initialize,
        user, getUser, setUser,
        currChainId, setCurrChainId,
        usdPerEth
      }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountConsumer() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('no context')
  }

  return context;
}