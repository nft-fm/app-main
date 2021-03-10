const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const PersBattleSchema = new Schema({
	finished: {
		type: Boolean,
		default: false
	},
	day: {
		type: Number,
		default: 1
	},
	pool1: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: new ObjectID(),
		},
		name: {
			type: String,
			default: ""
		},
		totalVotes: {
			type: Number,
			default: 0
		},
		votes: [{
			address: {
				type: String,
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
		}]
	},
	pool2: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: new ObjectID(),
		},
		name: {
			type: String,
			default: ""
		},
		totalVotes: {
			type: Number,
			default: 0
		},
		votes: [{
			address: {
				type: String,
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
		}]
	},
	season: {
		type: Number,
		default: 1,
	}
});

module.exports = PersBattle = mongoose.model("persbattle", PersBattleSchema);