const mongoose = require('mongoose')
const { stringToHex } = require('web3-utils')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  numListens: {
    type: Number,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Song = mongoose.model('song', SongSchema)
