const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersLeaderboardSchema = new Schema({
	leaderboard: [
		{
			pool: {
				type: String,
				default: "@CryptoCobain"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@CryptoGainz1"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@CryptoMessiah"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@Sicarious_"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@CryptoWendyO"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@notsofast"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@crypto_core"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@ashtoshii"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@TheCryptoDog"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@loomdart"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@iamnomad"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@inversebrah"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@jebus911"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@bullyesq"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@bitcoinbella_"
			},
			votes: {
				type: Number,
				default: 0
			}
		},
		{
			pool: {
				type: String,
				default: "@Crypto_Bitlord"
			},
			votes: {
				type: Number,
				default: 0
			}
		}
	],
	season: {
		type: Number,
		default: 1,
},
});

module.exports = PersLeaderboard = mongoose.model("persleaderboard", PersLeaderboardSchema);