const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const BattleSchema = new Schema({
	finished: {
		type: Boolean,
		default: false
	},
	day: {
		type: Number,
		default: 1
	},
	contract: {
		type: String,
		required: true,
	},
	associatedBattle: {
		type: Boolean,
		default: false,
	},
	associatedBattleId: {
		type: Schema.Types.ObjectId,
		ref: "battle",
	},
	choice1: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: new ObjectID(),
		},
		name: {
			type: String,
			default: ""
		},
		// percentChange: {
		// 	type: Number,
		// 	default: 0,
		// },
		totalBets: {
			type: Number,
			default: 0
		},
		bets: [{
			address: {
				type: String,
			},
			amount: {
				type: Number,
			},
			timestamp: {
				type: Number
			},
			txid: {
				type: String
			}
		}]
	},
	choice2: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: new ObjectID(),
		},
		name: {
			type: String,
			default: ""
		},
		// percentChange: {
		// 	type: Number,
		// 	default: 0,
		// },
		totalBets: {
			type: Number,
			default: 0
		},
		bets: [{
			address: {
				type: String,
			},
			amount: {
				type: Number,
			},
			timestamp: {
				type: Number
			},
			txid: {
				type: String
			}
		}]
	},
	season: {
		type: Number,
		default: 1,
	},
	// usesPercentChange: {
	// 	type: Boolean,
	// 	default: false,
	// }
});

module.exports = Battle = mongoose.model("battle", BattleSchema);