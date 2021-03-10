const express = require('express')
const cron = require('node-cron')
const axios = require('axios');
const router = express.Router()
const Leaderboard = require('../../schemas/Leaderboard.schema')
const PersLeaderboard = require('../../schemas/unused/PersLeaderboard.schema')
const Question = require('../../schemas/unused/DailyQuestion.schema')
const Battle = require('../../schemas/Battle.schema')
const PersBattle = require('../../schemas/unused/PersBattle.schema')
const User = require('../../schemas/User.schema')
const abi = require('../../modules/BATTLEPool.json')
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const { use } = require('passport');
const { getByDisplayValue } = require('@testing-library/react');
// const Contract = require('web3-eth-contract');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/a768678405854cf584ae620be7844cc3'))
const contract = new web3.eth.Contract(abi.abi, '0xa9CDb5e3C911884Ca6D4b32273c219B536Ee9e6A')

// console.log(contract.methods);
// let value = contract.methods.balanceOf('0x0f93e12029b7a934b40443889eea09dea97d48a9').call();



function getDay() {
	let day = Math.floor((((Date.now() / 1000) - 3600 - 1601406000) / 86400) + 1)

	console.log(day);
	return day
}


// User.updateMany(
//   {},
//   { $set: { participatedBattles: [] } },
//   { multi: true },
//   function (err, data) {
//     if (!err) {
//       console.log('success!')
//     } else {
//       console.log('ERROR')
//     }
//   }
// )

// const reCalcUserBattles = async () => {
// 	let battles = await PersBattle.find({ day: { $lte: 57 }});
// 	console.log("battles", battles)
// 	updateUserHistory(battles);
// }
// reCalcUserBattles();

const reCalcWin = async () => {
	let allUsers = await User.find();
	for (let user of allUsers) {
		user.battleWinPercent = calcWinPercent(user.participatedBattles);
		console.log("updateUserHistory", user);
		await user.save();
	}
}
// reCalcWin();

// const testBattleFinalization = async () => {
// 	let today = getDay()
// 	let persBattles = await PersBattle.find({ day: today, finished: false })
// 	console.log("test finalization: ", persBattles);
// 	finishPersBattle(persBattles);
// }
// testBattleFinalization();


cron.schedule('0 * * * *', async () => {
	let today = getDay()
	let tomorrow = Math.floor(((Date.now() / 1000 - 1601406000) / 86400) + 1)
	console.log(today, tomorrow);

	if (tomorrow > today) {
		let battles = await Battle.find({ day: today, finished: false, season: process.env.SEASON, usesPercentChange: false })
		let persBattles = await PersBattle.find({ day: today, finished: false })
		let newBattlesPhase1 = await Battle.find({ day: today, finished: false, season: process.env.SEASON, usesPercentChange: true });
		let newBattlesPhase2 = await Battle.find({ day: today - 1, finished: false, season: process.env.SEASON, usesPercentChange: true });
		console.log("cronjob", battles, newBattlesPhase1, newBattlesPhase2);
		if (battles.length) {
			finishBattle(battles)
		}
		if (newBattlesPhase1.length) {
			countEndVotesPhase1(newBattlesPhase1)
		}
		if (newBattlesPhase2.length) {
			newFinishBattle(newBattlesPhase2)
		}
		if (persBattles.length) {
			finishPersBattle(persBattles)
		}
	}
});

router.post('/test-finish', async (req, res) => {
	const today = getDay();
	let battles = await Battle.find({ day: today, finished: false, season: process.env.SEASON, usesPercentChange: false })
	let persBattles = await PersBattle.find({ day: today, finished: false, season: process.env.SEASON })
	let newBattlesPhase1 = await Battle.find({ day: today, finished: false, season: process.env.SEASON, usesPercentChange: true });
	let newBattlesPhase2 = await Battle.find({ day: today - 1, finished: false, season: process.env.SEASON, usesPercentChange: true });
	console.log("cronjob", persBattles);
	if (battles.length) {
		finishBattle(battles)
	}
	if (newBattlesPhase1.length) {
		countEndVotesPhase1(newBattlesPhase1)
	}
	if (newBattlesPhase2.length) {
		newFinishBattle(newBattlesPhase2)
	}
	if (persBattles.length) {
		finishPersBattle(persBattles)
	}
})

router.post('/previous-battles', async (req, res) => {
	try {
		let battles = await Battle.find({ day: req.body.day, finished: true, season: process.env.SEASON })
		res.send(battles)
	} catch (error) {
		console.log(error);
		res.status(500).send('error retrieving info')
	}
})

