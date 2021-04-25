import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled from "styled-components";
import TopDisplayContainer from '../../components/TopDisplayContainer'
import { NavLink } from "react-router-dom";
import isMobile from "../../utils/isMobile";
import BaseView from '../BaseView'
import {useAccountConsumer} from "../../contexts/Account";

const Farms = () => {
  const { account } = useAccountConsumer()
  let [balance, setBalance] = useState(0);


  if (balance === 0) {
    balance = null
  }

  return (
    <Switch>
      <BaseView>
        <CardContainer>
          <TopDisplayContainer />
          <HeaderText>
            404
                </HeaderText>
          <SubText>
            There's nothing here
                </SubText>
          <StyledLinkContainer>

            <StyledLink exact to="/">
              to home
                 </StyledLink>
          </StyledLinkContainer>
        </CardContainer>
      </BaseView>
    </Switch>
  );
};

const StyledLinkContainer = styled.div`
margin-top: 2vh;
height: 70px;
width: 1000px;
display: flex;
align-items: center;
justify-content: center;
`

const StyledLink = styled(NavLink)`
font-size: 30px;
font-stretch: normal;
font-style: normal;
line-height: 1;
text-decoration: none;
letter-spacing: normal;
display: flex;
align-items: center;
transition: all 0.2s ease-in-out;
color: white;
  text-transform: uppercase;
  border: 1px solid ${props => props.theme.color.red};
  position: relative;
  padding: 12px;
  width: fit-content;
          background-color: #181818;
&:hover {
          background-color: rgba(256,256,256,0.2);
    background-size: 12px, 100%;
    font-size: 32px;
  }
`

const SubText = !isMobile() ? styled.div`
font-size: 60px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
letter-spacing: normal;
text-align: center;
color: white;
` : styled.div`
font-size: 40px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
letter-spacing: normal;
text-align: center;
color: white;
`

const HeaderText = !isMobile() ? styled.div`
font-size: 200px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.07;
letter-spacing: normal;
text-align: center;
color: white;
margin-top: 14vh;
` : styled.div`
font-size: 160px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.07;
letter-spacing: normal;
text-align: center;
color: white;
margin-top: 12vh;
`

const BigLogoContainer = !isMobile() ? styled.div`
position: fixed;
height: 100vh;
left: -26vw;
display: flex;
align-items: center;
top: -10vh;
` : styled.div`
position: fixed;
height: 100vh;
left: -40vw;
display: flex;
align-items: center;
top: 20vh;
`

const BigLogo = !isMobile() ? styled.img`
width: 75vw;
opacity: 0.08;
` : styled.img`
width: 70vh;
opacity: 0.08;
transform: rotate(-5deg);
`

const BackgroundOverlay = !isMobile() ? styled.div`
position: fixed;
width: 100vw;
height: 100vh;
top: 0;
// background-image: linear-gradient(to right, #292929 50%, rgba(41, 41, 41, 0.97) 58%, rgba(41, 41, 41, 0.95) 66%, rgba(41, 41, 41, 0.85) 74%, rgba(41, 41, 41, 0.75) 82%, rgba(41, 41, 41, 0.6) 86%, rgba(41, 41, 41, 0.4) 90%, rgba(41, 41, 41, 0.2) 94%, rgba(52, 52, 52, 0) 100%);
background-image: linear-gradient(to right, #292929 40%, rgba(41, 41, 41, 0.97) 48%, rgba(41, 41, 41, 0.95) 56%, rgba(41, 41, 41, 0.8) 64%, rgba(41, 41, 41, 0.6) 72%, rgba(41, 41, 41, 0.4) 76%, rgba(41, 41, 41, 0.2) 80%, rgba(41, 41, 41, 0) 90%, rgba(52, 52, 52, 0) 100%);
` : styled.div`
position: fixed;
width: 100vw;
height: 100vh;
top: 0;
background-image: linear-gradient(55deg, #292929 30%, rgba(41, 41, 41, 0.97) 38%, rgba(41, 41, 41, 0.95) 46%, rgba(41, 41, 41, 0.8) 54%, rgba(41, 41, 41, 0.6) 62%, rgba(41, 41, 41, 0.4) 66%, rgba(41, 41, 41, 0.2) 70%, rgba(41, 41, 41, 0) 80%, rgba(52, 52, 52, 0) 100%);`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default Farms;
