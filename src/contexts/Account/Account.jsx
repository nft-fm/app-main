import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from 'sweetalert2';
import styled from "styled-components";

const AccountContext = createContext();

const NoChainModal = ({ }) => {
  return (
    <OpaqueFilter>
      <Container>
        <StyledModal>
          <h1>MetaMask not detected. Please go to <a target="_blank"
            rel="noopener noreferrer" href="https://metamask.io/">MetaMask's site</a> and install the application before proceeding.</h1>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

const WrongChainModal = ({ }) => {
  return (
    <OpaqueFilter>
      <Container>
        <StyledModal>
          <h1>You are on the wrong chain. Go to your Metamask wallet and select Rinkeby Test Network to interact with the site.</h1>
        </StyledModal>
      </Container>
    </OpaqueFilter>
  );
};

export const AccountProvider = ({ children }) => {
  const { account, connect } = useWallet();
  const [user, setUser] = useState(null);
  const [currChainId, setCurrChainId] = useState(false);
  const [usdPerEth, setUsdPerEth] = useState(0);
  const [oneSecToLoadMetaMask, setOneSecToLoadMetaMask] = useState(false);

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
    if (!oneSecToLoadMetaMask) {
      setTimeout(() => {
        setOneSecToLoadMetaMask(true);
      }, 100);
    }
  }, [])

  useEffect(() => {
    if (isMobile() && !window.ethereum) {
      Swal.fire("Mobile site only supported via MetaMask Browser")
      return;
    }

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        window.location.reload();
      });
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }

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
      {oneSecToLoadMetaMask && !currChainId && <NoChainModal />}
      {currChainId && currChainId != 4 && <WrongChainModal />}
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


const OpaqueFilter = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 500;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 340px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModal = styled.div`
  border-radius: 8px;
  border: solid 2px #181818;
  width: calc(100% - 60px);
  height: 100%;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  color: white;
  text-align: center;
`;