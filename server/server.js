const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app)
const cookieParser = require('cookie-parser')
// const web3Router = require('./routes/unused/web3.router')
const cmsRouter = require('./routes/unused/cms.router')
const govRouter = require('./routes/gov.router')
const nftTypeRouter = require('./routes/nft-type.router')
const nftRouter = require('./routes/nft.router')
const battleRouter = require('./routes/battle.router')
const marketsRouter = require('./routes/unused/market.router')
const connectDB = require('./modules/db')
const passport = require('./modules/passport')
const sessionMiddleware = require('./middleware/session-middleware')
const path = require('path')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

dotenv.config()
connectDB()

app.use(cookieParser())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('api/cms', cmsRouter)
// app.use('api/api', web3Router)
app.use('/api/gov', govRouter)
app.use('/api/nft-type', nftTypeRouter)
app.use('/api/nft', nftRouter)
app.use('/api/battle', battleRouter)
// app.use('api/markets', marketsRouter)

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
