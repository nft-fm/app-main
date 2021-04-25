import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Nav = () => {
  return (
    <StyledNav>
      <StyledLink exact tab="home" activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact tab="discover" activeClassName="active" to="/discover">Discover</StyledLink>
      <StyledLink exact tab="profile" activeClassName="active" to="/library">Library</StyledLink>
      <StyledLink exact tab="profile" activeClassName="active" to="/create">Create</StyledLink>
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
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 1px;
  padding-right: ${(props) => props.theme.spacing[5]}px;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  /* ${props => props.tab === "home" && css`color: ${props => props.theme.color.blue};`} */
  /* ${props => props.tab === "browse" && css`color: ${props => props.theme.color.yellow};`} */
  /* ${props => props.tab === "profile" && css`color: ${props => props.theme.color.green};`} */
  color: ${props => props.theme.color.lightgray};

  &:hover {
    filter: brightness(125%) saturate(125%);
  }
  &.active {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    color: white;
  }
  @media only screen and (max-width: 776px) {
    &:last-child{
      padding-right: 0px;
    }
  }
`;


const InactiveLink = styled.div`
  font-family: "Compita";
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
