const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NftSchema = new Schema({
  nftId: {
    type: Number,
    required: true,
    unique: true,
  },
  assetId: {
    type: Number,
    required: true,
  },
  nftType: {
		type: Schema.Types.ObjectId,
		ref: "type",
		required: true,
  },
  receipt: {
		type: Schema.Types.ObjectId,
		ref: "receipt",
		required: true,
  },
  // owner: {
  //   type: String,
  // },
  // contractAddress: {
  //   type: String,
  //   required: true,
  // },
  // name: {
  //   type: String,
  //   default: "",
  // },
  // rarity: {
  //   type: Number,
  // },
  level: {
    type: Number,
    default: 0,
  },
  xp: {
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

module.exports = Nft = mongoose.model('nft', NftSchema);
