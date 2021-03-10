const express = require('express')
const router = express.Router()
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/a768678405854cf584ae620be7844cc3'))
const abi = require('../modules/BATTLEPool.json')
const contract = new web3.eth.Contract(abi.abi, '0xa9CDb5e3C911884Ca6D4b32273c219B536Ee9e6A')
const { web3RejectUnauthenticated } = require('../middleware/web3-authentication');
const Nft = require('../schemas/Nft.schema')
const NftType = require('../schemas/NftType.schema')


router.post('/new', async (req, res) => {
  try {
    const { assetId, contractAddress, picture, rarity, name, mintLimit, baseStats } = req.body;
    if (typeof picture !== "string" || typeof name !== "string") {
      res.sendStatus(500)
      return
    }

    const newNftType = new NftType({ assetId, contractAddress, picture, rarity, baseStats, mintLimit, name })
    await newNftType.save();

    res.send(newNftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/update', web3RejectUnauthenticated, async (req, res) => {
  try {
    const { contractAddress, picture, rarity, stats, mintLimit } = req.body;


    let nftType = await NftType.findOne({ contractAddress });
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

router.post('/get-one', async (req, res) => {
  try {
    let nftType = await NftType.findOne({ assetId: req.body.assetId });
    console.log(nftType);
    
    res.send(nftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.get('/all', async (req, res) => {
  try {
    let nftTypes = await NftType.find();
    res.send(nftTypes);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

module.exports = router
