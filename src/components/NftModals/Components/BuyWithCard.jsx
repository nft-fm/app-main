import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";
import { useAccountConsumer } from "../../../contexts/Account";

import axios from 'axios';
const promise = loadStripe("pk_test_51IxwGtHFLNznhwF6XuUiGKMzuUHAncJsXET5Tmh71ofs9onBUGfAG2N3TylqsZ8zTdB0jkryxOGf5PDfi7rlhdJV00Wv16maq5");

const BuyWithCard = ({nftId, price}) => {
  return (   
    <Elements stripe={promise}>
      <CheckoutForm nftId={nftId} price={price}/>
    </Elements>
  );
};

export default BuyWithCard;
