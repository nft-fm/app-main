const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const fs = require('fs')
const multer = require('multer')

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
    console.log('/new hit', req.body)
    // const newNftType = new NftType(req.body)
    // await newNftType.save();
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

    // res.send(newNftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/update', async (req, res) => {
  try {
    console.log('/update hit', req.body)
    let newData = req.body;
    await NftType.findOneAndUpdate({address: req.body.address}, newData);
    // console.log('here', nftType)
    // nftType = req.body;

    // console.log('HERRREEE', nftType)
    // // nftType = req.body
    // await nftType.save();
    // if (picture) nftType.picture = picture;
    // if (rarity) nftType.rarity = rarity;
    // if (stats) nftType.stats = stats;
    // await nftType.save();

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



//send audio file to private bucket
router.post('/handleAudio', async (req, res) => {
  try {

    console.log('/handleAudio hit')

    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    let upload = multer({ storage: storage }).single('audioFile')
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log('here', err)
        return res.status(500).json(err)
      } else if (err) {
        console.log('there', err)
        return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
    })
  } catch (err) {
    console.log(err);
    res.status(500).send("server error")
  }
})

//send image file to public folder
router.post('/handleImage', async (req, res) => {
  try {

    console.log('/handleImage hit')

    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    let upload = multer({ storage: storage }).single('imageFile')


    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log('here', err)
        return res.status(500).json(err)
      } else if (err) {
        console.log('there', err)
        return res.status(500).json(err)
      }
      return res.status(200).send(req.file)
    })
  } catch (err) {
    console.log(error);
    res.status(500).send("server error")
  }
})


router.post('/fetchNFT', async (req, res) => {
  try {
    console.log("fetchNFT Hit", req.body.account);
    let nft = await NftType.findOne({
      address: req.body.account,
      draft: true,
    });
    if (!nft) {
      const newNft = new NftType({
        address: req.body.account,
        draft: true,
      });
      await newNft.save();
      res.send(newNft);
    } else {
      res.send(nft);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("no users found");
  }
})
module.exports = router
