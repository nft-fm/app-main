const mongoose = require('mongoose')
const { stringToHex } = require('web3-utils')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
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
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = User = mongoose.model('user', UserSchema)
