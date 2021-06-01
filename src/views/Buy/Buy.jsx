import React from "react";
import BaseView from "../../components/Page/BaseView";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_51IxOAgBbzxfPQyJfO8O2zOYGbsxRHjMzaAN1LgJw2X21fpzMZT25XrpzaaHuHXt4EGYXeLpDYrRprQfBBpavf1Ro00ygzKCphD");

const Buy = () => {
  return (
    <BaseView>
      <div style={{backgroundColor: "white", marginTop: "50px"}}>
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
    </BaseView>
  );
};

export default Buy;
