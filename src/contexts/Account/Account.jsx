import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import axios from "axios";
import isMobile from "../../utils/isMobile";
import Swal from "sweetalert2";

const AccountContext = createContext();

// const NoChainModal = ({ }) => {
//   return (
//     <OpaqueFilter>
//       <Container>
//         <StyledModal>
//           <h2>MetaMask not detected. Please go to <a target="_blank"
//             rel="noopener noreferrer" href="https://metamask.io/">MetaMask's site</a> and install the application before proceeding.</h2>
//         </StyledModal>
//       </Container>
//     </OpaqueFilter>
//   );
// };

// const WrongChainModal = ({ }) => {
//   return (
//     <OpaqueFilter>
//       <Container>
//         <StyledModal>
//           <h2>You are on the wrong chain. Go to your Metamask wallet and select Rinkeby Test Network to interact with the site.  <a target="_blank"
//             rel="noopener noreferrer" href="https://nft-fm.medium.com/nft-fm-private-beta-10be433c90de">Click me for more detailed instructions.</a></h2>
//         </StyledModal>
//       </Container>
//     </OpaqueFilter>
//   );
// };

export const AccountProvider = ({ children }) => {
  const { account, connect } = useWallet();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currChainId, setCurrChainId] = useState(false);
  const [usdPerEth, setUsdPerEth] = useState(0);
  const [usdPerBnb, setUsdPerBnb] = useState(0);
  const [oneSecToLoadMetaMask, setOneSecToLoadMetaMask] = useState(false);
  const [noEmail, setNoEmail] = useState(false);

  const fetchUsdPerEthandBsc = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD"
      )
      .then((res) => setUsdPerEth(res.data.ethereum.usd));
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=USD"
      )
      .then((res) => setUsdPerBnb(res.data.binancecoin.usd));
  };

  const getUser = async () => {
    await axios
      .post(`/api/user/get-account`, { address: account })
      .then((res) => {
        console.log("HERE DA USER", res.data);
        if (!res.data.email) {
          setNoEmail(true);
        }
        setUser(res.data);
        axios
          .post(`/api/gov/verify-admin`, { address: account })
          .then((res) => {
            setIsAdmin(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialize = () => {
    if (account) getUser();
  };

  const getChain = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    setCurrChainId(Number(newChainId));
  };

  useEffect(() => {
    if (window.ethereum) {
      getChain();
    }
  }, [window.ethereum]);

  useEffect(() => {
    if (window.ethereum) {
      getChain();
    }
    fetchUsdPerEthandBsc();
    if (!oneSecToLoadMetaMask) {
      setTimeout(() => {
        setOneSecToLoadMetaMask(true);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isMobile() && !window.ethereum) {
      Swal.fire("Mobile site only supported via MetaMask Browser");
      return;
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    }

    if (account && !user) initialize();
  }, [account, currChainId, user]);

  return (
    <AccountContext.Provider
      value={{
        isAdmin,
        account,
        connect,
        initialize,
        user,
        getUser,
        setUser,
        currChainId,
        setCurrChainId,
        usdPerEth,
        usdPerBnb,
        noEmail,
      }}
    >
      {/* {oneSecToLoadMetaMask && !currChainId && <NoChainModal />}
      {currChainId && currChainId != 4 && <WrongChainModal />} */}
      {children}
    </AccountContext.Provider>
  );
};

export function useAccountConsumer() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("no context");
  }

  return context;
}
