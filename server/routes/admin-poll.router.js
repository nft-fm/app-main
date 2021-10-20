const express = require('express')
const router = express.Router()
const User = require('../schemas/User.schema')
const AdminPoll = require("../schemas/AdminPoll.schema");
const PollOption = require("../schemas/PollOption.schema");
const { ADMIN_ACCOUNTS } = require("./constants")
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL))

router.post('/add-poll', async (req, res) => {
  try {
    let { address, question, sig, options, endTime } = req.body
    const prevPoll = await AdminPoll.find().sort({ pollId : -1 }).limit(1);
    const pollId = prevPoll[0] ? prevPoll[0].pollId + 1 : 1;
    let s = { address, question, endTime, options }

    // console.log("poll?", req.body);

    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), sig);

    if (!signingAddress === address || !ADMIN_ACCOUNTS.includes(address)) {
      return res.status(403).send(`User is not authenticated ${signingAddress} ${address}`);
    }

    let parsedOptions = []

    for (const option of options) {
      let newPollOption = new PollOption({
        pollId,
        message: option,
        votes: [],
        timestamp: Date.now(),
      })
      await newPollOption.save()
      parsedOptions.push(newPollOption._id)
    }

    const newPoll = new AdminPoll({ pollId, question, options: parsedOptions, timestamp: Date.now(), endTime })

    await newPoll.save();
    res.send(newPoll);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!!");
  }
})

/* route to get all polls... probably won't be using this any time soon */

// router.post('/all-polls', async (req, res) => {
//   try {
//     const allPolls = await AdminPoll.find()

//     res.send(allPolls);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Server Error!!!");
//   }
// })

const countVotes = (votes) => {
  let total = 0;
  votes.forEach(vote => total += vote.amount)
  return total;
}

router.post('/current', async (req, res) => {
  try {
    const { address } = req.body
    let now = new Date().toISOString()

    const mostRecent = await AdminPoll.find({
      endTime: { $gte: now },
    }).sort({ pollId : -1 }).limit(1);

    if (!mostRecent) return res.status(400).send("There are no polls available 1")

    const { pollId, question, timestamp, endTime } = mostRecent[0]

    const alreadyVoted = await PollOption.find({
      pollId,
      votes: { $elemMatch: { address } }
    })

    // if (alreadyVoted.length !== 0) return res.status(400).send("There are no polls available 2")

    const options = await PollOption.find({
      pollId
    })

    res.send({ pollId, question, options, timestamp, endTime, alreadyVoted: !!alreadyVoted.length});
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error!!!");
  }
})

// router.post('/current', async (req, res) => {
//   try {
//     const { address } = req.body
//     let today = new Date().toISOString()

//     const votedOptions = await PollOption.find({
//       votes: { $elemMatch: { address } }
//     })

//     let alreadyVotedPolls = votedOptions.map(option => option.pollId)

//     const currentPolls = await AdminPoll.find({
//       endTime: { $gte: today },
//       pollId: { $nin: [...alreadyVotedPolls] }
//     }).sort({endTime: 1 })

//     const cleanedPollData = []

//     for (const poll of currentPolls) {
//       const { pollId, question, timestamp, endTime } = poll
//       const voteOptions = await PollOption.find({ pollId })

//       let newOptions = voteOptions.map(option => {
//         return { id: option._id, message: option.message }
//       })

//       cleanedPollData.push({
//         pollId,
//         question,
//         options: newOptions,
//         timestamp,
//         endTime, 
//       })
//     }

//     res.send(cleanedPollData);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Server Error!!!");
//   }
// })

router.post('/vote', async (req, res) => {
  try {
    let { voteAmount, optionId, address, sig } = req.body;
    let s = { address, optionId, voteAmount }

    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), sig);
    if (req.body.address !== signingAddress) {
      return res.status(401).send("signature mismatch");
    }

    if (!voteAmount) return res.status(400).send("You do not have any $VINYL to vote with")
    if (!optionId || !address) {
      return res.status(401).send("Something went wrong")
    } 
    const user = await User.findOne({ address })
    let option = await PollOption.findOne({ _id: optionId })

    if (option.votes.find(vote => vote.address === address)) return res.status(401).send("You have already voted")

    let alreadyVoted = await PollOption.find({
      pollId: option.pollId,
      votes: { $elemMatch: { address } }
    })

    if (alreadyVoted.length > 0) {
      return res.status(401).send("You have already already voted")
    }

    option.votes.push({
      userId: user._id,
      amount: voteAmount,
      timestamp: new Date(),
      address,
    })

    option.totalVotes = countVotes(option.votes)

    await option.save();
    res.send(option);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

module.exports = router