const { BigNumber, constants, utils } = require("ethers");
const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const multer = require("multer");
const AWS = require("aws-sdk");
const User = require("../schemas/User.schema");
const {
  MAIN_FlatPriceSale,
  TEST_FlatPriceSale,
  TEST_BSC_FlatPriceSale,
  MAIN_BSC_FlatPriceSale,
} = require("../web3/constants");
const {
  sign,
  findLikes,
  addArtistToStake,
  getStakersForArtist,
  getAllNftsFromEthContract,
  getAllNftsFromBscContract,
} = require("../web3/server-utils");
const { listenForMintEth, listenForMintBsc } = require("../web3/mint-listener");
const { trackNftView } = require("../modules/mixpanel");
const { listenForBuyBsc, listenForBuyEth } = require("../web3/buy-listener");
const cron = require("node-cron");
const path = require("path");
const multerS3 = require("multer-s3");

router.get("/test-get-all", async (req, res) => {
  NftType.find({ isMinted: true })
    .then((r) =>
      res.json(
        r.map(({ nftId, imageUrl }) => {
          return { nftId, imageUrl };
        })
      )
    )
    .catch(() => res.status(500).send("Server Error"));
});

// const findLikes = (nfts, account) => {
//   for (let i = 0; i < nfts.length; i++) {
//     const likes = nfts[i]._doc.likes;
//     if (likes && likes.find(like => like.toString() === account)) {
//       nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length, liked: true }
//     }
//     else {
//       nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length || 0, liked: false };
//     }
//     // const extraInfo = await getSetSale(nfts[i].nftId)
//     // console.log("EXTRA INFO", extraInfo)
//     // nfts[i] = {
//     //   ...nfts[i],
//     //   price: extraInfo.price,
//     //   quantity: extraInfo.quantity,
//     //   sold: extraInfo.sold
//     // }
//   }
//   // console.log("NFTS", nfts);
//   return nfts;
// }


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-west-2"
});


