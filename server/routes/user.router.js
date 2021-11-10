const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../schemas/User.schema");
const EmailList = require("../schemas/EmailList.schema");
const NftType = require("../schemas/NftType.schema");
const Application = require("../schemas/Application.schema");
const Redeem = require("../schemas/Redeem.schema");
const {
  findLikes,
  getUserNftsETH,
  getUserNftsBSC,
} = require("../web3/server-utils");
const sendSignRequest = require("../modules/eversign");
const { utils } = require("ethers");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {
  trackNewUser,
  trackLogin,
  trackPageview,
} = require("../modules/mixpanel");

router.post("/get-account", async (req, res) => {
  try {
    let user = await User.findOne({ address: req.body.address });
    if (!user) {
      user = new User({
        address: req.body.address,
        isArtist: process.env.PRODUCTION ? false : true,
      });
      await user.save();
        trackNewUser({ address: req.body.address, ip: req.ip });
    }
      trackLogin({ address: req.body.address, ip: req.ip });

    //This overwrites the user's database nfts with the nfts attributed to the user in the smart contract
    //handles when user's buy/sell nfts off platform
    let ethUserNfts = await getUserNftsETH(user.address);
    let bscUserNfts = await getUserNftsBSC(user.address);
    let bothChainsNft = [...ethUserNfts, ...bscUserNfts];
    if (bothChainsNft) {
      user.nfts = [];
      for (let nft of bothChainsNft) {
        if (nft.quantity > 0) {
          let usersNft = await NftType.findOne({
            nftId: nft.id,
            chain: nft.chain,
          });
          if (usersNft) {
            user.nfts.push({ nft: usersNft._id, quantity: nft.quantity, chain: nft.chain });
          }
        }
      }
      user.save();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/add-email", async (req, res) => {
  try {
    console.log("adding", req.body);
    let user = await User.findOne({ address: req.body.address });
    user.email = req.body.email;
    await user.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("server error");
  }

}
)

router.post("/add-to-email-list", async (req, res) => {
  try {
    let emailList = await EmailList.findOne();
    if (!emailList) {
      emailList = new EmailList({
        emails: [],
      });
      await emailList.save();
      console.log("success");
      res.status(200).send("success");
      return;
    } else {
      emailList.emails = [...emailList.emails, req.body.email];
      emailList.save();
      res.status(200).send("success");
    }
  } catch (error) {
    res.status(500).send("server error");
  }

}
)

router.post("/track-pageview", async (req, res) => {
  try {
      trackPageview({
        hasMetamask: req.body.hasMetamask,
        address: req.body.account,
        ip: req.ip,
        page: req.body.page,
      });
    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/update-account", async (req, res) => {
  try {
    const findDuplicateName = await User.findOne({
      suburl: req.body.username.replace(/ /g, "").toLowerCase(),
    });
    if (
      findDuplicateName &&
      findDuplicateName.address.toLowerCase() != req.body.address.toLowerCase()
    ) {
      //if another account (checked by address) has the same name, send error
      res.status(403).send("Duplicate name");
    } else {
      let user = await User.findOne({ address: req.body.address });

      if (user.username != req.body.username) {
        const updateNfts = await NftType.updateMany(
          { address: user.address },
          { artist: req.body.username }
        );
      }

      user.username = req.body.username;
      user.suburl = req.body.username.replace(/ /g, "").toLowerCase();
      user.socials = req.body.aggregatedSocials;
      await user.save();

      res.send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// need to run this route on main site before this stuff will work?

// router.post('/update-nft-to-include-likes', async (req, res) => {
//   try {
//     const nfts = await NftType.find()

//     for (let nft of nfts) {
//       nft.likeCount = nft._doc.likes.length
//       await nft.save()
//     }

//     res.json(nfts);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json("failed to update likes 👎")
//   }
// })

router.post("/like-nft", async (req, res) => {
  try {
    let nft = await NftType.findOne({ _id: req.body.nft });
    let likeCount = 0;

    let hasLiked = nft.likes.indexOf(req.body.address);
    if (hasLiked < 0) {
      nft.likes = [...nft.likes, req.body.address];
    } else {
      let likes = nft.likes;
      likes.splice(hasLiked, 1);
      nft.likes = likes;
    }

    nft.likeCount = nft.likes.length

    await nft.save()

    res.send({
      nft: {
        ...nft._doc,
        liked: hasLiked < 0,
        likes: [],
        likeCount: likeCount,
      },
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

//create iam user
//check if folder for user exists, if not create one
//attach policy allowing them to access folder
router.post("/getNftFolder/:address", async (req, res) => {
  const address = req.params.address;
  var AWS = require("aws-sdk");
  AWS.config.region = "us-west-2";
  var s3Client = new AWS.S3();
  var checkForFolderParams = {
    Bucket: "nft-fm",
  };
  var createFolderParams = {
    Bucket: "nft-fm",
    Key: req.params.address,
    ACL: "public-read",
    Body: "body does not matter",
  };
  const checkForFolder = () => {
    s3Client.listObjectsV2(checkForFolderParams, (err, found) => {
      if (err) console.log(err);
      else {
        const folderExists = found.Contents.find((folder) => {
          return folder.Key == address;
        });
        if (folderExists) return true;
        else return false;
      }
    });
  };

  if (!checkForFolder())
    s3Client.upload(createFolderParams, function (err, data) {
      if (err) {
        res.status(400).send("error creating folder: ", err);
      } else {
        res.status(200).send("created folder!");
      }
    });
  else res.status(200).send("user folder already exists!");
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
    uploadParams.Key = address + "/" + path.basename(file);
    try {
      const data = await s3.send(new PutObjectCommand(uploadParams));
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
});

router.post("/uploadProfilePicS3", async (req, res) => {
  var AWS = require("aws-sdk");
  AWS.config.region = "us-west-2";
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
    }),
  });
  const singleUpload = upload.single("imageFile");
  singleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    User.findOneAndUpdate(
      { address: req.body.user },
      { profilePic: req.file.location }
    ).then(() => {
      return res.status(200).send(req.file);
    });
  });
});

router.post("/get-public-account", async (req, res) => {
  try {
    const getUser = await User.findOne({ suburl: req.body.suburl });
    const getNfts = await NftType.find({
      address: getUser.address,
      isDraft: false,
    });
    if (getUser) res.status(200).send([getUser, findLikes(getNfts)]);
    else return res.status(500).send("No User Found");
  } catch (err) {
    res.status(500).send(err);
  }
});

const NodeMail = (name, email, music, account) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  let accessToken = "";
  const getAToken = async () => {
    accessToken = await OAuth2Client.getAccessToken();
    return accessToken;
  };
  getAToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: getAToken(),
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var message = `<html>
      <div>
      <p>Hey! Someone applied to be an artist on Fanfare!</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Music: ${music}</p>
      <p>Account: ${account}</p>
      </div>
      </html>`;

  var mail = {
    from: "Jackson Felty <jackson@nftfm.io>", //sender email
    to: "jackson@nftfm.io", // receiver email
    subject: "New Artist Application",
    html: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("data", data);
    }
  });
};

router.post("/send-artist-form", async (req, res) => {
  try {
    const { name, email, account, musicLinks } = req.body;
    NodeMail(name, email, musicLinks, account); //sends Jackson and Quinn an email alerting them, can remove once new docusigner is found
    const sender = utils.verifyMessage(
      JSON.stringify({
        name: name,
        email: email,
        account: account,
        musicLinks: musicLinks,
      }),
      req.body.auth
    );
    if (sender !== account) return res.status(403).send("Credential error");

    let alreadyApplied = await Application.findOne({
      $or: [{ email: email }, { account: account }],
    });
    if (alreadyApplied) {
      return res.status(403).send("You have already submitted an application.");
    }
    let application = new Application({
      name,
      email,
      account,
      musicLinks,
    });
    await application.save();
    if (name && email) {
      sendSignRequest(req.body);
      return res.sendStatus(200);
    }
    res.sendStatus(401);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/shipping", async (req, res) => {
  try {
    let alreadyRedeemed = await Redeem.find({ address: req.body.address });
    if (!alreadyRedeemed.address) {
      alreadyRedeemed = new Redeem({
        address: req.body.address,
        quantity: 1,
        email: req.body.email,
        first: req.body.first,
        last: req.body.last,
        home: req.body.home,
        apt: req.body.apt,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
      });
      await alreadyRedeemed.save();
    } else {
      alreadyRedeemed.quantity++;
      await alreadyRedeemed.save();
    }

    res.status(200).send("Shipping updated!");
  } catch (err) {
    res.status(500).send(err);
  }
});

const newRedeemer = (address) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  let accessToken = "";
  const getAToken = async () => {
    accessToken = await OAuth2Client.getAccessToken();
    return accessToken;
  };
  getAToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: getAToken(),
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
      console.log("Server is ready to take our messages");
    }
  });

  var message = `<html>
      <div>
      <p>Hey! Someone entered their shipping information!</p>
      <p>Address: ${address}</p>
      </div>
      </html>`;

  var mail = {
    from: "Jackson Felty <jackson@nftfm.io>", //sender email
    to: "jackson@nftfm.io, quinn@nftfm.io", // receiver email
    subject: "Merch Redemption",
    html: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("data", data);
    }
  });
};

