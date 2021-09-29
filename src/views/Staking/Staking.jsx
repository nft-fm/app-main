import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import { useWallet } from "use-wallet";
import StakingHolder from "./Components/StakingHolder";
import axios from "axios";
import { useAccountConsumer } from "../../contexts/Account";

const Staking = ({ artists }) => {
  const { account } = useAccountConsumer();



  return <BaseView>{artists && <StakingHolder artists={artists} />}</BaseView>;
};

const PageContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default Staking;
