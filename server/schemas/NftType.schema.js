const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NftTypeSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  artist: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = NftType = mongoose.model('type', NftTypeSchema);