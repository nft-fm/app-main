const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')

const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");


router.post('/get-account', async (req, res) => {
  try {
    console.log("get-account hit",req.body)
    let user = await User.findOne({ address: req.body.address });
    if (!user) {
      user = new User({
        address: req.body.address,
      })
      await user.save();
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/update-account', async (req, res) => {
  try {
    const pictureColor = req.body.pictureColor ? req.body.pictureColor : "#002450";
    let s = { address: req.body.address, nickname: req.body.nickname, picture: req.body.picture, pictureColor }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    if (req.body.address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }
    let user = await User.findOneAndUpdate({ address: req.body.address },
      { nickname: req.body.nickname, picture: req.body.picture, pictureColor });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
})

module.exports = router
