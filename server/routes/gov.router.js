const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')
const multer = require('multer');
const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");
const NftType = require('../schemas/NftType.schema');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL))

router.post('/suggestion', async (req, res) => {
  try {
    console.log("info", req.body.address, req.body.suggestion);
    let s = { address: req.body.address, suggestion: req.body.suggestion }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    if (req.body.address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }
    let user = await User.findOne({ address: req.body.address });
    // const alreadyMadeSuggestion = await Suggestion.findOne({
    //   timestamp: {
    //     $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000).toISOString()
    //   }, userId: user._id
    // });
    // if (alreadyMadeSuggestion) {
    //   res.status(403).send("You may only submit one suggestion per day.")
    //   return
    // }
    // let votes = new BigNumber(await contract.methods.balanceOf(req.body.address).call()).dividedBy(10 ** 18).toFixed(18)

    // if (parseFloat(votes) === 0) {
    //   res.status(403).send("You must have BDT or ETH-BDT-LP staked in order to submit a suggestion. Please stake BDT on the stake page.")
    //   return
    // }

    const newSuggestion =
      new Suggestion({ userId: user._id, message: req.body.suggestion })

    await newSuggestion.save();
    console.log("donesuggest", newSuggestion);
    res.send(newSuggestion);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!!");
  }
})

router.post('/get-suggestions', async (req, res) => {
  try {
    console.log("get suggestions!\naddress: ", req.body.address, "\npage: ", req.body.page, "\nsort: ", req.body.sort, "\n");
    const sort = req.body.sort === "new" ? { timestamp: -1 } : { totalVotes: -1 };
    let initialSuggestions = await Suggestion.find()
      .sort(sort)
      .skip(req.body.page * 5)
      .limit(5);

    let suggestions = [];
    for (let suggestion of initialSuggestions) {
      let user = await User.findOne({ _id: suggestion.userId });
      const { address, picture, pictureColor, nickname } = user;
      const { totalVotes, _id, userId, message, timestamp } = suggestion;
      let upDooted;
      let downDooted;
      const voteIndex = suggestion.votes.findIndex(vote => vote.address === req.body.address);
      if (voteIndex !== -1) {
        upDooted = suggestion.votes[voteIndex].amount > 0 ? true : false;
        downDooted = suggestion.votes[voteIndex].amount < 0 ? true : false;
      }
      // console.log("\n\n\nuser: ", user, suggestion)
      suggestions.push({ totalVotes, _id, userId, message, address, picture, pictureColor, nickname, upDooted, downDooted, timestamp })
    }
    let totalPages = await Suggestion.countDocuments() / 5;
    totalPages = Math.ceil(totalPages);
    // console.log("done: ", suggestions)
    res.send({ suggestions, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

const countVotes = (votes) => {
  let total = 0;
  for (let i = 0; i < votes.length; i++) {
    total += votes[i].amount;
  }
  return total;
}

router.post('/vote', async (req, res) => {
  try {
    let { voteAmount, suggestionId, address, sig } = req.body;
    let s = { address, suggestionId, voteAmount }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    if (req.body.address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }

    const user = await User.findOne({ address });
    let suggestion = await Suggestion.findOne({ _id: suggestionId });
    console.log("votesuggestion", suggestion);
    const voteIndex = suggestion.votes.findIndex(vote => vote.address === address);
    if (voteIndex !== -1) {
      suggestion.votes[voteIndex].amount = voteAmount;
      suggestion.votes[voteIndex].timestamp = new Date();
      suggestion.votes[voteIndex].sig = sig;
    } else {
      suggestion.votes.push({
        userId: user._id,
        amount: voteAmount,
        timestamp: new Date(),
        address: address,
        sig
      })
    }
    suggestion.totalVotes = countVotes(suggestion.votes);
    await suggestion.save();
    res.send(suggestion);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

module.exports = router
