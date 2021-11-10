const express = require("express");
const router = express.Router();
const NftType = require("../schemas/NftType.schema");
const User = require("../schemas/User.schema");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const ArtistMail = (artistEmail, nft) => {
  console.log(0);
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
        <p>There are now ${nft.numSold - nft.quantity} / ${
    nft.quantity
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

const UserMail = (userEmail, nft) => {
  console.log(0);
  const OAuth2Client = new google.auth.OAuth2(
    process.env.NOTIFICATION_OAUTH_CLIENT_ID,
    process.env.NOTIFICATION_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  OAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  console.log(1);
  let accessToken = "";
  const getAToken = async () => {
    accessToken = await OAuth2Client.getAccessToken();
    return accessToken;
  };
  getAToken();
  console.log(2);

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
  console.log(3);

  //this is the email body
  var message = `<html>
        <div>
        <p>You purchased ${nft.title} by ${artist}! </p>
        <p>Listen to your new NFT in your <a href="https://beta.fanfare.fm/library">Library</a></p>
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
    //send to artist and to user
    ArtistMail("whyquinn@gmail.com", req.body.nft);
    // UserMail("whyquinn@gmail.com");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
