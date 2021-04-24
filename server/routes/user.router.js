const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')
const multer = require('multer');
const User = require('../schemas/User.schema')
const Suggestion = require("../schemas/Suggestion.schema");
const NftType = require('../schemas/NftType.schema');

router.post('/get-account', async (req, res) => {
  try {
    console.log("get-account hit", req.body)
    let user = await User.findOne({ address: req.body.address });
    if (!user) {
      user = new User({
        address: req.body.address,
      })
      await user.save();
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/update-account', async (req, res) => {
  try {

    let user = await User.findOneAndUpdate({ address: req.body.address },
      { username: req.body.username, 
        // email: req.body.email 
      }, {new: true});
    res.send(user);
    // const pictureColor = req.body.pictureColor ? req.body.pictureColor : "#002450";
    // let s = { address: req.body.address, nickname: req.body.nickname, picture: req.body.picture, pictureColor }
    // const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    // if (req.body.address !== signingAddress) {
    //   res.status(401).send("signature mismatch");
    //   return
    // }
    // let user = await User.findOneAndUpdate({ address: req.body.address },
    //   { nickname: req.body.nickname, picture: req.body.picture, pictureColor });
    // res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
})

router.post('/like-nft', async (req, res) => {
  try {
    console.log("LIKING")
    let nft = await NftType.findOne({_id: req.body.nft});
    let likeCount = 0;

    let hasLiked = nft.likes.indexOf(req.body.address);
    if (hasLiked < 0) {
      likeCount = nft._doc.likes.length + 1;
      nft.likes = [...nft.likes, req.body.address];
    }
    else {
      let likes = nft.likes;
      likeCount = likes.length - 1;
      likes.splice(hasLiked, 1);
      nft.likes = likes;
    }
    nft.save();
    console.log("NFT", nft);
    res.send({nft: {...nft._doc, liked: hasLiked < 0, likes: [], likeCount: likeCount }});
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
})

router.get('/battles-leaderboard', async (req, res) => {
  try {
    let users = await User.find().sort({ battleWinPercent: -1 }).limit(5);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.get('/bets-leaderboard', async (req, res) => {
  try {
    let users = await User.find().sort({ betAmountWon: -1 }).limit(5);
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

router.post('/suggestion', async (req, res) => {
  try {
    console.log("info", req.body.address, req.body.suggestion);
    let s = { address: req.body.address, suggestion: req.body.suggestion }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    if (req.body.address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }
    let user = await User.findOne({ address: req.body.address });
    // const alreadyMadeSuggestion = await Suggestion.findOne({
    //   timestamp: {
    //     $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000).toISOString()
    //   }, userId: user._id
    // });
    // if (alreadyMadeSuggestion) {
    //   res.status(403).send("You may only submit one suggestion per day.")
    //   return
    // }
    // let votes = new BigNumber(await contract.methods.balanceOf(req.body.address).call()).dividedBy(10 ** 18).toFixed(18)

    // if (parseFloat(votes) === 0) {
    //   res.status(403).send("You must have BDT or ETH-BDT-LP staked in order to submit a suggestion. Please stake BDT on the stake page.")
    //   return
    // }

    const newSuggestion =
      new Suggestion({ userId: user._id, message: req.body.suggestion })

    await newSuggestion.save();
    console.log("donesuggest", newSuggestion);
    res.send(newSuggestion);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!!!");
  }
})

router.post('/get-suggestions', async (req, res) => {
  try {
    console.log("get suggestions!\naddress: ", req.body.address, "\npage: ", req.body.page, "\nsort: ", req.body.sort, "\n");
    const sort = req.body.sort === "new" ? { timestamp: -1 } : { totalVotes: -1 };
    let initialSuggestions = await Suggestion.find()
      .sort(sort)
      .skip(req.body.page * 5)
      .limit(5);

    let suggestions = [];
    for (let suggestion of initialSuggestions) {
      let user = await User.findOne({ _id: suggestion.userId });
      const { address, picture, pictureColor, nickname } = user;
      const { totalVotes, _id, userId, message, timestamp } = suggestion;
      let upDooted;
      let downDooted;
      const voteIndex = suggestion.votes.findIndex(vote => vote.address === req.body.address);
      if (voteIndex !== -1) {
        upDooted = suggestion.votes[voteIndex].amount > 0 ? true : false;
        downDooted = suggestion.votes[voteIndex].amount < 0 ? true : false;
      }
      // console.log("\n\n\nuser: ", user, suggestion)
      suggestions.push({ totalVotes, _id, userId, message, address, picture, pictureColor, nickname, upDooted, downDooted, timestamp })
    }
    let totalPages = await Suggestion.countDocuments() / 5;
    totalPages = Math.ceil(totalPages);
    // console.log("done: ", suggestions)
    res.send({ suggestions, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

const countVotes = (votes) => {
  let total = 0;
  for (let i = 0; i < votes.length; i++) {
    total += votes[i].amount;
  }
  return total;
}

router.post('/vote', async (req, res) => {
  try {
    let { voteAmount, suggestionId, address, sig } = req.body;
    let s = { address, suggestionId, voteAmount }
    const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
    if (req.body.address !== signingAddress) {
      res.status(401).send("signature mismatch");
      return
    }

    const user = await User.findOne({ address });
    let suggestion = await Suggestion.findOne({ _id: suggestionId });
    console.log("votesuggestion", suggestion);
    const voteIndex = suggestion.votes.findIndex(vote => vote.address === address);
    if (voteIndex !== -1) {
      suggestion.votes[voteIndex].amount = voteAmount;
      suggestion.votes[voteIndex].timestamp = new Date();
      suggestion.votes[voteIndex].sig = sig;
    } else {
      suggestion.votes.push({
        userId: user._id,
        amount: voteAmount,
        timestamp: new Date(),
        address: address,
        sig
      })
    }
    suggestion.totalVotes = countVotes(suggestion.votes);
    await suggestion.save();
    res.send(suggestion);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error")
  }
})

//create iam user
//check if folder for user exists, if not create one
//attach policy allowing them to access folder
router.post("/getNftFolder/:address", async (req, res) => {
  console.log(req.body);
  const address = req.params.address;
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  var s3Client = new AWS.S3();
  var checkForFolderParams = {
    Bucket: 'nft-fm'
  };
  var createFolderParams = {
    Bucket: 'nft-fm',
    Key: req.params.address,
    ACL: 'public-read',
    Body: 'body does not matter'
  };
  const checkForFolder = () => {
    s3Client.listObjectsV2(checkForFolderParams, (err, found) => {
      if (err)
        console.log(err);
      else {
        const folderExists = found.Contents.find(folder => {
          return folder.Key == address;
        })
        if (folderExists)
          return true
        else
          return false;
      }
    })
  }

  if (!checkForFolder())
    s3Client.upload(createFolderParams, function (err, data) {
      if (err) {
        res.status(400).send("error creating folder: ", err)
        console.log("Error creating the folder: ", err);
      } else {
        console.log("Successfully created a folder on S3");
        res.status(200).send("created folder!")
      }
    });
  else
    res.status(200).send("user folder already exists!")
  // });
  // var fs = require('fs');
  // var path = require('path');
  // var jsonPath = path.join(__dirname, '..', "aws_config.json");
  // console.log("Server whoo-hoo")
  // // Load the AWS SDK for Node.js
  // var AWS = require('aws-sdk');
  // // Set the region 
  // AWS.config.loadFromPath(jsonPath);
  // AWS.config.update({ region: 'us-west-2' });


  // // // Create the IAM service object
  // var iam = new AWS.IAM({ apiVersion: '2010-05-08' });

  // var params = {
  //   UserName: "foo"//process.argv[2]
  // };

  // iam.getUser(params, function (err, data) {
  //   console.log("params: ", params);
  //   if (err && err.code === 'NoSuchEntity') {
  //     iam.createUser(params, function (err, data) {
  //       if (err) {
  //         console.log("Error", err);
  //       } else {
  //         console.log("Success", data);
  //       }
  //     });
  //   } else {
  //     console.log("User " + process.argv[2] + " already exists", data.User.UserId);
  //   }
  // });
});

router.post("/uploadNft/:address", async (req, res) => {
  const address = req.params.address;
  // Import required AWS SDK clients and commands for Node.js.
  const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
  const path = require("path");

  // Set the AWS Region.
  const REGION = "us-west-1"; //e.g. "us-east-1"

  // Set the parameters
  const uploadParams = { Bucket: "nft-fm" };
  const file = req.body.pathToFile; // Path to and name of object. For example '../myFiles/index.js'.

  // Create an Amazon S3 service client object.
  const s3 = new S3Client({ region: REGION });

  // Upload file to specified bucket.
  const run = async () => {
    // Add the required 'Key' parameter using the 'path' module.
    uploadParams.Key = address + '/' + path.basename(file);
    console.log("uploadParams: ", uploadParams);
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
      console.log("Success", data);
    } catch (err) {
      console.log("Error", err);
    }
  }
  run();
})

router.post('/uploadProfilePicS3', async (req, res) => {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  const path = require('path');
  const multerS3 = require("multer-s3");
  var s3Client = new AWS.S3();

  const fileFilter = (req, file, cb) => {
    cb(null, true);
  };

  let upload = multer({
    fileFilter,
    storage: multerS3({
      ACL: "public-read",
      s3: s3Client,
      bucket: "nftfm-profilepic",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "imageFile" });
      },
      key: function (req, file, cb) {
        cb(null, req.body.user + "/" + file.originalname);
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
    User.findOneAndUpdate({address: req.body.user}, {profilePic: req.file.location})
        .then(() => {
          return res.status(200).send(req.file)
        })
  })
})

module.exports = router
