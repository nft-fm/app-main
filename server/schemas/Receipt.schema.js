const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema({
	winner: {
		type: String,
		required: true,
	},
	saleId: {
		type: Number,
		required: true,
	},
	asset: {
		type: String,
		required: true,
	},
	assetId: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	r: {
		type: String,
		required: true,
	},
	s: {
		type: String,
		required: true,
	},
	v: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
});

module.exports = Receipt = mongoose.model('receipt', ReceiptSchema)
