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
    default: "🤑",
  },
  pictureColor: {
    type: String,
    default: "#002450",
  },

  participatedBattles: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: "battle",
      required: true,
    },
    won: {
      type: Boolean,
    },
  }],

  defender: {
    type: Schema.Types.ObjectId,
    ref: "nft",
  },
  queue: [
    {
      move: {
        type: Number,
      }
    }
  ],

  battleWinPercent: {
    type: Number,
    default: 0,
  },
  //  based off of sum of NFT
  // rank: {
  //   type: Number,
  //   default: 0,
  // },
  // exp: {
  //   type: Number,
  //   default: 0,
  // },

  // participatedBets: [{
  //   id: {
  //     type: Schema.Types.ObjectId,
  //     ref: "bet",
  //     required: true,
  //   },
  //   value: {
  //     type: Number,
  //   },
  //   won: {
  //     type: Boolean,
  //   },
  //   amountWon: {
  //     type: Number,
  //   }
  // }],
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
