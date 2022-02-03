import React from "react";
import { Switch } from "react-router-dom";
import BaseView from "../../components/Page/BaseView";
import Market from "./Components/Market";
import styled from "styled-components";
import LinkedNftModal from "../../components/NftModalHook/LinkedNftModal";

const Listen = () => {
  return (
    <Switch>
      <BaseView>
        <LinkedNftModal />
        <Container>
          <LearnMoreLink target="_blank"
            rel="noopener noreferrer" href={`https://fanfare.fm/?s=beta&c=email_signup`}>
            Check out the full site!
          </LearnMoreLink>
          <Market />
        </Container>
      </BaseView>
    </Switch>
  );
};

const LearnMoreLink = styled.a`
margin-top: 100px;
margin-bottom: 50px;
text-decoration: underline;
    color: rgb(240, 240, 240);
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    margin-top: 10px;
`


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* height: calc(100vh - ${(props) => props.theme.topBarSize}px + 1px); */
  width: 100%;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 30px 0 60px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  color: white;
  @media only screen and (max-width: 776px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export default Listen;
