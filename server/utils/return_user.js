module.exports = function returnUser (user) {
	return {
		nickname: user.nickname,
		picture:  user.picture,
		pictureColor : user.pictureColor,
		idNum: user.idNum,
		battlesWon: user.battlesWon,
		battlesLost: user.battlesLost,
		rank: user.rank,
		xp: user.xp,
		address: user.address,
		activeNFT: 52
	};
};