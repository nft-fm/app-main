const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	description: {
		type: String,
		default: ""
	},
	link: {
		text: {
			type: String,
			default: "",
		},
		url: {
			type: String,
			default: "",
		}
	},
	day: {
		type: Number,
		default: 1
	},
	options: [
		{
			name: {
				type: String,
				default: ""
			},
			totalVotes: {
				type: Number,
				default: 0
			},
			votes: [{
				type: String
			}]
		}
	],
	season: {
		type: Number,
		default: 1,
},
});

module.exports = Question = mongoose.model("question", QuestionSchema);