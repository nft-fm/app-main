const { findAllByDisplayValue } = require('@testing-library/dom');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftTypeSchema = new Schema({
  nftId: {
    type: Number,
  },
  title: {
    type: String,
    default: "",
  },
  artist: {
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
  price: {
    type: Number,
    default: 0
  },
  numMinted: {
    type: Number,
    default: 0
  },
  numSold: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Number,
    default: 0
  },
  dur: {
    type: Number,
    required: true
  },
  snnipet: {
    type: Array,
    default: []
  },
  address: {
    type: String,
    required: true,
    default: "",
  },
  imageUrl: {
    type: String,
    default: "",
  },
  audioUrl: {
    type: String,
    default: "",
  },
  numListens: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: String
    }
  ],
  shareCount: {
    type: Number,
    default: 0,
  },
  isMinted: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isDraft: {
    type: Boolean,
    default: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = NftType = mongoose.model('type', NftTypeSchema);