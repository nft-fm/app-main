const { BigNumber, constants, utils } = require("ethers");
const { AnalyticsExportDestination } = require('@aws-sdk/client-s3');
const express = require('express')
const { flushSync } = require('react-dom')
const router = express.Router()
const NftType = require('../schemas/NftType.schema')
const multer = require('multer');
const User = require('../schemas/User.schema');
const { NFTSale } = require('../web3/constants');
const { sign, getSetSale } = require('../web3/server-utils');
const { listenForMint } = require("../web3/mint-listener");

const findLikes = (nfts, account) => {
  for (let i = 0; i < nfts.length; i++) {
    const likes = nfts[i]._doc.likes;
    if (likes && likes.find(like => like.toString() === account)) {
      nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length, liked: true }
    }
    else {
      nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length || 0, liked: false };
    }
    // const extraInfo = await getSetSale(nfts[i].nftId)
    // console.log("EXTRA INFO", extraInfo)
    // nfts[i] = {
    //   ...nfts[i],
    //   price: extraInfo.price,
    //   quantity: extraInfo.quantity,
    //   sold: extraInfo.sold
    // }
  }
  // console.log("NFTS", nfts);
  return nfts;
}

const findRemainingInfo = async (nft) => {
  const extraInfo = await getSetSale(nft.nftId)
  // console.log("remaining info", extraInfo, nft);
  let newNft = {
    ...nft,
    price: utils.formatEther(extraInfo.price),
    quantity: extraInfo.quantity,
    sold: extraInfo.sold
  }
  // console.log("3", newNft);

  return newNft;
}

router.post('/full-nft-info', async (req, res) => {
  try {
    const fullInfo = await findRemainingInfo(req.body.nft).catch(err => console.log(err));
    res.send(fullInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/artist-nfts', async (req, res) => {
  try {
    let nfts = await NftType.find({ address: req.body.address, isDraft: false })

    res.send(findLikes(nfts, req.body.address));
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/get-NFT', async (req, res) => {
  try {
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
    let ids = req.body.x_nfts;
    let nfts = await NftType.find({ '_id': { $in: ids } });

    res.status(200).send(findLikes(nfts, req.body.address));
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/finalize', async (req, res) => {
  try {
    let newData = req.body;
    newData.isDraft = false;

    let updateNFT = await NftType.findByIdAndUpdate(newData._id, newData)
    if (updateNFT) {
      const startTime = 0;
      // const price = BigNumber.from(newData.price.mul(constants.WeiPerEther));
      const price = utils.parseUnits(newData.price);
      const signature = sign(newData.address, newData.numMinted, price, startTime, NFTSale);
      res.status(200).send({
        ...signature,
        amount: newData.numMinted,
        price: price,
        address: newData.address,
        startTime: startTime,
        saleAddress: NFTSale,
        databaseID: newData._id
      })
      listenForMint();
    } else {
      console.log("no nft");
      res.status(500).json('error')
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/get-one', async (req, res) => {
  try {
    let { id, address } = req.body;
    let nftType = await NftType.findById(id);
    console.log("1", nftType);

    //for some reason this isn't pulling the likeCount
    nftType = JSON.parse(JSON.stringify(findLikes(nftType, address)));

    const extraInfo = await getSetSale(nftType.nftId)
    console.log("nftType", nftType);
    nftType = {
      ...nftType,
      price: utils.formatEther(extraInfo.price),
      quantity: extraInfo.quantity,
      sold: extraInfo.sold,
      likeCount: nftType.likeCount ? nftType.likeCount : nftType.likes.length,
    }
    res.send(nftType);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/featured', async (req, res) => {
  try {
    let nftTypes = await NftType.find({
      isFeatured: true,
      isDraft: false,
      isMinted: true,
    })
      .limit(5)

    res.send(findLikes(nftTypes, req.body.address));
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


router.post('/all', async (req, res) => {
  try {
    let nftTypes = await NftType.find({
      isDraft: false,
      isMinted: true,
    });
    res.send(findLikes(nftTypes, req.body.address));
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
    // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
    // } else {
    //   cb(new Error("Invalid file type, only jpeg's and png's are allowed!"), false);
    // }
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
  const AWS = require('aws-sdk')

  const s3 = new AWS.S3()
  // AWS.config.update({accessKeyId: 'id-omitted', secretAccessKey: 'key-omitted'})

  // Tried with and without this. Since s3 is not region-specific, I don't
  // think it should be necessary.
  // AWS.config.update({region: 'us-west-2'})

  const params = { Bucket: "nftfm-music", Key: req.body.key, Expires: 60 * 5 };

  const url = s3.getSignedUrl('getObject', params)

  console.log(url)
  res.status(200).send(url);
  // console.log(req.body);
  // var AWS = require('aws-sdk');
  // AWS.config.region = 'us-west-2';
  // const path = require('path');

  // // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  // var s3 = new AWS.S3();

  // s3.getObject(
  //   { Bucket: "nftfm-music", Key: req.body.key },
  //   function (error, data) {
  //     if (error != null) {
  //       console.log("Failed to retrieve an object: " + error);
  //     } else {
  //       console.log("Loaded " + data.ContentLength + " bytes");
  //       res.status(200).send(data);           // successful response
  //     }
  //   }
  // );
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
    let nft = await NftType.findOne({ _id: req.body.id })
    if (!nft) {
      res.status(500).send('No NFT found')
      return
    }
    if (nft.x_numSold >= nft.numMinted) {
      res.status(500).send('Out of Stock')
      return
    }
    let user = await User.findOne({ address: req.body.address })
    if (!user) {
      res.status(500).send('No user found')
      return
    }
    console.log("mid", user, nft);

    user.x_nfts = [...user.x_nfts, { _id: nft._id }];
    await user.save();
    nft.x_numSold++;
    await nft.save();
    console.log("end?", user, nft);
    res.status(200).send("Success!")
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err)
  }
})

module.exports = router
