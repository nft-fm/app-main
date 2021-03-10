const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftTypeSchema = new Schema({
  assetId: {
    type: Number,
    required: true,
    unique: true
  },
  contractAddress: {
    type: String,
  },
  picture: {
    type: String,
  },
  rarity: {
    type: Number,
  },
  name: {
    type: String,
  },
  mintLimit: {
    type: Number,
  },
  numMinted: {
    type: Number,
    default: 0,
  },
  baseStats: {
    attack: {
      type: Number,
    },
    defense: {
      type: Number,
    },
    heal: {
      type: Number,
    }
  },
  // moves: [{
  //   name: {
  //     type: String,
  //   },
  //   physical: {
  //     type: Boolean,
  //   },
  //   baseDamage: {
  //     type: Number,
  //   },
  // }],
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = NftType = mongoose.model('type', NftTypeSchema);