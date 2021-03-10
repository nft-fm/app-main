import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Background from '../../assets/img/background.jpg'

import {DuelsProvider} from "../../contexts/Duels";
import {useWallet} from "use-wallet";
import NotConnected from "./NotConnected";
import Connected from "./Connected";
import {MyNftsProvider} from "../../contexts/MyNfts";
import preloadImage from "../../utils/preloadImg";

import DuelNoGlow from "../../assets/img/duels_page_assets/duel_neutral.png";
import DuelGlow from "../../assets/img/duels_page_assets/duel_lit.png";

const Duels = () => {
  const { account } = useWallet()

  return (
    <DuelsProvider>
            <StyledCanvas>
                <BackgroundSection />
                <ContentContainer>
                    {account ?
                      <MyNftsProvider>
                        <Connected />
                      </MyNftsProvider>
                    :
                      <NotConnected />
                    }
                </ContentContainer>
            </StyledCanvas>
    </DuelsProvider>

  );
};


const BackgroundSection = styled.div`
position: fixed;
width: 100vw;
height: 100vh;
background-image: url(${Background});
    opacity: .6;
top: 0;
background-repeat: no-repeat;
background-size: cover;
`

const StyledCanvas = styled.div`
  position: absolute;
  width: 100%;
  background-color: #154f9b;
`;
const ContentContainer = styled.div`
  letter-spacing: 2px;
  position: absolute;
  width: 100%;
  text-align: center;
`;

export default Duels;