router.post("/updateRedeemers", async (req, res) => {
  try {
    let nft = await NftType.findOneAndUpdate(
      { nftId: req.body.nftId },
      { $push: { redeemedBy: req.body.address } },
      { new: true }
    );

    newRedeemer(req.body.address);

    res.status(200).send("Redeemers updated!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/signNewFee", async (req, res) => {
  try {
    const { account } = req.body;
    const sender = utils.verifyMessage(
      JSON.stringify({
        account: account,
      }),
      req.body.auth
    );
    if (sender !== account) return res.status(403).send("Credential error");
    let getUser = await User.findOneAndUpdate(
      { address: account },
      { confirmedFeeIncrease: true }
    );
    if (!getUser) return res.status(404).send("No user found!");
    if (getUser) res.status(200).send("User updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/getArtists", async (req, res) => {
  const usersToExclude = ["Fanfare", "NFT FM"];
  try {
    const artists = await User.find({
      isArtist: true,
      hasMinted: true,
      profilePic: { $exists: true },
      $and: usersToExclude.map(username => {
        return { "username": { $ne: username } };
      })
    });

    res.send(artists);
  } catch (err) { }
});

router.post("/saveStakedArtist", async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.account });

    //checks if artist is already in array, if not pushes artist in
    if (user) {
      user.stakedArtists.indexOf(req.body.artist) === -1
        ? user.stakedArtists.push(req.body.artist)
        : res.status(200).send("artist already saved!");
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500);
  }
});

router.post("/removeStakedArtist", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { address: req.body.account },
      { $pull: { stakedArtists: req.body.artist } },
      { new: true }
    );

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
