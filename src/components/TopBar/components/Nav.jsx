import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/listen">Listen</StyledLink>
      <StyledLink exact activeClassName="active" to="/create">Create</StyledLink>
      <StyledLink exact activeClassName="active" to="/profile">Profile</StyledLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const InactiveLink = styled.div`
  font-family: "Bangers";
  font-size: 20px;
  user-select: none;
  line-height: 1;
  letter-spacing: 0.5px;
  color: #7e2ce3;
  opacity: 0.3;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #ffcb46;
  }
  &.active {
    text-decoration: underline;
    color: white;
  }
`;

const StyledLink = styled(NavLink)`
  font-family: "Bangers";
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.5px;
  color: #7e2ce3;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #a365ef;
  }
  &.active {
    text-decoration: underline;
    color: white;
  }
`;
