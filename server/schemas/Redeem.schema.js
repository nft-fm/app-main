const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RedeemSchema = new Schema({
  nftId: {
    type: Number,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = Redeem = mongoose.model("redeem", RedeemSchema);
