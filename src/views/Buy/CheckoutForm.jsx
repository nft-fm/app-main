import React, { useEffect, useState } from "react";

import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from 'axios';
import styled from "styled-components";
const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios.post('api/payment/create-payment-intent', { withCredentials: true })
        .then(res => {
          console.log("got it alright")
          console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.log(err);
          setError(`Payment failed ${err}`);
        });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
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
  return (
    <div>
      <PayForm id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        <Button
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          {processing ? (
            <div className="spinner" id="spinner"></div>
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
    </div>
  );
};

const PayForm = styled.form`
  width: 30vw;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
`;

const PayInput = styled.input`
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
  box-sizing: border-box;
`;

const ResultMessage = styled.div`
  line-height: 22px;
  font-size: 16px;

  a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }
`

const CardError = styled.div`
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  margin-top: 12px;
  text-align: center;
`;

const CardElementStyle = styled.div`
  border-radius: 4px 4px 0 0;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  width: 100%;
  background: white;
  box-sizing: border-box;
`;

const PaymentRequestButton = styled.div`
  margin-bottom: 32px;
`;  


/* Buttons and links */
const Button = styled.button `
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 0 0 4px 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;

  &:hover {
    filter: contrast(115%);
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
