const { findAllByDisplayValue } = require('@testing-library/dom');
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
  x_numSold: {
    type: Number,
    default: 0,
  },
  numMinted: {
    type: Number,
    default: 0,
  },
  isMinted: {
    type: Boolean,
    default: false,
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