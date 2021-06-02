import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Swal from "sweetalert2";
import { FAQ } from "./Components/FAQ/FAQ";
import Tokenomics from "./Components/Tokenomics";
import Team from "./Components/Team";

const Info = () => {
  return (
    <Switch>
      <BaseView>
        <h1 style={{ color: "white" }}>About NFT FM</h1>
        <Tokenomics />
      <FAQ />
        <Team />
      </BaseView>
    </Switch>
  );
};

export default Info;
