import React from "react";
import BaseView from "../../components/Page/BaseView";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Buy = () => {
  return (
    <BaseView>
      <div style={{backgroundColor: "white"}}>
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
    </BaseView>
  );
};

export default Buy;
