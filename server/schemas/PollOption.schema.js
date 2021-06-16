const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PollOptionSchema = new Schema({
  pollId: {
    type: Number
  },
  message: {
    type: String,
    required: true,
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
      required: true,
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

module.exports = PollOption = mongoose.model('poll-option', PollOptionSchema)