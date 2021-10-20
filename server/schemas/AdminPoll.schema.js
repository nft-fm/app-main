const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminPollSchema = new Schema({
  pollId: {
    type: Number
  },
  question: {
    type: String
  },
  description: {
    type: String
  },
  options: [{
    type: Schema.Types.ObjectId,
    ref: "PollOption",
    required: true,
  }],
  winner: {
    type: Number
  },
  timestamp: {
    type: Date
  },
  endTime: {
    type: Date
  }
})

module.exports = AdminPoll = mongoose.model('adminPoll', AdminPollSchema)