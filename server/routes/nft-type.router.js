const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const fs = require('fs')
const multer = require('multer')

router.post('/new', async (req, res) => {
  try {
    console.log("/new Hit", req.body.address);
    let nft = await NftType.findOne({
      address: req.body.address,
      draft: true,
    });
    if (!nft) {
      const newNft = new NftType(req.body);
      await newNft.save();
      res.send(newNft);
    } else {
      res.send(nft);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error: ", error);
  }
});


router.post('/update', async (req, res) => {
  try {
    console.log('/update hit', req.body)
    let newData = req.body;
    await NftType.findOneAndUpdate({ address: req.body.address }, newData);

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

router.post('/uploadAudioS3', async (req, res) => {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');
  const multerS3 = require("multer-s3");

  // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3Client = new AWS.S3();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only MP3s are allowed!"), false);
    }
  };

  let upload = multer({
    fileFilter,
    storage: multerS3({
      ACL: "public-read",
      s3: s3Client,
      bucket: "nftfm-music",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "audioFile" });
      },
      key: function (req, file, cb) {
        cb(null, req.body.artist + "/" + file.originalname);
      },
    })
  })
  const singleUpload = upload.single("audioFile");
  singleUpload(req, res, function (err) {
    console.log("here: ", req.body);
    if (err instanceof multer.MulterError) {
      console.log('here', err)
      return res.status(500).json(err)
    } else if (err) {
      console.log('there', err)
      return res.status(500).json(err)
    }
    return res.status(200).send("success")
  })
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
router.post('/uploadImageS3', async (req, res) => {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');
  const multerS3 = require("multer-s3");
  var s3Client = new AWS.S3();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only jpeg's and png's are allowed!"), false);
    }
  };

  let upload = multer({
    fileFilter,
    storage: multerS3({
      ACL: "public-read",
      s3: s3Client,
      bucket: "nftfm-images",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "imageFile" });
      },
      key: function (req, file, cb) {
        cb(null, req.body.artist + "/" + file.originalname);
      },
    })
  })
  const singleUpload = upload.single("imageFile");
  singleUpload(req, res, function (err) {
    console.log("here: ", req.body);
    if (err instanceof multer.MulterError) {
      console.log('here', err)
      return res.status(500).json(err)
    } else if (err) {
      console.log('there', err)
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
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
      // uploadToS3Bucket("nftfm-image", req, res);
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

router.post('/getSong', async (req, res) => {
  console.log(req.body);
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');

  // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3 = new AWS.S3();

  s3.getObject(
    { Bucket: "nftfm-music", Key: req.body.key },
    function (error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        res.status(200).send(data);           // successful response
      }
    }
  );
})

router.post('/getSongList', async (req, res) => {
  const account = req.body.account;
  console.log("account: ", account);
  const params = {
    Bucket: 'nftfm-music',
    Prefix: account
  }
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');

  // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3 = new AWS.S3();
  s3.listObjectsV2(params, function (err, data) {
    console.log(data);
    if (err) console.log(err, err.stack); // an error occurred
    else
      res.status(200).send(data);           // successful response
  });
})

module.exports = router
