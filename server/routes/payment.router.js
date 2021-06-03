const express = require("express");
const router = express.Router();

const stripe = require('stripe');

router.post("/register-account", async (req, res) => {
  try {
    console.log("im here");
    const user = await User.findOne({address: req.body.account});

    if (user && user.isArtist) {
      const authorize = stripe(process.env.STRIPE_SECRET);
      let account;
    
      if (user.stripeAccount) {
        console.log("not finished account");
        account = user.stripeAccount
      } else {
        console.log("new account");
        account = await authorize.accounts.create({
          type: 'express',
          business_type: 'individual',
          email: "test2@nftfm.com",
          capabilities: {
            transfers: {
              requested: true
          }}
        });
        account = account.id

        await User.updateOne({address: req.body.account}, {stripeAccount: account})
                  .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                  })
      }

      console.log(account);

      const accountLinks = await authorize.accountLinks.create({
        account: account,
        refresh_url: process.env.URL + '/buy',
        return_url: process.env.URL + '/buy',
        type: 'account_onboarding',
      });
  
      console.log(accountLinks);
      res.json(accountLinks);
    } else {
      console.log("no user or not artist")
      res.status(500).send("No user or user is not artist");
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

router.post("/verify-account", async (req, res) => {
  try {
    const authorize = stripe(process.env.STRIPE_SECRET);
    const user = await User.findOne({address: req.body.account});
    
    if (user && user.stripeAccount) {
      const account = await authorize.accounts.retrieve(user.stripeAccount);
      console.log(account);
      res.json({charges_enabled: account.charges_enabled});
    }
    else {
      console.log("User doesnt have stripe account");
      res.status(500).send("User needs to be registered");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})


const calculateFeeAmount = (price) => {
  const fee = 5;
  return Math.floor(price * fee / 100); 
}

router.post("/create-payment-intent", async (req, res) => {
  try {
    console.log("Creating payment intent", req.body);
    let nft = await NftType.findOne({ _id: req.body.id });
    if (!nft) {
      res.status(500).send("No NFT found");
      return;
    }
    if (nft.numSold >= nft.numMinted) {
      res.status(500).send("Out of Stock");
      return;
    }

    console.log("found nft", nft)

    // Get artist's stripe account
    const artist = await User.findOne({address: nft.address});

    console.log("found artist", artist);
    if (artist && artist.stripeAccount) {
      const authorize = stripe(process.env.STRIPE_SECRET);
      // Get artist's stripe account and check If its chargable
      // If we have a variable in the schema there's no need to do that
      const stripeAccount = await authorize.accounts.retrieve(artist.stripeAccount);
      if (stripeAccount.charges_enabled) {
        console.log("creating payment intent", req.body.price)
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await authorize.paymentIntents.create({
          amount: req.body.price,
          currency: "usd",
          application_fee_amount: calculateFeeAmount(req.body.price),
          transfer_data: {
            destination: artist.stripeAccount,
          },
        });
        res.json({
          clientSecret: paymentIntent.client_secret
        });
      } else {
        console.log("ARTIST CAN'T RECEIVE PAYMENTS");
        res.status(500).send("Artist can't receive payments");
      }
    } else {
      console.log("ARTIST DOESN'T HAVE PAYMENT METHOD");
      res.status(500).send("Artist doesn't have payment method");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

});

module.exports = router;