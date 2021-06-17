const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')
const multer = require('multer');
const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");
const NftType = require('../schemas/NftType.schema');
const Batch = require('../schemas/Batch.schema')
const Web3 = require('web3');
const { getBatchNumber, ADMIN_ACCOUNTS } = require('./constants.js')
// dispatch a different one for testnet?

const web3 = new Web3(new Web3.providers.HttpProvider(
  process.env.REACT_APP_IS_MAINNET ? 
  process.env.MAIN_PROVIDER_URL :
  process.env.RINKEBY_PROVIDER_URL)
)

router.get("/get-current-points/:id", async (req, res) => {
  try {
    const batch = await getBatchNumber()
    const suggestion = await Suggestion.find({ address: req.body.address, batch })

    res.send(suggestion.totalVotes ? suggestion.totalVotes: 0)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!!");
  }
})

router.post("/verify-admin", async (req, res) => {
  try {
    res.send(ADMIN_ACCOUNTS.includes(req.body.address))
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.post('/suggestion', async (req, res) => {
  try {
    console.log("info", req.body.address, req.body.suggestion);
    let { address, suggestion, sig } = req.body
    let s = { address, suggestion }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), sig);
    if (address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }
    const batch = await getBatchNumber()
    let user = await User.findOne({ address });
    const alreadyMadeSuggestion = await Suggestion.findOne({
      batch,
      userId: user._id
    });
    if (alreadyMadeSuggestion) {
      return res.status(403).send("You may only submit once per suggestion cycle.")
    }
    // let votes = new BigNumber(await contract.methods.balanceOf(req.body.address).call()).dividedBy(10 ** 18).toFixed(18)

    // if (parseFloat(votes) === 0) {
    //   return res.status(403).send("You must have BDT or ETH-BDT-LP staked in order to submit a suggestion. Please stake BDT on the stake page.")
    // }

    const newSuggestion = new Suggestion({ userId: user._id, message: suggestion, batch })

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
    const batch = await getBatchNumber()
    console.log(`batch number: ${batch}`)
    let initialSuggestions = await Suggestion.find({ batch })
      .sort(sort)
      .skip(req.body.page * 6)
      .limit(6);

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
    let totalPages = await Suggestion.countDocuments({ batch }) / 6;
    if (!totalPages) {

      totalPages = 1
    }
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

    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), sig);
    if (req.body.address !== signingAddress) {
      return res.status(401).send("signature mismatch");
    }

    const user = await User.findOne({ address });
    let suggestion = await Suggestion.findOne({ _id: suggestionId });
    console.log("votesuggestion", suggestion);
    const voteIndex = suggestion.votes.findIndex(vote => vote.address === address);
    if (voteIndex !== -1) {
      if (voteAmount === 0) suggestion.votes.filter(vote => vote.address !== address)
      suggestion.votes[voteIndex].amount = voteAmount;
      suggestion.votes[voteIndex].timestamp = new Date();
      suggestion.votes[voteIndex].sig = sig;
    } else if (voteAmount === 0 ) {
      console.log("Sorry cannot vote without vinyl!!")
      return res.status(401).send("You cannot vote without any $VINYL")
    }
    else {
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
