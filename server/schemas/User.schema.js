const mongoose = require('mongoose')
const { stringToHex } = require('web3-utils')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  suburl: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  isArtist: {
    type: Boolean,
    default: true,
  },
  profilePic: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  shared: [
    {
      type: String
    }
  ],
  sold: {
    type: Number
  },
  x_nfts: [{
    nft: {
      type: String
    },
  },
  ],
})

module.exports = User = mongoose.model('user', UserSchema)
