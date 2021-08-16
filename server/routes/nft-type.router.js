const { BigNumber, constants, utils } = require("ethers");
const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const multer = require("multer");
const AWS = require("aws-sdk");
const User = require("../schemas/User.schema");
const { MAIN_FlatPriceSale, TEST_FlatPriceSale } = require("../web3/constants");
const { sign, getSetSale, findLikes } = require("../web3/server-utils");
const { listenForMint } = require("../web3/mint-listener");
const {trackNftPurchase} = require("../modules/mixpanel");

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

const getBucket = () => {
  return new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
};

const findRemainingInfo = async (nft) => {
  const extraInfo = await getSetSale(nft.nftId);
  // console.log("remaining info", extraInfo, nft);
  let newNft = {
    ...nft,
    price: utils.formatEther(extraInfo.price),
    quantity: extraInfo.quantity,
    sold: extraInfo.sold,
  };
  // console.log("3", newNft);

  return newNft;
};

router.post("/full-nft-info", async (req, res) => {
  try {
    const fullInfo = await findRemainingInfo(req.body.nft).catch((err) =>
      console.log(err)
    );
    res.send(fullInfo);
  } catch (err) {
    res.status(500).send(err);
  }
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
    console.log("Update/fetch error", error);
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

    console.log("hasDraft", !!draft);
    res.send({ hasDraft: !!draft });
  } catch (err) {
    console.log(err);
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
        console.log("CREATED DRAFT");
        const newNft = await new NftType({
          address: req.body.account,
          dur: 0,
          isDraft: true,
        });
        await newNft.save();
        res.send(newNft);
      } else {
        console.log("fetched draft");
        console.log(nft);
        res.send(nft);
      }
    }
  } catch (error) {
    console.log("fetchNFT error", error);
    res.status(500).send("no users found");
  }
});

