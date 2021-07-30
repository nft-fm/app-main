const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirdropSchema = new Schema({
  batch: {
    type: Date,
    default: Date.now(),
  },
  nftId: {
    type: Number,
    required: true,
  },
  holders: [
    {
      address: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = Airdrop = mongoose.model("airdrop", AirdropSchema);
