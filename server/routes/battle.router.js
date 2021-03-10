const express = require('express');
const router = express.Router()

const Battle = require('../schemas/Battle.schema')
const User = require('../schemas/User.schema')
const Nft = require('../schemas/Nft.schema')
const NftType = require('../schemas/NftType.schema')

const returnNft = require('../utils/return_nft');

const runBattle = require('../utils/battle_system');
const limit_nbr = require('../utils/limit_nbr');

const prepareHistory = async (battles, user) => {
	let final_battles = [];
	for (let i = 0; i < battles.length; i++) {
		let battle = battles[i];

		const contestant1 = battle.contestant1.user.toString() === user._id.toString() ?
			user : await User.findById(battle.contestant1.user);
		const contestant2 = battle.contestant2.user.toString() === user._id.toString() ?
			user : await User.findById(battle.contestant2.user);

		const contestant1_nft = await Nft.findOne({ nftId: battle.contestant1.nftId });
		const contestant2_nft = await Nft.findOne({ nftId: battle.contestant2.nftId });

		const contestant1_nftType = await NftType.findOne({ assetId: contestant1_nft.assetId });
		const contestant2_nftType = await NftType.findOne({ assetId: contestant2_nft.assetId });

		final_battles.push({
			won: battle.winner.toString() === user._id.toString(),
			contestant1: {
				nickname: contestant1.nickname,
				nft: returnNft(contestant1_nft, contestant1_nftType),
				idNum: contestant1.idNum
			},
			contestant2: {
				nickname: contestant2.nickname,
				nft: returnNft(contestant2_nft, contestant2_nftType),
				idNum: contestant2.idNum
			},
			timestamp: battle.timestamp
		})
	}

	return final_battles;
}
router.post('/battleHistory', async (req, res) => {
	try {
		const page = req.body.page;
		const limit = req.body.limit;
		let battles;

		const user = await User.findOne({ address: req.body.address });
		const filter_for_user = {
			$or: [{ "contestant1.user": user._id }, { "contestant2.user": user._id }],
			finished: true
		};

		console.log("battle props", page, limit);

		battles = await Battle.find(filter_for_user).sort({ timestamp: -1 }).skip(page * limit).limit(limit);
		battles = await prepareHistory(battles, user);
		res.send(battles)
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
});

router.post('/activeBattle', async (req, res) => {
	try {
		const loggedUser = await User.findOne({ address: req.body.address })
		const activeBattle = await Battle.findOne({
			"contestant1.user": loggedUser._id,
			finished: false
		});
		const opponentId = activeBattle.contestant2.user;

		const opponent = await User.findOne({ _id: opponentId });
		if (opponent) {
			const opponentNft = await Nft.findOne({ nftId: opponent.activeNFT });
			const nftType = await NftType.findOne({ assetId: opponentNft.assetId });
			if (opponentNft) {
				res.send({
					activeBattle: activeBattle,
					opponent: {
						...opponent._doc,
						nft: returnNft(opponentNft, nftType)
					}
				})
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
});

router.post('/opponents', async (req, res) => {
	try {
		const loggedUser = await User.findOne({ address: req.body.address })
		let users;
		if (req.body.rules) {
			let re = new RegExp(req.body.rules + "|" + req.body.rules.toUpperCase());
			users = await User.find({
				nickname: re,
				address: { $ne: req.body.address },
				activeNFT: { $exists: 1 },
			}).limit(5);
		} else {
			users = await User.find({
				address: { $ne: req.body.address },
				activeNFT: { $exists: 1 },
				rank: {
					$in: [loggedUser.rank - 3, loggedUser.rank - 2,
						loggedUser.rank - 1, loggedUser.rank,
						loggedUser.rank + 1, loggedUser.rank + 2,
						loggedUser.rank + 3]
				},
			}).limit(20);
		}


		res.send(users);
	} catch (error) {
		res.status(500).send("server error")
	}
})

router.post('/new', async (req, res) => {
	try {
		const user = await User.findOne({ address: req.body.address });
		const opponent = await User.findOne({ address: req.body.opponent.address });

		if (user && opponent) {
			const user_nft = await Nft.findOne({ nftId: user.activeNFT });
			const opponent_nft = await Nft.findOne({ nftId: opponent.activeNFT })

			if (user_nft && opponent_nft) {
				const newBattle = new Battle({
					contestant1: {
						user: user._id,
						nft: user_nft._id,
						nftId: user_nft.nftId,
						contractAddress: "lalala",
						health: user_nft.stats.heal,
					},
					contestant2: {
						user: opponent._id,
						nft: opponent_nft._id,
						nftId: opponent_nft.nftId,
						contractAddress: "lalala",
						health: opponent_nft.stats.heal,
					},
				});
				await newBattle.save();
				res.send(newBattle);
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("server error")
	}
})

const calculateXP = (base_xp, won) => {
	let xp = base_xp > 0 ? base_xp : 1;
	if (won) {
		xp = xp + 2;
	} else {
		xp = xp + 1;
	}
	return xp;
}

const calculateLvl = (original_level, new_xp) => {
	let level = original_level > 0 ? original_level : 1;
	let final_xp = new_xp;
	let is_new_level = new_xp >= level * 10;
	if (is_new_level) {
		level = limit_nbr(level + 1, 0, 100);
		final_xp = new_xp - (level * 10);
		if (final_xp < 0) final_xp = 0
	}

	return { level: level, final_xp: final_xp }
}

const calculateNftLvl = (original_level, new_xp, original_status) => {
	const { level, final_xp } = calculateLvl(original_level, new_xp);
	let new_stats = original_status;
	if (original_level !== level) {
		const dif = level - original_level;
		new_stats = {
			heal: limit_nbr(original_status.heal + (dif * 0.1), 0, 100),
			attack: limit_nbr(original_status.attack + (dif * 0.1), 0, 100),
			defense: limit_nbr(original_status.defense + (dif * 0.1), 0, 100)
		}
	}
	return { level, final_xp, new_stats };
}
router.post('/update', async (req, res) => {
	try {
		const user = await User.findOne({ address: req.body.address });
		const battle = await Battle.findOne({
			"contestant1.user": user._id,
			finished: false
		});

		const opponent = await User.findOne({ _id: battle.contestant2.user });

		const userNft = await Nft.findOne({ nftId: user.activeNFT });
		const opponentNft = await Nft.findOne({ nftId: opponent.activeNFT });

		const newHistory = runBattle({ ...user._doc, nft: userNft },
			{ ...opponent._doc, nft: opponentNft },
			battle, req.body.move);

		if (newHistory[newHistory.length - 1].contestant1Health <= 0 || newHistory[newHistory.length - 1].contestant2Health <= 0) {
			const user_win = newHistory[newHistory.length - 1].contestant2Health <= 0;

			const new_user_status = calculateLvl(user.rank, calculateXP(user.xp, user_win));
			const new_user_nft_status = calculateNftLvl(userNft.level, calculateXP(userNft.xp, user_win), userNft.stats);

			const new_opponent_status = calculateLvl(opponent.rank, calculateXP(opponent.xp, !user.win));
			const new_opponent_nft_status = calculateNftLvl(opponentNft.level, calculateXP(opponentNft.xp, !user_win), opponentNft.stats);

			await Battle.findOneAndUpdate({ _id: battle._id },
				{
					finished: true,
					winner: user_win ? user._id : opponent._id,
					history: newHistory
				})

			await User.findOneAndUpdate({ _id: user._id },
				{
					xp: new_user_status.final_xp,
					rank: new_user_status.level,
					battlesWon: user_win ? user.battlesWon + 1 : user.battlesWon,
					battlesLost: !user_win ? user.battlesLost + 1 : user.battlesLost
				});

			await Nft.findOneAndUpdate({ _id: userNft._id },
				{
					xp: new_user_nft_status.final_xp,
					level: new_user_nft_status.level,
					stats: new_user_nft_status.new_stats
				});

			await User.findOneAndUpdate({ _id: opponent._id },
				{
					xp: new_opponent_status.final_xp,
					rank: new_opponent_status.level,
					battlesWon: !user_win ? opponent.battlesWon + 1 : opponent.battlesWon,
					battlesLost: user_win ? opponent.battlesLost + 1 : opponent.battlesLost
				});

			await Nft.findOneAndUpdate({ _id: opponentNft._id },
				{
					xp: new_opponent_nft_status.final_xp,
					level: new_opponent_nft_status.level,
					stats: new_opponent_nft_status.new_stats
				});

			res.send({
				newHistory,
				finished: true
			});
		} else {
			await Battle.findOneAndUpdate({ _id: battle._id },
				{ history: newHistory });
			res.send({ newHistory, finished: false });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send("server error")
	}
});

module.exports = router
