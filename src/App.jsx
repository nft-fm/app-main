import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import styled from "styled-components";
import ModalsProvider from "./contexts/Modals";
import Listen from "./views/Home";
import Library from "./views/Library";
// import Discover from "./views/Discover";
import Profile from "./views/Profile";
import Artist from "./views/Artist";
import Community from "./views/Community"
import Error404 from "./views/404";

import Info from "./views/Info";
import TermsOfService from "./views/FooterLinks/TermsOfService"
import PrivacyPolicy from "./views/FooterLinks/PrivacyPolicy"

import { AccountProvider } from "./contexts/Account";
import { PlaylistProvider } from "./contexts/Playlist/Playlist";

import preloadImage from "./utils/preloadImg";
import recordPlayer from "./assets/img/record_player.png";
import recordPlayerSpin from "./assets/img/record_player_spin.png";
import isMobile from "./utils/isMobile";
import theme from "./theme";

if (window.location.hostname !== "localhost") console.log = function () {};

const App = () => {
  useEffect(() => {
    preloadImage(recordPlayer);
    preloadImage(recordPlayerSpin);
  }, []);

  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switch>
            <Route path="/library" exact>
              <Library />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/artist">
              <Artist />
            </Route>
            {/* <Route path="/presale">
              <TokenSale />
            </Route> */}
            {/* <Route path="/discover">
              <Discover />
            </Route> */}
            <Route path="/community">
              <Community />
            </Route>
            <Route path="/termsofservice">
              <TermsOfService />
            </Route>
            <Route path="/privacypolicy">
              <PrivacyPolicy />
            </Route>
            <Route path="/info" >
              <Info />
            </Route>
            <Route path="/" >
              <Listen />
            </Route>
            <Route path="/*">
              <Error404 />
            </Route>
          </Switch>
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
        chainId={ process.env.REACT_APP_IS_MAINNET ? 1 : 4}
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
