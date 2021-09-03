import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";
import { useWallet } from "use-wallet";
import { getVinylBalance } from "../../../web3/utils";
import { ReactComponent as IconDown } from "../../../assets/img/icons/down_arrow.svg";
import DiscoDoge from "../../../assets/img/logos/PNG_icon1.png";

export const Nav = () => {
  const { user, currChainId } = useAccountConsumer();
  const { account } = useWallet();
  const [hasVinyl, setHasVinyl] = useState(false);
  useEffect(() => {
    if (account && (currChainId === 1 || currChainId === 4)) {
      getVinylBalance(
        (res) => Number(res.vinyl[0]) > 0 && setHasVinyl(res.vinyl[0])
      );
    }
  }, [account]);

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
      <StyledHRef href="https://www.discodoge.io" target="_blank">
        <Disco src={DiscoDoge} alt="Disco Doge" />
      </StyledHRef>
      {user?.isArtist && (
        <StyledLink exact tab="profile" activeClassName="active" to="/profile">
          Profile
        </StyledLink>
      )}
      {/* <ChainSelector /> */}
    </StyledNav>
  );
};
const Disco = styled.img`
  width: 45px;
  aspect-ratio: 1;
`;

const DownArrow = styled(IconDown)`
  /* margin-top: 1px; */
  width: 10px;
  height: 10px;
  & path {
    transition: all 0.2s ease-in-out;
    fill: ${(props) => props.theme.color.lightgray};
  }
`;

const DropdownLinks = styled.div`
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

const StyledDropdownLink = styled(NavLink)`
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

const StyledHRef = styled.a`
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
