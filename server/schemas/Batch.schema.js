const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BatchSchema = new Schema({
  batchId: {
    type: Number,
    default: 1,
    unique: true
  },
  startTime: {
    type: Number,
    required: true
  }
})

module.exports = Batch = mongoose.model('batch', BatchSchema)
