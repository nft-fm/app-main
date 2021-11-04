const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  account: {
    type: String,
    required: true,
    unique: true
  },
  musicLinks: {
    type: String,
    required: true,
  },
});

module.exports = Application = mongoose.model("application", ApplicationSchema);
