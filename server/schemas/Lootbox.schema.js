const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lootboxSchema = new Schema({
	rewards: [
		{
			chance: {
				type: Number,
				required: true,
			},
			stock: {
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
			}
		},
	],
});

module.exports = Lootbox = mongoose.model('lootbox', lootboxSchema)