router.post("/artist-nfts", async (req, res) => {
  try {
    let nfts = await NftType.find({
      address: req.body.address,
      isDraft: false,
      isMinted: true,
    });
    res.send(findLikes(nfts, req.body.address));
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/artist-stakers", async (req, res) => {
  try {
    const stakers = await getStakersForArtist(req.body.address);
    const users = await User.find({ address: { $in: stakers } });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/updateStartTime", async (req, res) => {
  try {
    if (!req.body.nft) res.status(400).send("No address >_<");

    const updateNft = await NftType.findById(req.body.nft._id);
    updateNft.startTime = req.body.nft.startTime;

    await updateNft.save();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/update-and-fetch", async (req, res) => {
  try {
    const nftData = req.body;
    if (!req.body.address) return res.status(400).send("No address");
    let draft = await NftType.findOne({
      isDraft: true,
      address: req.body.address,
    });

    if (!draft) {
      // res.status(400).send("Unable to find/update NFT");
      draft = await new NftType({
        address: req.body.account,
        dur: 0,
        isDraft: true,
      });
      await draft.save();
      res.send(draft);
    }

    for (const key in nftData) {
      if (key in draft) draft[key] = nftData[key];
    }

    if (draft.address && draft.artist === "") {
      let user = await User.findOne({ address: req.body.address });
      draft.artist = user.username;
    }
    await draft.save();
    res.send(draft);
  } catch (error) {
    res.status(500).send("no users found");
  }
});

router.get("/has-draft/:id", async (req, res) => {
  try {
    if (!req.params.id) res.status(400).send("No address >_<");
    const draft = await NftType.findOne({
      isDraft: true,
      address: req.params.id,
    });

    res.send({ hasDraft: !!draft });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/get-NFT", async (req, res) => {
  try {
    if (req.body.account) {
      let nft = await NftType.findOne({
        address: req.body.account,
        isDraft: true,
      });
      if (!nft) {
        const newNft = await new NftType({
          address: req.body.account,
          dur: 0,
          isDraft: true,
        });
        await newNft.save();
        res.send(newNft);
      } else {
        res.send(nft);
      }
    }
  } catch (error) {
    res.status(500).send("no users found");
  }
});

router.post("/get-user-nfts", async (req, res) => {
  try {
    let ids = [];
    //if user owns > 1 copy of the same nft, this whole chain of logic will get the same nft as many times as they own it
    if (!req.body.nfts || !req.body.nfts.length) {
      res.send("no nfts!");
      return;
    }
    for (nft of req.body.nfts) {
      if (nft.quantity > 1) {
        for (let i = 0; i < nft.quantity; i++) {
          ids.push(nft.nft);
        }
      } else {
        ids.push(nft.nft);
      }
    }
    const gottenNfts = [];
    for (id of ids) {
      console.log("here", id);
      const getNft = await NftType.findOne(
        {
          _id: id,
        },
        { snnipet: 0 }
      );
      console.log("getNft", getNft);
      gottenNfts.push(getNft);
    }

    res.status(200).send(findLikes(gottenNfts, req.body.address));
  } catch (error) {
    res.status(500).send("server error");
  }
});

const toArrayBuffer = (buf) => {
  let ab = new ArrayBuffer(buf.length);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; i++) {
    view[i] = buf[i];
  }
  return ab;
};

router.post("/update-draft", async (req, res) => {
  try {
    if (!req.body.address) return res.status(400).send("No address :(((");
    const draft = req.body;
    let updatedDraft = await NftType.findByIdAndUpdate(draft._id, draft);

    if (updatedDraft) {
      res.send("draft updated");
    } else {
      res.status(400).json("Cannot find existing draft");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/finalize", async (req, res) => {
  try {
    let newData = req.body;
    newData.price = newData.price.toString();
    newData.isDraft = false;
    let NFT_FlatPriceSale;
    if (newData.chain === "ETH") {
      NFT_FlatPriceSale = process.env.REACT_APP_IS_MAINNET
        ? MAIN_FlatPriceSale
        : TEST_FlatPriceSale;
    } else if (newData.chain === "BSC") {
      NFT_FlatPriceSale = process.env.REACT_APP_IS_MAINNET
        ? MAIN_BSC_FlatPriceSale
        : TEST_BSC_FlatPriceSale;
    } else {
      console.error("CHAIN ERROR CHAIN ERROR");
    }
    let findNFT = await NftType.findById(newData._id);
    if (findNFT) {
      const startTime = 0;
      // const price = BigNumber.from(newData.price.mul(constants.WeiPerEther));
      const price = utils.parseUnits(newData.price);
      const encodedFee = utils.defaultAbiCoder.encode(["uint32"], [10]); // fee is hardcoded to 10% atm
      listenForMintEth();
      listenForMintBsc();

      const signature = sign(
        [
          "string",
          "address",
          "uint256",
          "uint256",
          "uint256",
          "address",
          "bytes",
        ],
        [
          "NFTFM_mintAndStake",
          newData.address,
          newData.numMinted,
          price,
          startTime,
          NFT_FlatPriceSale,
          encodedFee,
        ]
      );
      res.status(200).send({
        ...signature,
        amount: newData.numMinted,
        price: price,
        address: newData.address,
        startTime: startTime,
        dur: newData.dur,
        saleAddress: NFT_FlatPriceSale,
        databaseID: newData._id,
        encodedFee: encodedFee,
      });
    } else {
      res.status(500).json("error");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/notDraftAnymore", async (req, res) => {
  try {
    let updateNFT = await NftType.findByIdAndUpdate(req.body._id, {
      isDraft: false,
      timestamp: new Date(),
    });
    let updateUser = await User.findOneAndUpdate(
      { address: req.body.address },
      { hasMinted: true }
    );
    addArtistToStake(req.body.address, (msg) => {
      res.status(200).send(msg);
    }).catch((err) =>
      res.status(200).send("Error adding artist to staking pool!")
    );
  } catch (err) {
    res.send(err);
  }
});

// router.post("/auction-finalize", async (req, res) => {
//   try {
//     let newData = req.body;
//     newData.isDraft = false;

//     console.log("newData", newData);
//     let updateNFT = await NftType.findByIdAndUpdate(newData._id, newData);
//     if (updateNFT) {
//       const price = utils.parseUnits(newData.price);
//       const encodedArgs = utils.defaultAbiCoder.encode(
//         ["uint256", "uint256"],
//         [newData.endTime, newData.bidIncrementPercent]
//       ); // fee is hardcoded to 3% atm
//       const signature = sign(
//         [
//           "string",
//           "address",
//           "uint256",
//           "uint256",
//           "uint256",
//           "address",
//           "bytes",
//         ],
//         [
//           "NFTFM_mintAndStake",
//           newData.address,
//           1,
//           price,
//           BigNumber.from(newData.startTime),
//           Auction,
//           encodedArgs,
//         ]
//       );
//       listenForMint();
//       res.status(200).send({
//         ...signature,
//         amount: 1,
//         price: price,
//         address: newData.address,
//         startTime: newData.startTime,
//         saleAddress: Auction,
//         databaseID: newData._id,
//         encodedArgs: encodedArgs,
//       });
//     } else {
//       console.log("no nft");
//       res.status(500).json("error");
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("server error");
//   }
// });

router.post("/get-one", async (req, res) => {
  try {
    let { id, address, chain } = req.body;
    let nftType = await NftType.findOne({ nftId: id, chain: chain });

    console.log("getting?", nftType);

    if (nftType) {
      res.send({ ...nftType.toObject(), likeCount: nftType.likes.length });
    } else {
      res.status(404).send("NFT not found");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/getSnnipet", async (req, res) => {
  try {
    let nftType = await NftType.findOne(
      {
        // isFeatured: true,
        nftId: req.body.nftId,
        isDraft: false,
        isMinted: true,
      },
      { snnipet: 1 }
    );
    res.send(nftType);
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/featured", async (req, res) => {
  try {
    let nftTypes = await NftType.find(
      {
        isFeatured: true,
        isDraft: false,
        isMinted: true,
      },
      { snnipet: 0 }
    ).limit(4);

    res.send(findLikes(nftTypes, req.body.address));
  } catch (error) {
    res.status(500).send("server error");
  }
});

//flesh out pagination
router.post("/get-many", async (req, res) => {
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
});

router.post("/countNfts", async (req, res) => {
  let countNfts = await NftType.countDocuments({
    isDraft: false,
    isMinted: true,
  });
  res.send({ count: countNfts });
  // res.sendStatus(200).json({countNfts});
});

router.post("/getNftsWithParams", async (req, res) => {
  try {
    const { address, sort, page, limit, length, genre } = req.body;
    const sortParams = {
      0: { price: -1 },
      1: { price: 1 },
      2: { timestamp: -1 },
      3: { timestamp: 1 },
      4: { shareCount: 1 },
      5: { likeCount: -1 },
      6: { numSold: -1 },
    };
    const query = { $regex: req.body.search, $options: "i" };

    console.log("HERE", genre);

    if (genre === "All") {
      let nftTypes = await NftType.find({
        isDraft: false,
        isMinted: true,
        $or: [{ title: query }, { artist: query }],
      })
        .sort(sortParams[sort] ? sortParams[sort] : {})
        .skip(page * limit)
        .limit(limit);
      res.send({
        nfts: findLikes(nftTypes, address),
        hasMore: length === limit,
      });
    } else {
      let nftTypes = await NftType.find({
        isDraft: false,
        isMinted: true,
        $or: [{ title: query }, { artist: query }],
        genre: genre,
      })
        .sort(sortParams[sort] ? sortParams[sort] : {})
        .skip(page * limit)
        .limit(limit);
      res.send({
        nfts: findLikes(nftTypes, address),
        hasMore: length === limit,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

router.post("/getSnnipetAWS", async (req, res) => {

  const params = { Bucket: "nftfm-music", Key: req.body.key, Expires: 60 * 5 };
  const url = s3.getSignedUrl("getObject", params);

  console.log("got url", url);
  res.status(200).send(url);
});

router.post("/uploadSnnipetS3", async (req, res) => {
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
    s3: s3  ,
      bucket: "nftfm-music",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "audioFile" });
      },
      key: function (req, file, cb) {
        cb(null, req.body.artist + "/30_sec_snnipets/" + file.originalname);
      },
    }),
  });

  const singleUpload = upload.single("audioFile");
  singleUpload(req, res, async function (err) {
    let draft = await NftType.findOne({
      isDraft: true,
      address: req.body.artist,
    });
    if (err instanceof multer.MulterError || err) {
      if (draft) {
        draft.audioUrl = "";
        draft.snnipet = "";
        await draft.save();
      }
      return res.status(500).json(err);
    } else {
      // adding saving draft after uploading
      if (draft) {
        draft.audioUrl = req.body.audioURL;
        draft.snnipet = req.body.snnipetURL;
        await draft.save();
      }
      return res.json({ success: true });
    }
  });
});

router.post("/uploadAudioS3", async (req, res) => {
  try {

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/wav") {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type, only MP3s are allowed!"), false);
      }
    };

    let upload = multer({
      fileFilter,
      storage: multerS3({
        ACL: "public-read",
        s3: s3,
        bucket: "nftfm-music",
        metadata: function (req, file, cb) {
          cb(null, { fieldName: "audioFile" });
        },
        key: function (req, file, cb) {
          cb(null, req.body.artist + "/" + file.originalname);
        },
      }),
    });
    const singleUpload = upload.single("audioFile");
    singleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      } else {
        return res.json({ success: true });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//send audio file to private bucket
router.post("/handleAudio", async (req, res) => {
  try {
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    let upload = multer({ storage: storage }).single("audioFile");
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.post("/uploadImageS3", async (req, res) => {

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
      s3: s3,
      bucket: "nftfm-images",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: "imageFile" });
      },
      key: function (req, file, cb) {
        cb(null, req.body.artist + "/" + file.originalname);
      },
    }),
  });
  const singleUpload = upload.single("imageFile");
  singleUpload(req, res, async function (err) {
    let draft = await NftType.findOne({
      isDraft: true,
      address: req.body.artist,
    });
    if (err instanceof multer.MulterError) {
      if (draft) {
        draft.imageUrl = "";
        await draft.save();
      }
      return res.status(500).json(err);
    } else if (err) {
      if (draft) {
        draft.imageUrl = "";
        await draft.save();
      }
      return res.status(500).json(err);
    }
    if (draft) {
      draft.imageUrl = req.body.imageURL;
      await draft.save();
    }
    return res.status(200).send(req.file);
  });
});

//send image file to public folder
router.post("/handleImage", async (req, res) => {
  try {
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    let upload = multer({ storage: storage }).single("imageFile");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      // uploadToS3Bucket("nftfm-image", req, res);
      return res.status(200).send(req.file);
    });
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.post("/getNSecondsOfSong", async (req, res) => {
  const _start = new Date();

  if (req.body.nft) {
    const songFullSize = await s3
      .headObject({ Key: req.body.key, Bucket: "nftfm-music" })
      .promise()
      .then((res) => res.ContentLength)
      .catch((err) => {
        res.status(500).send("Couldnt retrieve nSec of music");
      });

    const startTime = req.body.nft.startTime
      ? (songFullSize * req.body.nft.startTime) / req.body.nft.dur
      : 0;
    const nSec = req.body.nSec || 15;
    const partialBytes = (songFullSize * nSec) / req.body.nft.dur + startTime;
    s3.getObject(
      {
        Bucket: "nftfm-music",
        Key: req.body.key,
        Range: "bytes=" + startTime.toFixed(0) + "-" + partialBytes.toFixed(0),
      },
      function (error, data) {
        if (error != null) {
          console.log("Failed to retrieve an object: " + error);
        } else {
          const _end = new Date();
          res.status(200).send(data);
        }
      }
    );
  }
});

router.post("/getPartialSong", async (req, res) => {
  const songFullSize = await s3
    .headObject({ Key: req.body.key, Bucket: "nftfm-music" })
    .promise()
    .then((res) => res.ContentLength)
    .catch((err) => console.log("err", err));

  let partialBytes = req.body.howManySec
    ? req.body.howManySec
    : (songFullSize / 20).toFixed(0);
  s3.getObject(
    {
      Bucket: "nftfm-music",
      Key: req.body.key,
      Range: "bytes=0-" + partialBytes,
    },
    function (error, data) {
      if (error != null) {
        res.status(500).send("Couldnt retrieve nSec of music");
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.post("/getSong", async (req, res) => {

  s3.getObject(
    { Bucket: "nftfm-music", Key: req.body.key },
    function (error, data) {
      if (error != null) {
        res.status(500).send("Couldnt retrieve song of music");
        return;
      } else {
        res.status(200).send(data); // successful response
      }
    }
  );
});

router.post("/getSongList", async (req, res) => {
  const account = req.body.account;
  const params = {
    Bucket: "nftfm-music",
    Prefix: account,
  };

  // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  s3.listObjectsV2(params, function (err, data) {
    console.log(data);
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.status(200).send(data); // successful response
  });
});

router.get("/purchase", () => {
  listenForBuyEth();
  listenForBuyBsc();
});

// router.post("/purchase", async (req, res) => {
//   try {
//     console.log("purchasing!", req.body);
//     let nft = await NftType.findOne({ _id: req.body.id });
//     if (!nft) {
//       res.status(500).send("No NFT found");
//       return;
//     }
//     if (nft.numSold >= nft.numMinted) {
//       res.status(500).send("Out of Stock");
//       return;
//     }
//     let user = await User.findOne({ address: req.body.address });
//     if (!user) {
//       res.status(500).send("No user found");
//       return;
//     }

//     user.nfts.push({ nft: nft._id, quantity: 1 });

//     await user.save();

//     nft.numSold++;
//     await nft.save();

//     if (process.env.PRODUCTION) {
//       trackNftPurchase({
//         address: req.body.address,
//         ip: req.ip,
//         artistAddress: nft.address,
//         nftId: nft.nftId,
//         nftPrice: nft.price,
//       });
//     }
//     res.status(200).send("Success!");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.post("/newShare", async (req, res) => {
  try {
    const getNft = await NftType.findOne({ nftId: req.body.nftId });
    getNft.shareCount++;
    await getNft.save();
    res.sendStatus("success");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/get-by-nftId", async (req, res) => {
  try {
    const getNft = await NftType.findOne({ nftId: req.body.nftId });
    res.status(200).send(
      getNft.map((nft) => {
        return {};
      })
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

//returns NFTs that match search params
//queries by both artist and song title
//$options: 'i' = case insensitive
router.post("/search", async (req, res) => {
  try {
    const getNfts = await NftType.find({
      $or: [
        {
          artist: { $regex: req.body.params, $options: "i" },
        },
        {
          title: { $regex: req.body.params, $options: "i" },
        },
      ],
    });
    res.send(getNfts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/checkRedeemable", async (req, res) => {
  try {
    const usersNfts = req.body.nfts;
    let userNftIds = [];
    for (let i = 0; i < usersNfts.length; i++) {
      userNftIds.push(usersNfts[i].nft);
    }

    let userOwnsRedeemable = await NftType.find({
      _id: { $in: userNftIds },
      isRedeemable: true,
    });

    if (userOwnsRedeemable[0]) {
      res.status(200).send(userOwnsRedeemable[0]);
    } else {
      res.status(404).send("User does not own a redeemable NFT.");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/trackNftView", async (req, res) => {
  try {
    const payload = {
      address: req.body.address,
      nftId: req.body.nftId,
      artistAddress: req.body.artistAddress,
      artist: req.body.artist,
      title: req.body.title,
      ip: req.ip,
    };
    console.log("track nftView", payload);
    trackNftView(payload);
    res.status(200).send("success");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/testing", async (req, res) => {
  try {
    const nft = await NftType.findOne({ nftId: 4 });

    let attributes = [
      {
        trait_type: "Artist",
        value: nft.artist,
      },
      {
        trait_type: "Genre",
        value: nft.genre,
      },
    ];
    nft.badges.map((badge) => {
      if (badge.founder) {
        attributes.push({
          trait_type: "Badge",
          value: "Founder NFT",
        });
      }
      if (badge.premium) {
        attributes.push({
          trait_type: "Badge",
          value: "Premium NFT",
        });
      }
      if (badge.prerelease) {
        attributes.push({
          trait_type: "Badge",
          value: "Prerelease NFT",
        });
      }
    });
  } catch (err) {}
});

router.post("/updatePrice", async (req, res) => {
  try {
    let updateNFT = await NftType.findOneAndUpdate(
      { nftId: req.body.nftId, chain: req.body.chain },
      { price: req.body.price },
      { new: true }
    );
    console.log("update", updateNFT);
    res.status(200).send("Success");
  } catch (err) {
    res.status(500).send(err);
  }
});

//this function will compare the numSold of the db nfts to the
//contract and update the db to reflect the sold ammount in the contract
const compareAndUpdateDBtoContract = async () => {
  console.log("here");
  const allEthNfts = await NftType.find({ isMinted: true, chain: "ETH" }).sort({
    nftId: -1,
  });
  getAllNftsFromEthContract(allEthNfts, async (comparedNfts) => {
    for (let nftSet of comparedNfts) {
      if (nftSet.nftFromDB.numSold != nftSet.nftFromContract.sold) {
        console.log(nftSet);
        await NftType.findOneAndUpdate(
          { nftId: nftSet.nftFromDB.nftId, chain: "ETH" },
          { numSold: nftSet.nftFromContract.sold }
        );
      }
    }
  });

  const allBscNfts = await NftType.find({ isMinted: true, chain: "BSC" }).sort({
    nftId: -1,
  });
  getAllNftsFromBscContract(allBscNfts, async (comparedNfts) => {
    for (let nftSet of comparedNfts) {
      if (nftSet.nftFromDB.numSold != nftSet.nftFromContract.sold) {
        console.log(nftSet);
        await NftType.findOneAndUpdate(
          { nftId: nftSet.nftFromDB.nftId, chain: "BSC" },
          { numSold: nftSet.nftFromContract.sold }
        );
      }
    }
  });
};
// cron every two hours
cron.schedule("0 */2 * * *", () => {
  try {
    process.env.REACT_APP_IS_MAINNET &&
      process.env.PRODUCTION &&
      compareAndUpdateDBtoContract();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