router.post("/get-user-nfts", async (req, res) => {
  try {
    let ids = [];
    //if user owns > 1 copy of the same nft, this whole chain of logic will get the same nft as many times as they own it
    console.log("here nfts", req.body.nfts);
    if (!req.body.nfts || !req.body.nfts.length) {
      res.send("no nfts!");
      return;
    }
    for (nft of req.body.nfts) {
      console.log("nft", nft);
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
      const getNft = await NftType.findOne(
        {
          _id: id,
        },
        { snnipet: 0 }
      );
      console.log("got nft", getNft);
      gottenNfts.push(getNft);
    }

    res.status(200).send(findLikes(gottenNfts, req.body.address));
  } catch (error) {
    console.log(error);
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
    console.log("Hiiii I see you!");
    const draft = req.body;
    console.log("updating draft", req.body);
    let updatedDraft = await NftType.findByIdAndUpdate(draft._id, draft);

    if (updatedDraft) {
      console.log(`Updated Draft: ${updatedDraft}`);
      res.send("draft updated");
    } else {
      console.log("Failed to update draft");
      res.status(400).json("Cannot find existing draft");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.post("/finalize", async (req, res) => {
  try {
    let newData = req.body;
    newData.price = newData.price.toString();
    console.log("newdata", newData);
    newData.isDraft = false;
    const FlatPriceSale = process.env.REACT_APP_IS_MAINNET
      ? MAIN_FlatPriceSale
      : TEST_FlatPriceSale;
    console.log("im here");
    // let updateNFT = await NftType.findByIdAndUpdate(newData._id, newData);
    let findNFT = await NftType.findById(newData._id);
    if (findNFT) {
      const startTime = 0;
      // const price = BigNumber.from(newData.price.mul(constants.WeiPerEther));
      const price = utils.parseUnits(newData.price);
      const encodedFee = utils.defaultAbiCoder.encode(["uint32"], [5]); // fee is hardcoded to 5% atm
      listenForMint();

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
          FlatPriceSale,
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
        saleAddress: FlatPriceSale,
        databaseID: newData._id,
        encodedFee: encodedFee,
      });
    } else {
      console.log("no nft");
      res.status(500).json("error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.post("/notDraftAnymore", async (req, res) => {
  try {
    let updateNFT = await NftType.findByIdAndUpdate(req.body._id, {
      isDraft: false,
    });
    res.status(200).send('Success!')
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
    let { id, address } = req.body;
    let nftType = await NftType.findOne({ nftId: id });
    console.log("getone hit", id, nftType);

    console.log("nftType", nftType);

    if (nftType) {
      console.log();
      res.send({ ...nftType.toObject(), likeCount: nftType.likes.length });
    } else {
      res.status(404).send("NFT not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.post("/getSnnipet", async (req, res) => {
  try {
    console.log("getting snnipet");
    let nftType = await NftType.findOne(
      {
        // isFeatured: true,
        nftId: req.body.nftId,
        isDraft: false,
        isMinted: true,
      },
      { snnipet: 1 }
    );

    console.log("got it", nftType);
    res.send(nftType);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
  console.log("/countNfts hit");
  let countNfts = await NftType.countDocuments({
    isDraft: false,
    isMinted: true,
  });
  console.log("here", countNfts);
  res.send({ count: countNfts });
  // res.sendStatus(200).json({countNfts});
});

router.post("/getNftsWithParams", async (req, res) => {
  try {
    console.log("getting nfts", req.body);
    const getSortParam = () => {
      if (req.body.sort === 0) {
        return { price: -1 };
      } else if (req.body.sort === 1) {
        return { price: 1 };
      } else if (req.body.sort === 2) {
        return { timestamp: -1 };
      } else if (req.body.sort === 3) {
        return { timestamp: 1 };
      }
    };
    let nftTypes = await NftType.find({
      isDraft: false,
      isMinted: true,
      $or: [
        {
          title: { $regex: req.body.search, $options: "i" },
        },
        {
          artist: { $regex: req.body.search, $options: "i" },
        },
      ],
    })
      .sort(getSortParam())
      .skip(req.body.page * req.body.limit)
      .limit(req.body.limit);
    console.log(nftTypes.length === req.body.limit);
    res.send({
      nfts: findLikes(nftTypes, req.body.address),
      hasMore: nftTypes.length === req.body.limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

router.post("/getSnnipetAWS", async (req, res) => {
  console.log("GETTING SNNIPET", req.body.key);
  const s3 = getBucket();

  const params = { Bucket: "nftfm-music", Key: req.body.key, Expires: 60 * 5 };
  const url = s3.getSignedUrl("getObject", params);

  res.status(200).send(url);
});

router.post("/uploadSnnipetS3", async (req, res) => {
  var AWS = require("aws-sdk");
  AWS.config.region = "us-west-2";
  const multerS3 = require("multer-s3");

  var s3Client = getBucket();

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
        cb(null, req.body.artist + "/snnipets/" + file.originalname);
      },
    }),
  });

  const singleUpload = upload.single("audioFile");
  singleUpload(req, res, async function (err) {
    console.log("singleUpload: ", req.body);
    let draft = await NftType.findOne({
      isDraft: true,
      address: req.body.artist,
    });
    if (err instanceof multer.MulterError || err) {
      console.log("singleUpload error", err);
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
  console.log("im here");
  try {
    var AWS = require("aws-sdk");
    AWS.config.region = "us-west-2";
    const multerS3 = require("multer-s3");

    var s3Client = getBucket();

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
        s3: s3Client,
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
      console.log("singleUpload: ", req.body);
      if (err instanceof multer.MulterError) {
        console.log("singleUpload multer", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("singleUpload error", err);
        return res.status(500).json(err);
      } else {
        return res.json({ success: true });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//send audio file to private bucket
router.post("/handleAudio", async (req, res) => {
  try {
    console.log("/handleAudio hit");
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
        console.log("handleAudio multer", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("handleAudio", err);
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.post("/uploadImageS3", async (req, res) => {
  var AWS = require("aws-sdk");
  AWS.config.region = "us-west-2";
  const path = require("path");
  const multerS3 = require("multer-s3");
  var s3Client = getBucket();

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
    }),
  });
  const singleUpload = upload.single("imageFile");
  singleUpload(req, res, async function (err) {
    console.log("uploadImageS3: ", req.body);
    let draft = await NftType.findOne({
      isDraft: true,
      address: req.body.artist,
    });
    if (err instanceof multer.MulterError) {
      console.log("uploadImageS3 multer", err);
      if (draft) {
        draft.imageUrl = "";
        await draft.save();
      }
      return res.status(500).json(err);
    } else if (err) {
      console.log("uploadImageS3", err);
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
        console.log("handleImage multer", err);
        return res.status(500).json(err);
      } else if (err) {
        console.log("handleImage", err);
        return res.status(500).json(err);
      }
      // uploadToS3Bucket("nftfm-image", req, res);
      return res.status(200).send(req.file);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.post("/getNSecondsOfSong", async (req, res) => {
  const _start = new Date();
  console.log("getting n seconds");

  if (req.body.nft) {
    const s3 = getBucket();
    const songFullSize = await s3
      .headObject({ Key: req.body.key, Bucket: "nftfm-music" })
      .promise()
      .then((res) => res.ContentLength)
      .catch((err) => {
        console.log(err);
        res.status(500).send("Couldnt retrieve nSec of music");
      });

    const startTime = req.body.nft.startTime
      ? (songFullSize * req.body.nft.startTime) / req.body.nft.dur
      : 0;
    const nSec = req.body.nSec || 15;
    const partialBytes = (songFullSize * nSec) / req.body.nft.dur + startTime;
    console.log("partial bytes", partialBytes.toFixed(0));
    console.log(req.body.nft);
    console.log("startTime", startTime.toFixed(0));
    console.log(
      "bytes=" + startTime.toFixed(0) + "-" + partialBytes.toFixed(0)
    );
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

          console.log(
            "Operation took " + (_end.getTime() - _start.getTime()) + " msec"
          );
          console.log("LOADED " + data.ContentLength + " bytes");
          res.status(200).send(data);
        }
      }
    );
  }
});

router.post("/getPartialSong", async (req, res) => {
  console.log("getting partial");
  const s3 = getBucket();
  const songFullSize = await s3
    .headObject({ Key: req.body.key, Bucket: "nftfm-music" })
    .promise()
    .then((res) => res.ContentLength)
    .catch((err) => console.log("err", err));

  console.log("SongFullSize", songFullSize);

  let partialBytes = req.body.howManySec
    ? req.body.howManySec
    : (songFullSize / 20).toFixed(0);
  console.log("partial bytes", partialBytes);
  s3.getObject(
    {
      Bucket: "nftfm-music",
      Key: req.body.key,
      Range: "bytes=0-" + partialBytes,
    },
    function (error, data) {
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
        res.status(500).send("Couldnt retrieve nSec of music");
      } else {
        console.log("LOADED " + data.ContentLength + " bytes");
        res.status(200).send(data);
      }
    }
  );
});

router.post("/getSong", async (req, res) => {
  const start = Date.now();
  // AWS.config.update({accessKeyId: 'id-omitted', secretAccessKey: 'key-omitted'})

  // Tried with and without this. Since s3 is not region-specific, I don't
  // think it should be necessary.
  // AWS.config.update({region: 'us-west-2'})

  //from react audio player version
  //const params = { Bucket: "nftfm-music", Key: req.body.key, Expires: 60 * 5 };
  //const url = s3.getSignedUrl('getObject', params)
  //res.status(200).send(url);
  const s3 = getBucket();

  s3.getObject(
    { Bucket: "nftfm-music", Key: req.body.key },
    function (error, data) {
      const end = Date.now();
      console.log(end - start);
      if (error != null) {
        console.log("Failed to retrieve an object: " + error);
        res.status(500).send("Couldnt retrieve song of music");
        return;
      } else {
        console.log("Loaded " + data.ContentLength + " bytes");
        res.status(200).send(data); // successful response
      }
    }
  );
});

router.post("/getSongList", async (req, res) => {
  const account = req.body.account;
  console.log("account: ", account);
  const params = {
    Bucket: "nftfm-music",
    Prefix: account,
  };
  var AWS = require("aws-sdk");
  AWS.config.region = "us-west-2";
  const path = require("path");

  // AWS.config.loadFromPath(path.join(__dirname, '../aws_config.json'));
  var s3 = getBucket();
  s3.listObjectsV2(params, function (err, data) {
    console.log(data);
    if (err) console.log(err, err.stack);
    // an error occurred
    else res.status(200).send(data); // successful response
  });
});

//this will change dramatically with the introduction of smart contracts
router.post("/purchase", async (req, res) => {
  try {
    console.log("purchase hit", req.body);
    let nft = await NftType.findOne({ _id: req.body.id });
    if (!nft) {
      res.status(500).send("No NFT found");
      return;
    }
    if (nft.numSold >= nft.numMinted) {
      res.status(500).send("Out of Stock");
      return;
    }
    let user = await User.findOne({ address: req.body.address });
    if (!user) {
      res.status(500).send("No user found");
      return;
    }
    console.log("mid", user, nft);

    user.nfts.push({ nft: nft._id, quantity: 1 });

    await user.save();
    nft.numSold++;
    await nft.save();

    trackNftPurchase({
      address: req.body.address,
      ip: req.body.ip,
      artistAddress: nft.address,
      nftId: nft.nftId,
      nftPrice: nft.price});
    console.log("end?", user, nft);
    res.status(200).send("Success!");
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

router.post("/newShare", async (req, res) => {
  try {
    const getNft = await NftType.findOne({ nftId: req.body.nftId });
    getNft.shareCount++;
    await getNft.save();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/get-by-nftId", async (req, res) => {
  try {
    console.log("2");
    const getNft = await NftType.findOne({ nftId: req.body.nftId });
    console.log("3");
    res.status(200).send(findLikes(getNft, req.body.address));
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

module.exports = router;
