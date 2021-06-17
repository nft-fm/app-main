const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SuggestionSchema = new Schema({
  batch: {
    type: Number,
    default: 0,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sig: {
    type: String
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  votes: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    address: {
      type: String,
    },
    amount: {
      type: Number,
    },
    timestamp: {
      type: Number
    },
    sig: {
      type: String
    }
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
})

module.exports = Suggestion = mongoose.model('suggestion', SuggestionSchema)

