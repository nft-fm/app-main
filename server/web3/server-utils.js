const { Contract, utils, providers, constants, BigNumber, getDefaultProvider } = require("ethers");
const { NFTToken, NFTSale } = require('./constants');
const NFTType = require('../schemas/NftType.schema')



const sign = (address, amount, price, startTime, saleAddress) => {
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


module.exports = {
	sign
}