import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";

export const Nav = () => {
  const { user } = useAccountConsumer();

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
      <StyledLink exact tab="about" activeClassName="active" to="/staking">
        Stake
      </StyledLink>
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
  }
`;
