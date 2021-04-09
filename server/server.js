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
const connectDB = require('./modules/db')
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

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userRouter)
app.use('/api/nft-type', nftTypeRouter)

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