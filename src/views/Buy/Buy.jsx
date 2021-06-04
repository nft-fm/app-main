import React, { useEffect, useState } from "react";
import BaseView from "../../components/Page/BaseView";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";
import { useAccountConsumer } from "../../contexts/Account";
import loading from "../../assets/img/loading.gif";

import axios from 'axios';
const promise = loadStripe("pk_test_51IxwGtHFLNznhwF6XuUiGKMzuUHAncJsXET5Tmh71ofs9onBUGfAG2N3TylqsZ8zTdB0jkryxOGf5PDfi7rlhdJV00Wv16maq5");

const Buy = () => {
  const {account} = useAccountConsumer();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const prepareAccount = () => {
    axios.post('api/payment/register-account', {account: account} ,{ withCredentials: true })
    .then(res => {
      console.log(res.data);
      window.location.href = res.data.url;
    })
    .catch(err => {
      console.log(err);
    });
  }

  const verifyAccount = () => {
    console.log("HERE");
    axios.post('api/payment/verify-account', {account: account} ,{ withCredentials: true })
    .then(res => {
      console.log(res.data);
      if (res.data.charges_enabled) setIsValid(true);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (account)
      verifyAccount();
  }, [account])

  return (
    <BaseView>
      <Message>ARTIST PAYOUT REGISTRATION FLOW</Message>
      {isLoading ? <img src={loading}/> : isValid ?
        <Message> ---- Account is ready to receive payouts ----</Message> :
        <Button onClick={prepareAccount}>
        Prepare to receive money
      </Button>
      }
    </BaseView>
  );
};

const Message = styled.p`
  color: white;
`;
const Button = styled.button`
  padding-right: 10px;
  padding-left: 10px;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.xs};
  display: flex;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  color: white;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.red};
  height: 32px;
  border-radius: 20px;
  font-family: "Compita";
  /* margin-left: ${(props) => props.theme.spacing[3]}px; */
  &:hover {
    background-color: rgba(256, 256, 256, 0.2);
  }
  /* @media only screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: normal;
  } */
`;

export default Buy;
