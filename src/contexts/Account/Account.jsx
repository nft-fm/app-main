import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const { account } = useWallet();
  const [user, setUser] = useState(null);
  const [currChainId, setCurrChainId] = useState(false);

  const getUser = async () => {
    await axios.post(`api/user/get-account`,
      { address: account }).then(res => {
        setUser(res.data);
      }).catch(err => {
        console.log(err);
      })
  }

  const initialize = async () => {
    if (account) await getUser();
  }

  const getChain = async () => {
    const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("new chain", Number(newChainId));
    setCurrChainId(Number(newChainId));
  }

  useEffect(() => {
    if (window.ethereum) {
      getChain();
    }
  }, [])

  useEffect(() => {
    if (isMobile() && !window.ethereum) {
      Swal.fire("Mobile staking is only supported via MetaMask Browser. All other aspects of the site are Browser only.")
      return;
    } else if (!window.ethereum) {
      Swal.fire("Metamask is required for interacting with this site.");
      return;
    }

    window.ethereum.on('accountsChanged', (accounts) => {
      window.location.reload();
    });
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    if (account && !user) initialize();
  }, [account, currChainId]);

  return (
    <AccountContext.Provider
      value={{
        account,
        initialize,
        user, getUser, setUser,
        currChainId, setCurrChainId
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