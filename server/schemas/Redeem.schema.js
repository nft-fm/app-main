const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RedeemSchema = new Schema({
  address: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  email: {
    type: String,
  },
  first: {
    type: String,
  },
  last: {
    type: String,
  },
  home: {
    type: String,
  },
  apt: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
});

module.exports = Redeem = mongoose.model("redeem", RedeemSchema);
