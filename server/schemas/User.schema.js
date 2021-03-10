const mongoose = require('mongoose')
const { stringToHex } = require('web3-utils')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "🦸‍♂️",
  },
  pictureColor: {
    type: String,
    default: "#1A8EB2",
  },
  idNum: {
    type: Number,
    default: 0,
  },
  battlesWon: {
    type: Number,
    default: 0,
  },
  battlesLost: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 1,
  },
  xp: {
    type: Number,
    default: 0,
  },
  activeNFT: {
    type: Number
  },
  // queue: [
  //   {
  //     move: {
  //       type: Number,
  //     }
  //   }
  // ],
  // betWinPercent: {
  //   type: Number,
  //   default: 0,
  // },
  // betAmountWon: {
  //   type: Number,
  //   default: 0,
  // },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = User = mongoose.model('user', UserSchema)
