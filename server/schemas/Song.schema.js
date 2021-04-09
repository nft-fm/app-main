const mongoose = require('mongoose')
const { stringToHex } = require('web3-utils')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  producer: {
    type: String,
    default: "",
  },
  cover: {
    type: String,
    default: "",
  },
  trackUrl: {
      type: String,
      default: "",
  },
  totalMinted: {
      type: Number,
      default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = Song = mongoose.model('song', SongSchema)
