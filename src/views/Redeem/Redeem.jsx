import React, { useState, useEffect, useRef } from "react";
import { Switch, NavLink } from "react-router-dom";
import BaseView from "../../components/Page/BaseView";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import axios from "axios";

import RedeemForm from "./Components/RedeemForm";

const Redeem = () => {
  const { user, account } = useAccountConsumer();
  const [ownsRedeemable, setOwnsRedeemable] = useState(false);

  useEffect(() => {
    //check if user owns a redeemable NFT
    if (user?.nfts.length > 0) {
      axios
        .post("/api/nft-type/checkRedeemable", user.nfts)
        .then((res) => res.status === 200 && setOwnsRedeemable(true));
    }
  }, [user]);

  return (
    <Switch>
      <BaseView>
        {!ownsRedeemable ? (
          <div style={{ color: "white" }}>
            You need to own this NFT to redeem the merchendise!
          </div>
        ) : (
          <RedeemForm />
        )}
      </BaseView>
    </Switch>
  );
};
export default Redeem;
