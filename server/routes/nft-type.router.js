const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const fs = require('fs')
const multer = require('multer')

router.post('/new', async (req, res) => {
  try {
    console.log('/new hit', req.body)
    // const newNftType = new NftType(req.body)
    // await newNftType.save();

    // res.send(newNftType);
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

module.exports = router
