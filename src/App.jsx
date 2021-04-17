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
import Listen from './views/Home'
import Profile from './views/Profile'
import Login from './views/Login/Login';
import Register from './views/Register';
import isMobile from "./utils/isMobile";
import theme from './theme'
import Error404 from "./views/404";
import {AccountProvider} from "./contexts/Account";
import {PlaylistProvider} from "./contexts/Playlist/Playlist";

if (window.location.hostname !== 'localhost')
  console.log = function () { };

const App = () => {
  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Listen />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
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
      <UseWalletProvider chainId={4} connectors={{
        walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      }}>
        <AccountProvider>
          <PlaylistProvider>
            <ModalsProvider>
              {children}
            </ModalsProvider>
          </PlaylistProvider>
        </AccountProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const StyledCanvas = !isMobile() ? styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
` : styled.div`
position: absolute;
width: 100%;
height: 100%;
background: white;
overflow-x: hidden;
`

export default App