router.post('/previous-questions', async (req, res) => {
	try {
		const thisDay = req.body.day;
		let questions = await Question.find({ day: { $lte: thisDay }, season: process.env.SEASON })
		res.send(questions)
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})

router.post('/vote', async (req, res) => {
	if (!req.body) {
		res.sendStatus(500)
		return
	}
	try {
		let s = {
			address: req.body.address,
			vote: req.body.vote
		}
		console.log("s", s);
		const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
		console.log("signing", req.body.address, signingAddress)
		let day = getDay()
		let votes = new BigNumber(await contract.methods.balanceOf(req.body.address).call()).dividedBy(10 ** 18).toFixed(18)
		if (req.body.vote[0]._id) {
			if (req.body.address !== signingAddress || parseFloat(votes) === 0) {
				parseFloat(votes) === 0 ? res.status(403).send("empty balance") :
					res.status(401).send("signature mismatch");
				return
			}

			req.body.vote.forEach(async r => {
				let battle = await Battle.findOne({ _id: r._id, day: day, finished: false })
				if (battle.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1 || battle.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1) {
					res.status(403).send("duplicate votes");
					return
				}
				if (battle.pool1.name === r.vote) {
					battle.pool1.totalVotes += parseFloat(votes)
					battle.pool1.votes.push({ address: req.body.address, amount: parseFloat(votes), timestamp: Date.now(), sig: req.body.sig })
					await battle.save()
				}
				if (battle.pool2.name === r.vote) {
					battle.pool2.totalVotes += parseFloat(votes)
					battle.pool2.votes.push({ address: req.body.address, amount: parseFloat(votes), timestamp: Date.now(), sig: req.body.sig })
					await battle.save()
				}
			})
		}
		if (req.body.questionResponse) {
			voteOnQuestion(req.body.address, req.body.questionResponse)
		}
		res.send("ok")
	} catch (error) {
		console.log(error);

		res.status(500).send(error)
	}
})

async function voteOnQuestion(address, response) {
	try {
		let day = getDay()
		let question = await Question.findOne({ day: day })
		let index = question.options.findIndex(option => option.name === response)
		question.options[index].totalVotes++
		question.options[index].votes.push(address)
		await question.save()
	} catch (error) {
		console.log(error);
	}
}

router.post('/status', async (req, res) => {
	// console.log(req.body.address);
	try {
		let day = getDay()
		let battles = await Battle.find({ day: day })
		let battle1 = battles[0] || null
		let battle2 = battles[1] || null
		if (!battle1 && !battle2) {
			res.send(true)
			return;
		}
		if (battle1 && !battle2) {
			if ((battle1.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1)
				|| (battle1.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1)) {
				res.send(true)
				return
			} else {
				res.send(false)
				return
			}
		}
		if ((battle1.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1)
			|| (battle1.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1)
			|| (battle2.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1)
			|| (battle2.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1)
		) {
			res.send(true)
		} else {
			res.send(false)
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('error')
	}
})

router.get('/battles', async (req, res) => {
	try {
		let day = getDay()

		let battles = await Battle.find({ day: day, finished: false })
		for (let i = 0; i < battles.length; i++) {
			battles[i].pool1.votes = null
			battles[i].pool2.votes = null
		}

		const prevDayBattles = await Battle.find({ day: day - 1, finished: false, usesPercentChange: true });

		let schedule = await Battle.find({ finished: false, day: { $gt: day }, season: process.env.SEASON })
		let dailyQuestion = await Question.findOne({ day: day })
		if (!battles.length) dailyQuestion = [];
		res.send({ battles, schedule, dailyQuestion, prevDayBattles })
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrievg info')
	}
})

router.post('/battle-votes', async (req, res) => {
	try {
		let battles = await Battle.findOne({ _id: req.body.battleId, finished: true })
		res.send(battles)
	} catch (error) {
		console.log(error);
		res.status(500).send('error retrieving info')
	}
})

router.post('/season-info', async (req, res) => {
	try {
		let history = await Battle.find({ finished: true, season: req.body.season })
		for (let i = 0; i < history.length; i++) {
			history[i].pool1.votes = null
			history[i].pool2.votes = null
		}
		let leaderboard = await Leaderboard.findOne({ season: req.body.season })
		res.send({ history, leaderboard })
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})

// TWITTER PERSONALITY BATTLES (may be relocated)

router.post('/pers-battle-votes', async (req, res) => {
	try {
		let battles = await PersBattle.findOne({ _id: req.body.battleId, finished: true })
		res.send(battles)
	} catch (error) {
		console.log(error);
		res.status(500).send('error retrieving info')
	}
})

router.post('/pers-info', async (req, res) => {
	try {
		let history = await PersBattle.find({ finished: true, season: req.body.season })
		for (let i = 0; i < history.length; i++) {
			history[i].pool1.votes = null
			history[i].pool2.votes = null
		}
		let leaderboard = await PersLeaderboard.findOne({ season: req.body.season })
		res.send({ history, leaderboard })
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrieving info')
	}
})

router.post('/pers-vote', async (req, res) => {
	if (!req.body || !req.body.sig) {
		res.sendStatus(500)
		return
	}
	try {
		let s = {
			address: req.body.address,
			vote: req.body.vote
		}
		console.log("s", s);
		const signingAddress = web3.eth.accounts.recover(JSON.stringify(s), req.body.sig);
		console.log("signing", req.body.address, signingAddress)
		let day = getDay()
		let votes = new BigNumber(await contract.methods.balanceOf(req.body.address).call()).dividedBy(10 ** 18).toFixed(18)
		if (req.body.vote[0]._id) {
			if (req.body.address !== signingAddress || parseFloat(votes) === 0) {
				parseFloat(votes) === 0 ? res.status(403).send("empty balance") :
					res.status(401).send("signature mismatch");
				return
			}

			req.body.vote.forEach(async r => {
				let battle = await PersBattle.findOne({ _id: r._id, day: day, finished: false })
				if (battle.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1 || battle.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1) {
					res.status(403).send("duplicate votes");
					return
				}
				if (battle.pool1.name === r.vote) {
					battle.pool1.totalVotes += parseFloat(votes)
					battle.pool1.votes.push({ address: req.body.address, amount: parseFloat(votes), timestamp: Date.now(), sig: req.body.sig })
					await battle.save()
				}
				if (battle.pool2.name === r.vote) {
					battle.pool2.totalVotes += parseFloat(votes)
					battle.pool2.votes.push({ address: req.body.address, amount: parseFloat(votes), timestamp: Date.now(), sig: req.body.sig })
					await battle.save()
				}
			})
		}
		res.send("ok")
	} catch (error) {
		console.log(error);

		res.status(500).send(error)
	}
})

router.post('/pers-status', async (req, res) => {
	console.log(req.body.address);
	try {
		let day = getDay()
		let battles = await PersBattle.find({ day: day })
		let battle1 = battles[0] || null
		let battle2 = battles[1] || null
		if (!battle1 && !battle2) {
			res.send(true)
			return;
		}
		if (battle1 && !battle2) {
			let p1 = battle1.pool1.votes.findIndex(vote => vote.address === req.body.address)
			let p2 = battle1.pool2.votes.findIndex(vote => vote.address === req.body.address)
			if ((p1 !== -1) || (p2 !== -1)) {
				let response = p1 !== -1 ? "1" : "2" // this is goofy, it arrives on the frontend as a number!!!!
				res.send(response)
				return
			} else {
				res.send(false)
				return
			}
		}
		// if ((battle1.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1)
		// 	|| (battle1.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1)
		// 	|| (battle2.pool1.votes.findIndex(vote => vote.address === req.body.address) !== -1)
		// 	|| (battle2.pool2.votes.findIndex(vote => vote.address === req.body.address) !== -1)
		// ) {
		// 	console.log('ss');

		// 	res.send(true)
		// }
		else {
			console.log('ncn');

			res.send(false)
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('error')
	}
})

router.get('/pers-battles', async (req, res) => {
	try {
		let day = getDay()

		let battles = await PersBattle.find({ day: day, finished: false })
		for (let i = 0; i < battles.length; i++) {
			battles[i].pool1.votes = null
			battles[i].pool2.votes = null
		}

		let schedule = await PersBattle.find({ finished: false, day: { $gt: day }, season: process.env.SEASON })
		let yesterdaysBattle = await PersBattle.find({ day: day - 1, finished: true })

		res.send({ battles, schedule, yesterdaysBattle })
	} catch (error) {
		console.log(error);

		res.status(500).send('error retrievg info')
	}
})

router.post('/previous-pers-battles', async (req, res) => {
	try {
		let battles = await PersBattle.find({ day: req.body.day, finished: true })
		res.send(battles)
	} catch (error) {
		console.log(error);
		res.status(500).send('error retrieving info')
	}
})

/* -----FUNCTIONS-----  */

async function countEndVotes(battles) {
	for (let battle of battles) {
		battle.pool1.totalVotes = 0
		battle.pool2.totalVotes = 0
		for (let vote of battle.pool1.votes) {
			let staked = (new BigNumber(await contract.methods.balanceOf(vote.address).call())).dividedBy(10 ** 18).toFixed(18)
			vote.amount = staked
			battle.pool1.totalVotes += parseInt(staked)
		}
		for (let vote of battle.pool2.votes) {
			let staked = (new BigNumber(await contract.methods.balanceOf(vote.address).call())).dividedBy(10 ** 18).toFixed(18)
			vote.amount = staked
			battle.pool2.totalVotes += parseInt(staked)
		}
	}
	return battles
}

async function countEndVotesPhase1(battles) {
	for (let battle of battles) {
		battle.pool1.totalVotes = 0
		battle.pool2.totalVotes = 0
		for (let vote of battle.pool1.votes) {
			let staked = new BigNumber(await contract.methods.balanceOf(vote.address).call()).dividedBy(10 ** 18).toFixed(18)
			vote.amount = staked
			battle.pool1.totalVotes += parseInt(staked)
		}
		for (let vote of battle.pool2.votes) {
			let staked = new BigNumber(await contract.methods.balanceOf(vote.address).call()).dividedBy(10 ** 18).toFixed(18)
			vote.amount = staked
			battle.pool2.totalVotes += parseInt(staked)
		}
		battle.save()
	}
	return battles
}


async function newFinishBattle(battles) {
	try {
		let leaderboard = await Leaderboard.findOne({ season: process.env.SEASON })
		let prevDayBattles = battles
		for (let prevDayBattle of prevDayBattles) {
			const results = await calcWinner(prevDayBattle.pool1.name, prevDayBattle.pool2.name);
			console.log("res", results);
			prevDayBattle.pool1.percentChange = results.farmDelta1;
			prevDayBattle.pool2.percentChange = results.farmDelta2;
			prevDayBattle.finished = true;
			await prevDayBattle.save();
			email(prevDayBattles);
			let winner = leaderboard.leaderboard.findIndex(item => item.pool === results.winner)
			console.log("leaderboard", leaderboard, winner);
			leaderboard.leaderboard[winner].votes += (prevDayBattle.pool1.totalVotes + prevDayBattle.pool2.totalVotes);

		}
		await leaderboard.save()
	} catch (error) {
		console.error(err);
	}
}

async function finishBattle(battles) {
	try {
		let leaderboard = await Leaderboard.findOne({ season: process.env.SEASON })
		battles = await countEndVotes(battles)
		console.log("finishbattles", leaderboard, battles);
		//	old battle system
		for (let battle of battles) {
			let p1 = leaderboard.leaderboard.findIndex(item => item.pool === battle.pool1.name)
			leaderboard.leaderboard[p1].votes += battle.pool1.totalVotes
			let p2 = leaderboard.leaderboard.findIndex(item => item.pool === battle.pool2.name)
			leaderboard.leaderboard[p2].votes += battle.pool2.totalVotes
			battle.finished = true
			await battle.save()
		}
		await leaderboard.save()
	} catch (err) {
		// SEND ERROR EMAIL
		console.error(err);
	}
}

function calcWinPercent(battles) {
	let won = 0;
	let total = 0;
	for (total; total < battles.length; total++) {
		if (battles[total].won) won++;
	}
	const winPercent = total ? parseFloat(won / total) : 0;
	console.log("win%", winPercent);
	const participatedPercent = parseFloat(total / (getDay() - 51))
	return (parseInt((winPercent + participatedPercent) * 100 / 2));
}

async function finishPersBattle(battles) {
	try {
		console.log("finishPersBattle", battles);

		let leaderboard = await PersLeaderboard.findOne({ season: process.env.SEASON })
		battles = await countEndVotes(battles)
		await updateUserHistory(battles).then(async () => {
			await reCalcWin();
		})
		console.log("finishbattles", battles);
		for (let battle of battles) {
			let p1 = leaderboard.leaderboard.findIndex(item => item.pool === battle.pool1.name)
			leaderboard.leaderboard[p1].votes += battle.pool1.totalVotes
			let p2 = leaderboard.leaderboard.findIndex(item => item.pool === battle.pool2.name)
			leaderboard.leaderboard[p2].votes += battle.pool2.totalVotes
			battle.finished = true
			await battle.save()
		}
		await leaderboard.save()
	} catch (err) {
		// SEND ERROR EMAIL
		console.error(err);
	}
}

async function updateUserHistory(battles) {
	for (let battle of battles) {
		const pool1Won = battle.pool1.totalVotes > battle.pool2.totalVotes;
		console.log("update User Hist: ", battles);
		for (let vote of battle.pool1.votes) {
			let user = await User.findOne({ address: vote.address });
			if (!user) {
				user = new User({
					address: vote.address,
					participatedBattles: [{ id: battle._id, won: pool1Won, yield: vote.amount }],
					battleWinPercent: pool1Won ? 100 : 0,
				})
				console.log("fresh", user);
				await user.save();
			} else {
				user.participatedBattles.push({ id: battle._id, won: pool1Won, yield: vote.amount });
				user.battleWinPercent = calcWinPercent(user.participatedBattles);
				console.log("updateUserHistory", user);
				await user.save();
			}
		}
		for (let vote of battle.pool2.votes) {
			let user = await User.findOne({ address: vote.address });
			if (!user) {
				user = new User({
					address: vote.address,
					participatedBattles: [{ id: battle._id, won: !pool1Won, yield: vote.amount }],
					battleWinPercent: !pool1Won ? 100 : 0,
				})
				console.log("fresh", user);
				await user.save();
			} else {
				user.participatedBattles.push({ id: battle._id, won: !pool1Won, yield: vote.amount });
				user.battleWinPercent = calcWinPercent(user.participatedBattles);
				console.log("updateUserHistory", user);
				await user.save();
			}
		}
	}
}


	function getGeckoId(coin) {
		coin = coin.toLowerCase();
		switch (coin) {
			case "snx":
				return "havven";
			case "yfi":
				return "yearn-finance";
			case "comp":
				return "compound-governance-token";
			case "chads":
				return "chads-vc";
			case "wbtc":
				return "wrapped-bitcoin";
			case "uni":
				return "uniswap";
			case "wnxm":
				return "wrapped-nxm";
			case "mkr":
				return "maker";
			case "bzrx":
				return "bzx-protocol";
			case "srm":
				return "serum";
			case "farm":
				return "harvest-finance";
			case "based":
				return "based-money";
			case "yam":
				return "yam-2";
			case "send":
				return "social-send";
			case "hate":
				return "heavens-gate";
			case "stbu":
				return "stobox-token";
			case "yfl":
				return "yflink";
			case "snow":
				return "snowswap";
			case "pickle":
				return "pickle-finance";
			case "meme":
				return "degenerator";
			case "cream":
				return "cream-2";
			case "value":
				return "value-liquidity";
			case "link":
				return "chainlink";
			default:
				return (coin);
		}
	}

	const calcPercentChange = (start, end) => {
		let final = 0;
		if (start > end) {
			final = -100 * (start - end) / start;
		} else if (start < end) {
			final = 100 * (end - start) / start
		}
		return final;
	}

	async function calcWinner(farmName1, farmName2) {
		const delta1 = await axios.get(`https://api.coingecko.com/api/v3/coins/${getGeckoId(farmName1)}/market_chart?vs_currency=usd&days=1`).then(res => {
			const { prices } = res.data;
			return calcPercentChange(prices[0][1], prices[prices.length - 1][1])
		})
		const delta2 = await axios.get(`https://api.coingecko.com/api/v3/coins/${getGeckoId(farmName2)}/market_chart?vs_currency=usd&days=1`).then(res => {
			const { prices } = res.data;
			return calcPercentChange(prices[0][1], prices[prices.length - 1][1])
		})
		const winner = (delta1 > delta2 ? farmName1 : farmName2)
		console.log("diff", delta1, delta2, winner);
		return ({ winner, farmDelta1: delta1, farmDelta2: delta2 });
	}

	// const ObjectID = require('mongodb').ObjectID;
	// Battle.updateMany(
	// 	{},
	// 	{ $set: { "pool1._id": new ObjectID(), "pool2._id": new ObjectID() } },
	// 	{ multi: true },
	// 	function (err, data) {
	// 		if (!err) {
	// 			console.log('success!')
	// 		} else {
	// 			console.log('ERROR')
	// 		}
	// 	}
	// )

	module.exports = router