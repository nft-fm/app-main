import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import BaseView from "../../components/Page/BaseView";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";
import FourOhFour from "../../views/404";

import RedeemForm from "./Components/RedeemForm";

const Redeem = () => {
  const { user, account } = useAccountConsumer();
  const [ownsRedeemable, setOwnsRedeemable] = useState(false);

  useEffect(() => {
    //check if user owns a redeemable NFT
    if (user?.nfts.length > 0) {
      axios
        .post("/api/nft-type/checkRedeemable", user)
        .then((res) => {
          console.log(res);
          res.status === 200 && setOwnsRedeemable(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <Switch>
      {!ownsRedeemable && <FourOhFour />}
      <BaseView>{ownsRedeemable && <RedeemForm />}</BaseView>
    </Switch>
  );
};
export default Redeem;
