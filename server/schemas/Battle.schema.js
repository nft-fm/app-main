const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const BattleSchema = new Schema({
	finished: {
		type: Boolean,
		default: false
	},
	contestant1: {
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		nft: {
			type: Schema.Types.ObjectId,
			ref: "nft",
			required: true,
		},
		nftId: {
			type: Number,
		},
		contractAddress: {
			type: String,
		},
		health: {
			type: Number
		}
	},
	contestant2: {
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		nft: {
			type: Schema.Types.ObjectId,
			ref: "nft",
			required: true,
		},
		nftId: {
			type: Number,
		},
		contractAddress: {
			type: String,
		},
		health: {
			type: Number
		}
	},
	winner: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	history: [{
		contestant1Move: {
			type: String,
		},
		contestant2Move: {
			type: String,
		},
		contestant1Health: {
			type: Number,
		},
		contestant2Health: {
			type: Number,
		},
	}],
	ranked: {
		type: Boolean,
		default: false,
	},
	version: {
		type: String,
		default: "1.0.0"
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
});

module.exports = Battle = mongoose.model("battle", BattleSchema);