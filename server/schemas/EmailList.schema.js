const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmailListSchema = new Schema({
  emails: [{
    type: String,
  }],
});

module.exports = EmailList = mongoose.model('emailList', EmailListSchema)
