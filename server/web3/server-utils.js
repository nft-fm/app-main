const { Contract, utils, providers, constants, BigNumber, getDefaultProvider } = require("ethers");
const ERC20StakingABI = require("./abi/Erc20StakingPool.abi");
const BDTABI = require("./abi/BDT.abi");
const DCABI = require("./abi/DC.abi");
const NFTABI = require("./abi/NFT.abi");
const NFTSaleABI = require("./abi/NFTSale.abi");
const {
	ERC20StakingAddress, LPStakingAddress, BDTAddress, BDTLPAddress, DCAddress,
	NFTAddress, NFTSaleAddress
} = require('./constants');
const Lootbox = require('../schemas/Lootbox.schema')
const Receipt = require('../schemas/Receipt.schema')
const NftType = require('../schemas/NftType.schema')


const buyNFT = async (address, saleID, callback) => {
	let lootbox = await Lootbox.findOne()
	//	saves total rewards, adds up all chance, then randomly generates
	//	a num between 0 and added up chance. 
	let outOfStockRewards = lootbox.rewards.filter(reward => reward.stock === 0);
	let rewards = lootbox.rewards.filter(reward => reward.stock > 0);

	let chanceTotal = 0;
	for (let i = 0; i < rewards.length; i++) {
		chanceTotal += rewards[i].chance;
	}
	const threshold = Math.random() * (chanceTotal);

	let reward = null;
	let total = 0;
	let rewardIndex = 0;
	console.log("threshold", threshold, chanceTotal);
	while (rewardIndex < rewards.length && !reward) {
		total += rewards[rewardIndex].chance;
		if (total >= threshold) {
			reward = rewards[rewardIndex];
			break;
		}
		rewardIndex++;
	}
	if (!reward) {
		console.log("error, no reward chosen");
		reward = rewards[0];
	}

	console.log("magic happening", rewardIndex);
	const nftType = await NftType.findOne({ assetId: rewards[rewardIndex].assetId });
	nftType.numMinted++;
	rewards[rewardIndex].stock--;
	lootbox.rewards = [...rewards, ...outOfStockRewards];
	nftType.save();
	lootbox.save();
	const { r, s, v } = sign(
		address,
		saleID,
		// reward.assetId,
		1,
		saleID
	);
	const receipt = new Receipt({
		winner: address,
		saleId: saleID,
		asset: reward.asset,
		assetId: reward.assetId,
		name: reward.name,
		r,
		s,
		v
	})
	let data = await receipt.save()
	return data
}



const sign = (address, id, amount, saleID) => {
	let data = utils.defaultAbiCoder.encode(
		["address", "uint256", "uint256", "uint256"],
		[String(address), BigNumber.from(id), BigNumber.from(amount), BigNumber.from(saleID)]
	);

	const hash = utils.keccak256(utils.hexlify(data));
	const signer = new utils.SigningKey(process.env.PRIVATE_TEST_KEY);
	const { r, s, v } = signer.signDigest(hash);
	return { r, s, v };
};







const createTestLootbox = () => {
	let r = new Lootbox({
		rewards: [
			{
				chance: 100,
				stock: 1000,
				asset: 'https://media0.giphy.com/media/U7sXmVYXfAQanOwsy6/giphy.gif',
				assetId: 1,
				name: 'Gwei - Mistress of Ether'
			},
			{
				chance: 50,
				stock: 500,
				asset: 'https://cdn.discordapp.com/attachments/613478885174018084/810558045679124480/chonk_vitalik.gif',
				assetId: 2,
				name: 'Chonky Vitalik - Cat'
			},
			{
				chance: 10,
				stock: 10,
				asset: 'https://cdn.discordapp.com/attachments/613478885174018084/810558027526701076/chonk_satoshi.gif',
				assetId: 3,
				name: 'Satoshi - Bitcoin Mythic'
			},
		],
	})
	r.save()
}
// createTestLootbox()

module.exports = {
	buyNFT
}