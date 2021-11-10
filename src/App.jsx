import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import styled from "styled-components";
import ModalsProvider from "./contexts/Modals";
import Staking from "./views/Staking";
import Listen from "./views/Home";
import Library from "./views/Library";
import Discover from "./views/Discover";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import Artist from "./views/Artist";
import Error404 from "./views/404";
import GovPolls from "./views/VINYL/GovPolls";
import RegisterArtist from "./views/RegisterArtist";
import RegisterArtistComplete from "./views/RegisterArtist/Complete";
import Info from "./views/Info";
import Redeem from "./views/Redeem";
import TermsOfService from "./views/FooterLinks/TermsOfService";
import PrivacyPolicy from "./views/FooterLinks/PrivacyPolicy";
import { AccountProvider, useAccountConsumer } from "./contexts/Account";
import { StakingProvider } from "./contexts/Staking";
import { PlaylistProvider } from "./contexts/Playlist/Playlist";
import swal from "sweetalert2";
import preloadImage from "./utils/preloadImg";
import recordPlayer from "./assets/img/record_player.png";
import recordPlayerSpin from "./assets/img/record_player_spin.png";
import saQiBanner from "./assets/img/homepage_assets/saqi_banner.png";
import saQiBannerMobile from "./assets/img/homepage_assets/saqi_banner_mobile.jpeg";
import NoEmailModal from "./GetEmailModal";
import PromoBanner from './PromoBanner'

import isMobile from "./utils/isMobile";
import theme from "./theme";

if (window.location.hostname !== "localhost") console.log = function () {};

const Switches = () => {
  const location = useLocation();
  const { account, user, noEmail } = useAccountConsumer();

  // const [artists, setArtists] = useState(null);
  // useEffect(() => {
  //   axios
  //     .post("/api/user/getArtists")
  //     .then((res) => setArtists(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    axios
      .post(`/api/user/track-pageview`, {
        hasMetamask: !!window.ethereum,
        address: account,
        page: location.pathname.substring(1),
      })
      .then((res) => {})
      .catch((err) => {});
  }, [location]);

  const [ownsRedeemable, setOwnsRedeemable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //check if user owns a redeemable NFT
    if (
      user?.nfts.length > 0 &&
      window.location.pathname.slice(window.location.pathname.length - 7) !==
        "/redeem"
    ) {
      axios
        .post("/api/nft-type/checkRedeemable", user)
        .then((res) => {
          if (res.status === 200 && !ownsRedeemable) {
            setOwnsRedeemable(true);

            for (let i = 0; i < res.data.redeemedBy.length; i++) {
              if (res.data.redeemedBy[i] === user.address) {
                return;
              }
            }

            swal
              .fire({
                title: "Redeem Merch!",
                text: "You own an NFT with redeemable merch! Click this button to go to the redemption portal",
                confirmButtonText: "Redeem!",
              })
              .then((res) => {
                if (res.isConfirmed) {
                  history.push("/redeem");
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <>
      <Switch>
        <Route path="/staking" exact>
          <Staking />
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Route path="/library" exact>
          <Library />
        </Route>
        <Route path="/redeem" exact>
          <Redeem />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/artist">
          <Artist />
        </Route>
        {/* <Route path="/community">
          <Community />
        </Route>
        {/* <Route path="/token">
          <Token />
        </Route> */}
        <Route path="/gov-polls">
          <GovPolls />
        </Route>
        <Route path="/termsofservice">
          <TermsOfService />
        </Route>
        <Route path="/privacypolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/register-artist">
          <RegisterArtist />
        </Route>
        <Route path="/register-artist-complete">
          <RegisterArtistComplete />
        </Route>
        <Route path="/info">
          <Info />
        </Route>
        <Route path="/home">
          <Listen />
        </Route>
        <Route path="/">
          <Discover />
        </Route>
        <Route path="/*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
};

const App = () => {

  console.log("window.location.href", window.location.href);

  if (window.location.href.includes("nftfm.io")) {
    window.location.replace("https://beta.fanfare.fm");
  }

  useEffect(() => {
    preloadImage(recordPlayer);
    preloadImage(recordPlayerSpin);
    preloadImage(saQiBanner);
    preloadImage(saQiBannerMobile);
  }, []);

  return (
    <Providers>
      <StyledCanvas>
        <PromoBanner />
        <Router>
          <Switches />
          {!isMobile() && <NoEmailModal/>}
        </Router>
      </StyledCanvas>
    </Providers>
  );
};

const Providers = ({ children }) => {
  const [currChainId, setCurrChainId] = useState(null);

  const getChain = async () => {
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    setCurrChainId(Number(newChainId));
    return Number(newChainId);
  };

  useEffect(() => {
    window.ethereum && getChain();
  }, [window.ethereum]);

  return (
    <ThemeProvider theme={theme}>
      {/* change the ChainId below here for the preffered network when testing, 1 main 3 ropsten 42 kovan */}
      <UseWalletProvider
        chainId={currChainId}
        // chainId={process.env.REACT_APP_IS_MAINNET ? 1 : 97}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
        }}
      >
        <AccountProvider>
          <StakingProvider>
            <PlaylistProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </PlaylistProvider>
          </StakingProvider>
        </AccountProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

const StyledCanvas = !isMobile()
  ? styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${(props) => props.theme.bgColor};
    `
  : styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${(props) => props.theme.bgColor};
      overflow-x: hidden;
    `;

export default App;
