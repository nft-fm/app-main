import React, { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import BaseView from "../../components/Page/BaseView";
import Market from "./Components/Market";
import styled from "styled-components";
import NftModalHook from "../../components/NftModalHook";

const Listen = () => {
  const [id, setId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (window.location.pathname.length > 10) {
      setId(window.location.pathname.slice(10));
    }
  });

  const hide = (e) => {
    setIsOpen(false);
    console.log("isOpen", isOpen);
  };

  return (
    <Switch>
      <BaseView>
        {/*  pathname && nftmocdalhook */}
        {id && <NftModalHook hide={hide} id={id} open={isOpen} />}
        <Container>
          <StyledTitle>MARKETPLACE</StyledTitle>
          {/* <Trending /> */}
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
  /* height: calc(100vh - ${(props) => props.theme.topBarSize}px + 1px); */
  width: 100%;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.xs};
`;

const StyledTitle = styled.div`
  font-family: "Compita";
  font-size: ${(props) => props.theme.fontSizes.md};
  margin: 60px 0 40px 0;
  font-weight: 600;
  /* letter-spacing: 3px; */
  color: white;
`;

export default Listen;
