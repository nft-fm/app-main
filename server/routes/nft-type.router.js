const express = require('express')
const router = express.Router()
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


router.post('/update',  async (req, res) => {
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
