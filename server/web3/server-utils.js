const { Contract, utils, providers, Wallet, BigNumber, getDefaultProvider } = require("ethers");
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
	const r = await contract.sets(nftId);

	return r;
}

const findLikes = (nfts, account) => {
	for (let i = 0; i < nfts.length; i++) {
	  const likes = nfts[i]._doc.likes;
	  if (likes && likes.find(like => like.toString() === account)) {
		nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length, liked: true }
	  }
	  else {
		nfts[i] = { ...nfts[i]._doc, likes: [], likeCount: nfts[i]._doc.likes.length || 0, liked: false };
	  }
	  // const extraInfo = await getSetSale(nfts[i].nftId)
	  // console.log("EXTRA INFO", extraInfo)
	  // nfts[i] = {
	  //   ...nfts[i],
	  //   price: extraInfo.price,
	  //   quantity: extraInfo.quantity,
	  //   sold: extraInfo.sold
	  // }
	}
	// console.log("NFTS", nfts);
	return nfts;
  }

module.exports = {
	sign,
	getSetSale,
	findLikes,
}