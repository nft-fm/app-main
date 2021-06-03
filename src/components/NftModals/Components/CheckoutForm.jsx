import React, { useEffect, useState } from "react";

import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from 'axios';
import styled from "styled-components";
const CheckoutForm = (props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "white",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#white"
        }
      },
      invalid: {
        color: "#fa423e",
        iconColor: "#fa423e"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
                                                                        payment_method: {
                                                                          card: elements.getElement(CardElement)
                                                                        }
                                                                      });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  useEffect(() => {
    if (props.price) {
      console.log("PRICE", props.price);
      const stripePrice = Math.floor(props.price * 100);
      console.log("clean price", stripePrice);
      axios.post('api/payment/create-payment-intent', {id: props.nftId, price: stripePrice}, { withCredentials: true })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(err => {
        console.log(err);
        setError(`Something happened getting your payment set up, please reload the page and try again`);
      });
    }
  }, [props.price]);

  return (
      <PayForm id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <Button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          {processing ? (
            <Spinner/>
          ) : (
            "Pay"
          )}
        </Button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <CardError role="alert">
            {error}
          </CardError>
        )}
        {/* Show a success message upon completion */}
        {succeeded &&
          <ResultMessage>
            Payment succeeded, see the result in your
            <a
              href={`https://dashboard.stripe.com/test/payments`}
            >
            {" "}
            Stripe dashboard.
            </a>
            Refresh the page to pay again.
          </ResultMessage>
        }
      </PayForm>
  );
};

const PayForm = styled.form`
  width: 100%;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;

  input {
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
  box-sizing: border-box;
}
`;

const ResultMessage = styled.div`
  line-height: 22px;
  font-size: 16px;

  a {
    color: ${props => props.theme.color.blue};
    font-weight: 600;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }
`

const CardError = styled.div`
  color: ${props => props.theme.color.red};
  font-size: 16px;
  line-height: 20px;
  margin-top: 12px;
  text-align: center;
`;

/* Buttons and links */
const Button = styled.button `
  width: 100%;
  height: 30px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.boxBorder};
  border-radius: 2px;
  background-color: ${(props) => props.theme.color.box};
  color: ${props => props.theme.color.white};
  &:hover {
    background-color: ${(props) => props.theme.color.boxBorder};
    border: 1px solid #383838;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
const Spinner = styled.div`
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  border-radius: 50%;

  &:before {
    position: absolute;
    content: "";
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  &:after {
    position: absolute;
    content: "";
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default CheckoutForm;
