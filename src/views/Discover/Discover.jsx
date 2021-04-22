import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import BaseView from "../BaseView";
import Trending from "./Trending";
import Market from "./Market";
import styled, { keyframes } from "styled-components";

const Listen = () => {
  return (
    <Switch>
      <BaseView>
        <Container>

          <StyledTitle>
            MARKETPLACE
        </StyledTitle>
          <Trending />
          <Market />
        </Container>
      </BaseView>
    </Switch>
  );
};


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
/* height: calc(100vh - ${props => props.theme.topBarSize}px + 1px); */
width: 100%;
color: white;
  font-size: ${props => props.theme.fontSizes.xs};
`

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${props => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  color: white;
`;

export default Listen;
