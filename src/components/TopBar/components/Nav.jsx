import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
import moment from "moment"

export const Nav = () => {
  const { user } = useAccountConsumer();

  const { account } = useWallet();
  const [hasVinyl, setHasVinyl] = useState(false);
  const [isPresaleTime, setIsPresaleTime] = useState(false);
  console.log('ispresale', isPresaleTime)

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

  return (
    <StyledNav>
      <StyledLink exact tab="home" activeClassName="active" to="/">
        Home
      </StyledLink>
      {/* {isPresaleTime && ( */}
        <StyledLink
          exact
          tab="presale"
          activeClassName="active"
          to="/presale"
        >
          Presale
        </StyledLink>
      {/* )} */}
      {/* <StyledLink exact tab="discover" activeClassName="active" to="/discover">
        Discover
      </StyledLink> */}
      <StyledLink exact tab="library" activeClassName="active" to="/library">
        Library
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
    &:last-child {
      padding-right: 0px;
    }
  }
`;
