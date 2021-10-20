import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import TopDisplayContainer from "../../components/TopDisplayContainer";
import { NavLink } from "react-router-dom";
import isMobile from "../../utils/isMobile";
import BaseView from "../../components/Page/BaseView";

const FourOhFour = () => {
  return (
    <Switch>
      <BaseView>
        <CardContainer>
          <TopDisplayContainer />
          <HeaderText>404</HeaderText>
          <SubText>There's nothing here</SubText>
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
`;

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
  border: 1px solid ${(props) => props.theme.color.red};
  border-radius: ${props => props.theme.borderRadius}px;
  position: relative;
  padding: 12px;
  width: fit-content;
  background-color: #181818;
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
    background-size: 12px, 100%;
    font-size: 32px;
  }
`;

const SubText = !isMobile()
  ? styled.div`
      font-size: 60px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: white;
    `
  : styled.div`
      font-size: 40px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      text-align: center;
      color: white;
    `;

const HeaderText = !isMobile()
  ? styled.div`
      font-size: 200px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      color: white;
      margin-top: 14vh;
    `
  : styled.div`
      font-size: 160px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.07;
      letter-spacing: normal;
      text-align: center;
      color: white;
      margin-top: 12vh;
    `;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default FourOhFour;
