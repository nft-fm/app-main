import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useWallet } from "use-wallet";
import styled, { keyframes } from "styled-components";
import BaseView from "../BaseView";
import axios from "axios";
import NftCard from "../../components/NftCards/NftCard";
import logo from "../../assets/img/logos/logo.png";
import greenCheckMark from "../../assets/img/green_check.png";
import grayCheckMark from "../../assets/img/gray_check.png";
import Landing from "./Landing";
import NftModalHook from "../../components/NftModalHook/NftModalHook";

const Listen = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  const [subId, setSubId] = useState("");
  console.log("window", window.location.pathname.length, subId);

  const [nfts, setNfts] = useState([]);
  const getNfts = () => {
    axios.get("/api/nft-type/all").then((res) => setNfts(res.data));
  };

  useEffect(() => {
    getNfts();
    if (window.location.pathname.length > 10) {
      setSubId(window.location.pathname.slice(10));
    }
  }, []);

  const showNfts = nfts.map((nft) => {
    return <NftCard nft={nft} />;
  });

  return (
    <Switch>
      <BaseView>
        {subId && <NftModalHook id={subId}/>}
        <Landing />
        {/* <Divider /> */}
      </BaseView>
    </Switch>
  );
};

const Divider = styled.div`
  width: 80%;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.boxBorder};
  /* margin-bottom: 80px; */
`;

export default Listen;
