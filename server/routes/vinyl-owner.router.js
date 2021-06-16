const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')
const multer = require('multer');
const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");
const VinylOwners = require('../schemas/VinylOwners.schema');
const Batch = require("../schemas/Batch.schema");

const cron = require("node-cron");

const Web3 = require('web3');
const { getVinylOwners, getVinylBalance } = require("../web3/server-utils");
const { getBatchNumber } = require('./constants.js')


const checkVinylOwners = async () => {
  try {
    const users = await User.find()
    let owners = await getVinylOwners(users.map(user => user.address))
    let newOwners = new VinylOwners({ owners: owners.filter(user => user.amount > 0) })
    await newOwners.save()
    let ownersMap = new Map()
    newOwners.owners.map(user => ownersMap.set(user.address, user.amount))
    return ownersMap
  } catch (error) {
    throw error
  }
}

/* these routes are for admins and testing purposes only */
router.get('/get-one/:id', async (req, res) => {
  try {
      let owner = await getVinylBalance(req.params.id)

      if (!owner || !owner[0]) return res.status(400).send("no owner ?!?")
      res.send(owner[0])
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
})

// router.get('/get-all', async (req, res) => {
//   try {
//     let owners = await checkVinylOwners()
//     res.send(owners)
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("server error");
//   }
// })

// console.log("🔥🔥🤠🤠🦆🤠🤠🔥🔥 \n", owners)

// router.get('/update-all', async (req, res) => {
//   try {
//     const owners = await checkVinylOwners()
//     console.log(owners)
//     const batch = await getBatchNumber()
//     const suggestions = await Suggestion.find({ batch })
//     suggestions.forEach( suggestion => {
//       let newTotal = 0;
//       let newVotes = [];
//       suggestion.votes.forEach( ({userId, address, timestamp, sig}) => {
//         const newAmount = owners.get(address)
//         if (newAmount) {
//           newTotal += newAmount
//           newVotes.push({ userId, address, amount: newAmount, timestamp, sig,  })
//         }
//       })
//       suggestion.totalVotes = newTotal
//       suggestion.votes = newVotes
//     })
//     for (const suggestion of suggestions) await suggestion.save()
//     res.send(suggestions)
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("server error");
//   }
// })

cron.schedule("0 0 0 1 * *", async () => {
// cron.schedule('* * * * *', async () => {
  try {
    console.log("* * *  m o n t h l y   b a t c h   c r o n  * * *")
    let batch = await Batch.find().sort({ batchId: -1 }).limit(1);

    const batchId = batch[0] ? batch[0].batchId + 1 : 1
    const newBatch = new Batch({ batchId, startTime: Date.now() })
    await newBatch.save()
    console.log("batchId:", batchId)
  } catch (error) {
    console.log(error);
  }
});


cron.schedule("0 0 0 * * *", async () => {
// cron.schedule('* * * * *', async () => { testing every minute
  try {
    console.log("* * *  d a i l y   v i n y l   c r o n  * * *")
    const owners = await checkVinylOwners()
    console.log(owners)
    const batch = await getBatchNumber()
    const suggestions = await Suggestion.find({ batch })
    suggestions.forEach( suggestion => {
      let newTotal = 0;
      let newVotes = [];
      suggestion.votes.forEach( ({userId, address, timestamp, sig}) => {
        const newAmount = owners.get(address)
        if (newAmount) {
          newTotal += newAmount
          newVotes.push({ userId, address, amount: newAmount, timestamp, sig,  })
        }
      })
      suggestion.totalVotes = newTotal
      suggestion.votes = newVotes
    })
    for (const suggestion of suggestions) await suggestion.save()
    console.log("Successfully updated suggestions!")
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
