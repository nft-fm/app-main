const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VinylOwnerSchema = new Schema({
  owners: []
})

module.exports = VinylOwner = mongoose.model('vinylOwner', VinylOwnerSchema)