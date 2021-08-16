const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const cookieParser = require("cookie-parser");
// const web3Router = require('./routes/unused/web3.router')
const userRouter = require("./routes/user.router");
const nftTypeRouter = require("./routes/nft-type.router");
const nftRouter = require("./routes/nft.router");
const govRouter = require("./routes/gov.router");
const airRouter = require("./routes/airdrop.router");
const connectDB = require("./modules/db");
const sessionMiddleware = require("./middleware/session-middleware");
const path = require("path");
const adminPollRouter = require("./routes/admin-poll.router");
const vinylOwnerRouter = require("./routes/vinyl-owner.router");
const Mixpanel = require('mixpanel');
const { listenForMint } = require("./web3/mint-listener");

const PORT = process.env.PORT || 5000;

//ensures https is used
function ensureSecure(req, res, next) {
  if (req.headers["x-forwarded-proto"] === "https") {
    return next();
  }
  res.redirect("https://" + req.hostname + req.url);
}

if (process.env.PRODUCTION) {
  app.all("*", ensureSecure);
}

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

dotenv.config();
connectDB();
listenForMint();


app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static("build"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/api/user", userRouter);
app.use("/api/nft-type", nftTypeRouter);
app.use("/api/nft", nftRouter);
app.use("/api/gov", govRouter);
app.use("/api/vinyl-owner", vinylOwnerRouter);
app.use("/api/admin-poll", adminPollRouter);
app.use("/api/airdrop", airRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
