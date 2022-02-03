const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const User = require("../schemas/User.schema");
const Referral = require('../schemas/Referral.schema')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const ArtistMail = (artistEmail, nft) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.NOTIFICATION_OAUTH_CLIENT_ID,
    process.env.NOTIFICATION_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const getAToken = async () => {
    let accessToken = await OAuth2Client.getAccessToken();
    return accessToken;
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.NOTIFICATION_EMAIL_ADDRESS,
      pass: process.env.NOTIFICATION_EMAIL_PASSWORD,
      clientId: process.env.NOTIFICATION_OAUTH_CLIENT_ID,
      clientSecret: process.env.NOTIFICATION_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.NOTIFICATION_REFRESH_TOKEN,
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

  //this is the email body
  var message = `<html>
        <div>
        <p>Someone purchased your ${nft.title} NFT! Congratulations!</p>
        <p>There are now ${nft.numMinted - nft.numSold}/${
    nft.numMinted
  } copies for sale.</p>
        </div>
        </html>`;

  var mail = {
    from: "Fanfare <info@nftfm.io>", //sender email
    to: artistEmail, // receiver email
    subject: "New NFT Sale!",
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

const UserMail = (userEmail, data) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.NOTIFICATION_OAUTH_CLIENT_ID,
    process.env.NOTIFICATION_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const getAToken = async () => {
    let accessToken = await OAuth2Client.getAccessToken();
    return accessToken;
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.NOTIFICATION_EMAIL_ADDRESS,
      pass: process.env.NOTIFICATION_EMAIL_PASSWORD,
      clientId: process.env.NOTIFICATION_OAUTH_CLIENT_ID,
      clientSecret: process.env.NOTIFICATION_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.NOTIFICATION_REFRESH_TOKEN,
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

  //this is the email body
  var message = `<html>
        <div>
        <p>Thank you for your purchase of ${data.title} by ${data.artist}! </p>
        <p>Listen to your new NFT in your <a href="https://beta.fanfare.fm/library">Library</a></p>
        <p>Discover amazing new music in our <a href="https://beta.fanfare.fm/discover">Marketplace</a>!</p>
        <p>Keep in touch with the Fanfare community here: <a href="https://t.me/fanfare_fm">https://t.me/fanfare_fm</a></p>
        </div>
        </html>`;

  var mail = {
    from: "Fanfare <info@nftfm.io>", //sender email
    to: userEmail, // receiver email
    subject: "Your NFT Purchase!",
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
router.post("/sendPurchaseEmails", async (req, res) => {
  try {
    console.log("sendPurchaseNotification hit", req.body);
    let artist = await User.findOne({ address: req.body.nft.address });
    //send to artist and to user
    // ArtistMail(artist.email, req.body.nft);
    if (req.body.user.email != "") {
      // UserMail(req.body.user.email, {
      //   title: req.body.nft.title,
      //   artist: artist.username,
      // });
    }
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/referral', async (req, res) => {
  if (req.body.referrer === req.body.joiner || !req.body.referrer || !req.body.joiner)
    return res.sendStatus(200)
  try {
    let referral = await Referral.findOne({joiner: req.body.joiner})
    if (referral){
      res.sendStatus(200)
    }
    else {
      let newReferral = new Referral({
        referrer: req.body.referrer,
        joiner: req.body.joiner
      })
      await newReferral.save()
      res.sendStatus(200)
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;
