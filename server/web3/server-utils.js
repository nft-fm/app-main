const { Contract, utils, providers, constants, BigNumber, getDefaultProvider } = require("ethers");
const { NFTToken, NFTSale } = require('./constants');
const NFTSaleABI = require('./abi/NFTSale.abi');
const NFTTokenABI = require('./abi/NFTToken.abi');
const NFTType = require('../schemas/NftType.schema')

const sign = (address, amount, price, startTime, saleAddress) => {
	console.log("signing", address, amount, price, startTime, saleAddress)
	let data = utils.defaultAbiCoder.encode(
		["address", "uint256", "uint256", "uint256", "address"],
		[String(address), BigNumber.from(amount), BigNumber.from(price), BigNumber.from(startTime), String(saleAddress)]
	);

	const hash = utils.keccak256(utils.hexlify(data));
	console.log("key", process.env.OWNER_KEY);
	const signer = new utils.SigningKey(process.env.OWNER_KEY);
	const { r, s, v } = signer.signDigest(hash);
	return { r, s, v };
};

const getSetSale = async (nftId, callback) => {
	let provider = new providers.WebSocketProvider(process.env.WSS_PROVIDER_URL);
	let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
	const contract = new Contract(NFTSale, NFTSaleABI, walletWithProvider);

	contract.sets(nftId).then(r => {
		console.log("got ret", r);
		return (r);
	});
}


module.exports = {
	sign,
	getSetSale,
}