const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftTypeSchema = new Schema({
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
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
    default: "",
  },
  draft: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  audioUrl: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = NftType = mongoose.model('type', NftTypeSchema);