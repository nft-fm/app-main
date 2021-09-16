import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import styled from "styled-components";
import BaseView from "../../components/Page/BaseView";
import { useWallet } from "use-wallet";
import CarouselHolder from "./Components/Carousel";
import axios from "axios";

const Staking = ({ artists }) => {
  return <BaseView>{artists && <CarouselHolder artists={artists} />}</BaseView>;
};

const PageContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 100%;
`;

export default Staking;
