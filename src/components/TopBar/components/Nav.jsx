import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
export const Nav = () => {
  const { user } = useAccountConsumer();

  const { account } = useWallet();
  const [hasVinyl, setHasVinyl] = useState(false);
  useEffect(() => {
    if (account) {
      getVinylBalance(
        (res) => Number(res.vinyl[0]) > 0 && setHasVinyl(res.vinyl[0])
      );
    }
  }, [account]);

  // const presaleTime = 1622134800000;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (moment().isAfter(presaleTime)) {
  //       setIsPresaleTime(true);
  //     }
  //   }, 600);
  //   return () => clearInterval(interval);
  // }, []);

  console.log('user', user)

  return (
    <StyledNav>
      <StyledLink exact tab="home" activeClassName="active" to="/">
        Home
      </StyledLink>
      {/* <StyledLink exact tab="discover" activeClassName="active" to="/discover">
        Discover
      </StyledLink> */}
      <StyledLink exact tab="library" activeClassName="active" to="/library">
        Library
      </StyledLink>
      <StyledLink exact tab="about" activeClassName="active" to="/info">
        Info
      </StyledLink>
      {hasVinyl && (
        <StyledLink
          exact
          tab="community"
          activeClassName="active"
          to="/community"
        >
          Community
        </StyledLink>
      )}
      {user?.isArtist && (
        <StyledLink exact tab="profile" activeClassName="active" to="/profile">
          Profile
        </StyledLink>
      )}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: "Compita";
  @media only screen and (max-width: 776px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
    & > * {
      padding-top: 10px;
      width: calc(100vw / 4);
    }
  }
`;

const StyledLink = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 1px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  color: ${(props) => props.theme.color.lightgray};

  &:hover {
    filter: brightness(125%) saturate(125%);
  }
  &.active {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    color: white;
  }
  @media only screen and (max-width: 776px) {
    padding-right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* &:last-child {
      padding-right: 0px;
    } */
  }
`;
