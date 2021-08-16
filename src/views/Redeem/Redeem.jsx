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
  const [alreadyRedeemed, setAlreadyRedeemed] = useState(false)
  const [ownsRedeemable, setOwnsRedeemable] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    //check if user owns a redeemable NFT
    if (user?.nfts.length > 0) {
      axios
        .post("/api/nft-type/checkRedeemable", user)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            
            for (let i = 0; i < res.data.redeemedBy.length; i++) {
              if (res.data.redeemedBy[i] === user.address) {
                setAlreadyRedeemed(true)
                return;
              }
            }
            
            setOwnsRedeemable(true)};
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <Switch>
      {!ownsRedeemable && !alreadyRedeemed && <FourOhFour />}
      <BaseView>
        {alreadyRedeemed && <div style={{color: 'white'}}>You have already submitted your information</div>}
        {ownsRedeemable && !formSubmitted && <RedeemForm setFormSubmitted={setFormSubmitted} />}
        {formSubmitted && <div style={{color: 'white'}}>YAY YOU SUBMITTED YOUR ADDRESSSSSSS</div>}
      </BaseView>
    </Switch>
  );
};
export default Redeem;
