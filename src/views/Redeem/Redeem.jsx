import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import BaseView from "../../components/Page/BaseView";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";

import RedeemForm from "./Components/RedeemForm";

const Redeem = () => {
  const { user, account } = useAccountConsumer();

  const [nft, setNft] = useState();
  useEffect(() => {
    if (window.location.pathname.length > 7) {
      console.log(window.location.pathname.slice(8));
      axios
        .post("/api/nft-type/get-one", {
          id: window.location.pathname.slice(8),
          address: account,
        })
        .then((res) => {
          console.log("res", res);
          setNft(res.data);
        });
    }
  }, []);

  return (
    <Switch>
      <BaseView>
        <RedeemForm />
      </BaseView>
    </Switch>
  );
};
export default Redeem;
