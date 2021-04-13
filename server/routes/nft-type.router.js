const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')

router.post('/new', async (req, res) => {
  const { music, image, artist } = req.body.nftData;
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-1';
  const path = require('path');
  AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3Client = new AWS.S3();

  var musicParams = {
    Bucket: "nftfm-music",
    Key: artist + "/" + title,
    Body: music
  };
  var imageParams = {
    Bucket: "nftfm-images",
    Key: artist + "/" + title,
    Body: image
  };
  try {
    s3Client.upload(musicParams, function (err, data) {
      if (err)
        res.status(401).send("error: ", err);
      else
        console.log("uploaded music!")
    })
    s3Client.upload(imageParams, function (err, data) {
      if (err)
        res.status(401).send("error: ", err);
      else
        console.log("uploaded image!")
    })
    const newNftType = new NftType(req.body)
    await newNftType.save();

    res.send(newNftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/update', async (req, res) => {
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
    let id = req.body.id
    let nftType = await NftType.findById(id);
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
