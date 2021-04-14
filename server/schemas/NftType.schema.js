const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftTypeSchema = new Schema({
  artist: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    default: "",
  },
  producer: {
    type: String,
    default: "",
  },
  writer: {
    type: String,
    default: "",
  },
  numMinted: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  draft: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = NftType = mongoose.model('type', NftTypeSchema);