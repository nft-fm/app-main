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
import Listen from './views/Listen'
import Profile from './views/Profile'
import Create from './views/Create/Create'
import isMobile from "./utils/isMobile";
import theme from './theme'
import Error404 from "./views/404";

if (window.location.hostname !== 'localhost')
  console.log = function () { };

const App = () => {
  return (
    <Providers>
      <StyledCanvas>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/listen" exact>
              <Listen />
            </Route>
            <Route path="/create" exact>
              <Create />
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
      <UseWalletProvider chainId={5} connectors={{
        walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      }}>
        <ModalsProvider>
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
