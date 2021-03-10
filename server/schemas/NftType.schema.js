const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NftTypeSchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
    unique: true
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
  //  currently unused?
  mintLimit: {
    type: Number,
  },
  numMinted: {
    type: Number,
    default: 0,
  },
  stats: {
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

module.exports = NftType = mongoose.model('type', NftTypeSchema)