const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const cookieParser = require('cookie-parser')
// const web3Router = require('./routes/unused/web3.router')
const userRouter = require('./routes/user.router')
const nftTypeRouter = require('./routes/nft-type.router')
const nftRouter = require('./routes/nft.router')
const govRouter = require('./routes/gov.router')
const connectDB = require('./modules/db')
const sessionMiddleware = require('./middleware/session-middleware')
const path = require('path')
const { listenForMint } = require("./web3/mint-listener");

const PORT = process.env.PORT || 5000

function ensureSecure(req, res, next) {
  if (req.headers["x-forwarded-proto"] === "https") {
    // OK, continue
    return next();
  };
  res.redirect('https://' + req.hostname + req.url);
};

if (process.env.PRODUCTION) {
  app.all('*', ensureSecure);
}

app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

dotenv.config();
connectDB();

listenForMint();

app.use(cookieParser())
app.use(sessionMiddleware)

app.use(express.static('build'))
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));

app.use('/api/user', userRouter)
app.use('/api/nft-type', nftTypeRouter)
app.use('/api/nft', nftRouter)
app.use('/api/gov', govRouter)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      console.log(err);
    }
  })
})


server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
