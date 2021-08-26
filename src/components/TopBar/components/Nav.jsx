import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
import { ReactComponent as IconDown } from "../../../assets/img/icons/down_arrow.svg";
import ChainSelector from "./ChainSelector";

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

  const noPropagation = (e) => e.stopPropagation();

  const [open, setOpen] = useState(false);

  return (
    <StyledNav>
      <StyledLink exact tab="market" activeClassName="active" to="/market">
        Market
      </StyledLink>
      <StyledLink exact tab="library" activeClassName="active" to="/library">
        Library
      </StyledLink>
      <StyledLink exact tab="about" activeClassName="active" to="/info">
        Info
      </StyledLink>
      <StyledDropDownLink
        exact
        tab="about"
        activeClassName="active"
        to="/token"
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        VINYL <DownArrow />
        <DropDown style={open ? { display: "flex" } : { display: "none" }}>
          <Spacer />
          <DropDownLinks>
            <StyledA
              onClick={noPropagation}
              style={{ paddingRight: "0" }}
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xc17b6c92bb728259ca2f76c88a4a48ac077587f7&use=V2"
            >
              Buy
            </StyledA>
            <StyledLink
              style={{ paddingRight: "0" }}
              exact
              tab="token"
              activeClassName="active"
              to="/token"
            >
              Token
            </StyledLink>
            <StyledLink
              style={{ paddingRight: "0" }}
              exact
              tab="community"
              activeClassName="active"
              to="/community"
            >
              Community
            </StyledLink>
          </DropDownLinks>
        </DropDown>
      </StyledDropDownLink>
      <MobileCommunityLink
        exact
        tab="token"
        activeClassName="active"
        to="/token"
      >
        Token
      </MobileCommunityLink>
      <MobileCommunityLink
        exact
        tab="community"
        activeClassName="active"
        to="/community"
      >
        Community
      </MobileCommunityLink>
      {user?.isArtist && (
        <StyledLink exact tab="profile" activeClassName="active" to="/profile">
          Profile
        </StyledLink>
      )}
      {/* <ChainSelector /> */}
    </StyledNav>
  );
};

const DownArrow = styled(IconDown)`
  /* margin-top: 1px; */
  width: 10px;
  height: 10px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.lightgray};
  }
`;

const DropDownLinks = styled.div`
  height: 105px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: #121212; */
  background-color: rgb(18, 18, 18, 0.2);
  border-bottom: 1px solid #232323;
  border-left: 1px solid #232323;
  border-right: 1px solid #232323;
  padding: 0 10px;
`;

const Spacer = styled.div`
  height: 21px;
`;

const StyledDropDownLink = styled(NavLink)`
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
    display: none;
  }
`;

const DropDown = styled.div`
  height: 155px;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: -20px;
`;

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
const MobileCommunityLink = styled(NavLink)`
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
  @media only screen and (min-width: 776px) {
    display: none;
    /* &:last-child {
    padding-right: 0px;
  } */
  }
`;

const StyledA = styled.a`
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
