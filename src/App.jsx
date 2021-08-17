import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";
import Cookies from "universal-cookie";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import styled from "styled-components";
import ModalsProvider from "./contexts/Modals";
import Listen from "./views/Home";
import Library from "./views/Library";
import Discover from "./views/Discover";
import Profile from "./views/Profile";
import Artist from "./views/Artist";
import Error404 from "./views/404";
import Community from "./views/VINYL/Community";
import Token from "./views/VINYL/Token";
import GovPolls from "./views/VINYL/GovPolls";
import RegisterArtist from "./views/RegisterArtist";
import RegisterArtistComplete from "./views/RegisterArtist/Complete";
import Info from "./views/Info";
import Redeem from "./views/Redeem";
import TermsOfService from "./views/FooterLinks/TermsOfService";
import PrivacyPolicy from "./views/FooterLinks/PrivacyPolicy";

import { AccountProvider, useAccountConsumer } from "./contexts/Account";
import { PlaylistProvider } from "./contexts/Playlist/Playlist";
import swal from "sweetalert2";

import preloadImage from "./utils/preloadImg";
import recordPlayer from "./assets/img/record_player.png";
import recordPlayerSpin from "./assets/img/record_player_spin.png";
import isMobile from "./utils/isMobile";
import theme from "./theme";
import { fetchJson } from "ethers/lib/utils";

if (window.location.hostname !== "localhost") console.log = function () {};

const cookies = new Cookies();

const Switches = () => {
  const location = useLocation();
  const { account , fetchIp, ip, user } = useAccountConsumer();

  useEffect(() => {
    async function trackPageView() {
      let myIp = ip ? ip : await fetchIp();
      console.log("fetching ip", myIp);
      axios.post(`/api/user/track-pageview`, {
        address: account,
        ip: myIp,
        page: location.pathname.substring(1)
      });
      console.log("new location", location);
    }
    trackPageView();
  }, [location]);

  const [ownsRedeemable, setOwnsRedeemable] = useState(false);
  console.log("ownsRedeemable", ownsRedeemable);
  const history = useHistory();

  useEffect(() => {
    //check if user owns a redeemable NFT
    if (
      user?.nfts.length > 0 &&
      window.location.pathname.slice(window.location.pathname.length - 7) !=
        "/redeem"
    ) {
      axios
        .post("/api/nft-type/checkRedeemable", user)
        .then((res) => {
          console.log(res);
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
        <Route path="/market">
          <Discover />
        </Route>
        <Route path="/community">
          <Community />
        </Route>
        <Route path="/token">
          <Token />
        </Route>
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
        <Route path="/">
          <Listen />
        </Route>
        <Route path="/*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
};

const App = () => {
  // const history = createBrowserHistory();
  // history.listen((location) => {
  //   ReactGA.set({ page: location.pathname });
  //   ReactGA.pageview(location.pathname);
  // });

  useEffect(() => {
    preloadImage(recordPlayer);
    preloadImage(recordPlayerSpin);
  }, []);

  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switches />
        </Router>
      </StyledCanvas>
    </Providers>
  );
};

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* change the ChainId below here for the preffered network when testing, 1 main 3 ropsten 42 kovan */}
      <UseWalletProvider
        chainId={process.env.REACT_APP_IS_MAINNET ? 1 : 4}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
        }}
      >
        <AccountProvider>
          <PlaylistProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </PlaylistProvider>
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
