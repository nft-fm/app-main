const { Contract, utils, providers, constants, BigNumber, getDefaultProvider } = require("ethers");

const NFTType = require('../schemas/BF.schema')



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


module.exports = {
	buyNFT
}