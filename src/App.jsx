import React, { useCallback, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import styled from 'styled-components'
import ModalsProvider from './contexts/Modals'
import Home from './views/Home'
import Profile from './views/Profile'
import Stake from './views/Stake'
// import NFT from './views/NFT'
import isMobile from "./utils/isMobile";
import theme from './theme'
import { createGlobalStyle } from 'styled-components';
import GilroyBold from "./assets/fonts/Gilroy-Bold.otf";
import GilroyMed from "./assets/fonts/Gilroy-Medium.otf";
import SFMono from "./assets/fonts/SFMonoSemibold.woff";
import Edo from "./assets/fonts/edo.ttf"
import Bangers from "./assets/fonts/Bangers-Regular.ttf"
import ComicBook from "./assets/fonts/ComicBook-j49l.ttf"
import ReactGA from 'react-ga';
import Error404 from "./views/404";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'SF Mono Semibold';
  font-style: normal;
  font-weight: normal;
  src: local('SF Mono Semibold'), url(${SFMono}) format('woff');
  }

@font-face {
  font-family: "Gilroy";
  src: local(Gilroy-Bold), url(${GilroyBold}) format("opentype");
  font-style: normal;
}

@font-face {
  font-family: "GilroyMedium";
  src: local(Gilroy-Med), url(${GilroyMed}) format("opentype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Edo";
  src: local(Edo), url(${Edo}) format("opentype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Bangers";
  src: local(Bangers), url(${Bangers}) format("truetype");
  font-weight: normal;
  font-style: normal;
  letter-spacing: 2px;

  @font-face {
    font-family: "Comic Book";
    src: local(ComicBook), url(${ComicBook}) format("truetype");
    font-weight: normal;
    font-style: normal;
    letter-spacing: 2px;
}`;

if (window.location.hostname !== 'localhost')
  console.log = function () { };

const App = () => {

  const trackingId = "G-DRVS5C20MX";
  ReactGA.initialize(trackingId);

  // if (isMobile()) {
  //   return (
  //     <Providers>
  //       <StyledCanvas>
  //         <Router>
  //           <Switch>
  //             <Redirect exact from="/" to="/home" />
  //             <Route path="/home" exact>
  //               <Home />
  //             </Route>
  //             <Route path="/stake" exact>
  //             <Stake />
  //           </Route>
  //           </Switch>
  //         </Router>
  //       </StyledCanvas>
  //     </Providers>
  //   );
  // }
  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" exact>
              <Home />
            </Route>
            {/* <Route path="/nfts" exact>
              <NFT />
            </Route> */}
            <Route path="/stake" exact>
              <Stake />
            </Route>
            {/* <Route path="/duels" exact>
              <Duels />
            </Route> */}
            {/* <Route path="/profile" exact>
              <Profile />
            </Route> */}
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Router>
      </StyledCanvas>
    </Providers>
  )
}

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/* change the ChainId below here for the preffered network when testing, 1 main 3 ropsten 42 kovan */}
      <UseWalletProvider chainId={1} connectors={{
        walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      }}>
        <ModalsProvider>
          <GlobalStyle />
          {children}
        </ModalsProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const StyledCanvas = !isMobile() ? styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #011B3A;
` : styled.div`
position: absolute;
width: 100%;
height: 100%;
background: #011B3A;
overflow-x: hidden;
`

export default App
