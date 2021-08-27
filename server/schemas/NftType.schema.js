const { findAllByDisplayValue } = require("@testing-library/dom");
const mongoose = require("mongoose");
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
    default: 0,
  },
  numMinted: {
    type: Number,
    default: 0,
  },
  numSold: {
    type: Number,
    default: 0,
  },
  startTime: { //this is for future implementation of snippet start times
    type: Number,
    default: 0,
  },
  dur: {
    type: Number,
    required: true,
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
  videoUrl: {
    type: String,
  },
  numListens: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  badges: [
    {
      founder: {
        type: Boolean,
      },
    },
    {
      premium: {
        type: Boolean,
      },
    },
    {
      prerelease: {
        type: Boolean,
      },
    },
    {
      exclusive: {
        type: Boolean,
      },
    },
  ],
  likes: [
    {
      type: String,
    },
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
    default: Date.now,
  },
  isRedeemable: {
    type: Boolean,
  },
  redeemedBy: [
    {
      type: String,
    },
  ],
});

module.exports = NftType = mongoose.model("type", NftTypeSchema);
