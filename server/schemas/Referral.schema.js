const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmailListSchema = new Schema({
  referrer: {
    type: String,
  },
  joiner: {
    type: String
  }
});

module.exports = EmailList = mongoose.model('refferal', EmailListSchema)
