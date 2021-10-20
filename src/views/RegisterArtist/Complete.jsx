import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import TopDisplayContainer from "../../components/TopDisplayContainer";
import BaseView from "../../components/Page/BaseView";

const RegisterArtist = () => {
  return (
    <Switch>
      <BaseView>
        <CardContainer>
          <TopDisplayContainer />
          <StyledTitle>Thank You For Your Application</StyledTitle>
          <Content>We will review and get back to you shortly</Content>
        </CardContainer>
      </BaseView>
    </Switch>
  );
};
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  padding-top: 0px;
  color: white;
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  text-align: center;
  color: white;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default RegisterArtist;
