const express = require("express");
const router = express.Router();

const stripe = require('stripe');

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  try {
    const authorize = stripe(process.env.STRIPE_SECRET);

    const { items } = req.body;
    console.log("creating payment intent")
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await authorize.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
      console.log(err);
    res.status(500).send(err);
  }

});

module.exports = router;