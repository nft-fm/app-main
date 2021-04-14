const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const fs = require('fs')
const multer = require('multer')

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

const uploadToS3Bucket = (bucket, req, res) => {
  const { artist, title } = req.body.nftData;
  const file = req.body.audioFile;
  var base64data = Buffer.from("binary", file)
  // console.log("file: ", file);
  // return;
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');

  AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3Client = new AWS.S3();

  var params = {
    Bucket: bucket,
    Key: artist + "/" + title,
    Body: base64data
  };

  try {
    s3Client.upload(params, function (err, data) {
      if (err)
        res.status(400).send("error: ", err);
      else
        console.log("uploaded content!")
    })
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
}

//send audio file to private bucket
router.post('/handleAudio', async (req, res) => {
  // console.log(req.body.getKey('audioFile'))
  uploadToS3Bucket("nftfm-music", req, res);

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
    uploadToS3Bucket("nftfm-music", req, res);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error")
  }
})

//send image file to public folder
router.post('/handleImage', async (req, res) => {
  try {
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
    console.log('/fetchNFT hit', req.body)
  } catch (err) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/getSong', async (req, res) => {
  console.log(req.body);
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');

  AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3 = new AWS.S3();

  s3.getObject(
    { Bucket: "nftfm-music", Key: req.body.address + "/" + req.body.title },
    function (error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        // do something with data.Body
      }
    }
  );
})

module.exports = router
