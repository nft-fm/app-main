const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const multer = require("multer");
const AWS = require("aws-sdk");

const getBucket = () => {
  return new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
};

router.get("/getAllMintedNfts", async (req, res) => {
  try {
    const allNfts = await NftType.find({"audioUrl" : {"$exists" : true, "$ne" : ""}}, {address: 1, audioUrl: 1, title: 1, artist: 1, isMinted: 1, startTime: 1});
    console.log(allNfts);
    res.send(allNfts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/updateSnnipetAWS", async (req, res) => {
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
        cb(null, req.body.artist + "/30_sec_snnipets/" + file.originalname);
      },
    }),
 
  });

  const singleUpload = upload.single("audioFile");
  singleUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json(err);
    } else {
      return res.json({ success: true });
    }
  });
});

router.get("/verifyForEmpty", async (req, res) => {
  try {
    let dontHaveSnnipet = [];
    const allNfts = await NftType.find({"audioUrl" : {"$exists" : true, "$ne" : ""}}, {address: 1, audioUrl: 1, title: 1, artist: 1});
    
    for (let i = 0; i < allNfts.length; i++) {
      const nft = allNfts[i];

      const s3 = getBucket();

      const key = nft.address + "/30_sec_snnipets/" + nft.audioUrl.split("/").slice(-1)[0];
      const params = { Bucket: "nftfm-music", Key: key};

      const headCode = await s3.headObject(params).promise().catch(err => {console.log("no snnipet")})

      if (!headCode) {
        console.log("no snnipet");
        dontHaveSnnipet.push(nft);
      } else {
        console.log("has snnipet");
      }
    }
    res.json(dontHaveSnnipet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;