module.exports = function returnNft (nft, nftType) {
	return {
		assetId: nft.assetId,
		level: nft.level,
		nftId: nft.nftId,
		nftType: nft.nftType,
		// receipt: nft.receipt,
		stats: nft.stats,
		// timestamp: nft.timestamp,
		xp: nft.xp,
		xpToNextLevel: 20,
		picture: nftType.picture,
		rarity: nftType.rarity,
		name: nftType.name
	};
};