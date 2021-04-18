const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const fs = require('fs')
const multer = require('multer');
const User = require('../schemas/User.schema');


router.post('/get-NFT', async (req, res) => {
  try {
    console.log("fetchNFT Hit", req.body.account);
    let nft = await NftType.findOne({
      address: req.body.account,
      isDraft: true,
    });
    if (!nft) {
      const newNft = await new NftType({
        address: req.body.account,
        isDraft: true,
      });
      await newNft.save();
      res.send(newNft);
    } else {
      res.send(nft);
    }
  } catch (error) {
    console.log("fetchNFT error", error);
    res.status(500).send("no users found");
  }
})

router.post('/get-user-nfts', async (req, res) => {
  try {
    console.log("/get-user-nfts hit", req.body)
    let ids = req.body.x_nfts;
    let nfts = await NftType.find({ '_id': { $in: ids}})
    res.status(200).send(nfts)
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/update', async (req, res) => {
  try {
    console.log('/update hit', req.body)
    let newData = req.body;
    newData.isDraft = false;

    let updateNFT = await NftType.findByIdAndUpdate(newData._id, newData)
    if (updateNFT) {
      res.status(200).send("success")
    } else {
      res.status(500).json(err)
    }
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

router.get('/featured', async (req, res) => {
  try {
    let nftTypes = await NftType.find({
      // featured: true 
    })
      .limit(5)


    res.send(nftTypes);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})


//flesh out pagination
router.post('/get-many', async (req, res) => {
  // try {
  //   console.log(
  //     "get suggestions!\naddress: ",
  //     req.body.address,
  //     "\npage: ",
  //     req.body.page,
  //     "\nsort: ",
  //     req.body.sort,
  //     "\n"
  //   );
  //   const sort =
  //     req.body.sort === "new" ? { timestamp: -1 } : { totalVotes: -1 };
  //   let initialSuggestions = await Suggestion.find()
  //     .sort(sort)
  //     .skip(req.body.page * 5)
  //     .limit(5);

  //   let suggestions = [];
  //   for (let suggestion of initialSuggestions) {
  //     let user = await User.findOne({ _id: suggestion.userId });
  //     const { address, picture, pictureColor, nickname } = user;
  //     const { totalVotes, _id, userId, message, timestamp } = suggestion;
  //     let upDooted;
  //     let downDooted;
  //     const voteIndex = suggestion.votes.findIndex(
  //       (vote) => vote.address === req.body.address
  //     );
  //     if (voteIndex !== -1) {
  //       upDooted = suggestion.votes[voteIndex].amount > 0 ? true : false;
  //       downDooted = suggestion.votes[voteIndex].amount < 0 ? true : false;
  //     }
  //     // console.log("\n\n\nuser: ", user, suggestion)
  //     suggestions.push({
  //       totalVotes,
  //       _id,
  //       userId,
  //       message,
  //       address,
  //       picture,
  //       pictureColor,
  //       nickname,
  //       upDooted,
  //       downDooted,
  //       timestamp,
  //     });
  //   }
  //   let totalPages = (await Suggestion.countDocuments()) / 5;
  //   totalPages = Math.ceil(totalPages);
  //   // console.log("done: ", suggestions)
  //   res.send({ suggestions, totalPages });
})


router.get('/all', async (req, res) => {
  try {
    let nftTypes = await NftType.find({ isDraft: false });
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
    console.log("singleUpload: ", req.body);
    if (err instanceof multer.MulterError) {
      console.log('singleUpload multer', err)
      return res.status(500).json(err)
    } else if (err) {
      console.log('singleUpload', err)
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
        console.log('handleAudio multer', err)
        return res.status(500).json(err)
      } else if (err) {
        console.log('handleAudio', err)
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
    console.log("uploadImageS3: ", req.body);
    if (err instanceof multer.MulterError) {
      console.log('uploadImageS3 multer', err)
      return res.status(500).json(err)
    } else if (err) {
      console.log('uploadImageS3', err)
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
        console.log('handleImage multer', err)
        return res.status(500).json(err)
      } else if (err) {
        console.log('handleImage', err)
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

//this will change dramatically with the introduction of smart contracts
router.post("/purchase", async (req, res) => {
  try {
    console.log("/purchase hit", req.body)
    const nft = await NftType.findById(req.body.id)
    if (!nft) {
      res.status(500).send('No NFT found')
      return
    }
    if (nft.x_numSold >= nft.numMinted) {
      res.status(500).send('None available for purchase')
      return
    }
    const user = await User.findOne({ address: req.body.address })
    if (!user) {
      res.status(500).send('No user found')
      return
    }
    user.x_nfts.push({ _id: nft._id })
    await user.save();
    nft.x_numSold++
    await nft.save();
    res.status(200).send("Success!")
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
