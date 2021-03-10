const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')

const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");
const NftType = require("../schemas/NftType.schema");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/a768678405854cf584ae620be7844cc3'))
const abi = require('../modules/BATTLEPool.json')
const contract = new web3.eth.Contract(abi.abi, '0xa9CDb5e3C911884Ca6D4b32273c219B536Ee9e6A')
const Battle = require('../schemas/Battle.schema')

router.post('/opponents', async (req, res) => {
  try {
    console.log("getting opponents")
    const loggedUser = await User.findOne( {address: req.body.address})
    const users = await User.find( { address: {$ne: req.body.address},
                                          xp: loggedUser.xp},
                                {'_id': false});

    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/new', async (req, res) => {
  try {
    const { contractAddress, picture, rarity, stats, numMinted, signature } = req.body;

    const newNftType = new NftType({ contractAddress, picture, rarity, stats })
    await newNftType.save();
    for (let i = 0; i < numMinted; i++) {
      // create new NFT for each num minted. associate with nft address
    }

    // res.send(newNftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/update', async (req, res) => {
  try {
    const { nftId, contractAddress, picture, rarity, stats, numMinted } = req.body;

    let nftType = NftType.findOne({ _id: nftId });
    if (picture) nftType.picture = picture;
    if (rarity) nftType.rarity = rarity;
    if (stats) nftType.stats = stats;
    await nftType.save();

    //go through each num minted and alter their individual base stats
    for (let i = 0; i < numMinted; i++) {
    }

    // res.send(newNftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.get('/', async (req, res) => {
  try {
    let nftType = NftType.findOne({ _id: req.body.nftId });
    res.send(nftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.get('/all', async (req, res) => {
  try {
    let nftTypes = NftType.find();
    res.send(nftTypes);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

module.exports = router
