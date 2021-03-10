const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = require('mongodb').ObjectID;

const MarketSchema = new Schema({
	pool1: {
		name: {
			type: String,
			default: ""
		},
		graphic: {
			type: String,
			default: ""
		},
		icon: {
			type: String,
			default: ""
		},
	},
	pool2: {
		name: {
			type: String,
			default: ""
		},
		graphic: {
			type: String,
			default: ""
		},
		icon: {
			type: String,
			default: ""
		},
	},
	description: {
		type: String,
		default: ""
	},
	resolution: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: "",
	},
	background: {
		type: String,
		default: ""
	},
	styles: {
		type: String,
		default: ""
	},
	primary: {
		type: Boolean,
		default: false
	},
	battleType: {
		type: String,
		default: ""
	},
	bettingStart: {
		type: Number,
		default: 0
	},
	bettingEnd: {
		type: Number,
		default: 0
	},
	battleEnd: {
		type: Number,
		default: 0
	},
});

module.exports = Market = mongoose.model("market", MarketSchema);