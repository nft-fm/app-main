import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import Landing from "./Components/Landing";
import Swal from "sweetalert2"
import Roadmap from "./Components/Roadmap";
import { Features } from "./Components/Features"

const Listen = () => {
  if (window.location.hostname === "localhost" && process.env.REACT_APP_IS_MAINNET) {
    Swal.fire({
      title: `You are on MAINNET and LOCALHOST be careful`,
      text: `🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆`,
      icon: "error",
    });
  }

  return (
    <Switch>
      <BaseView>
        <Landing />
        <Divider />
        <Features />
        <Divider />
        <Roadmap />
      </BaseView>
    </Switch>
  );
};

const Divider = styled.div`
  width: 80%;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.boxBorder};
  margin-bottom: 80px;
  @media only screen and (max-width: 776px) {
    display: none;
  }
`;

export default Listen;
