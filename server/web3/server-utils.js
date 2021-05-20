const {
  Contract,
  utils,
  providers,
  Wallet,
  BigNumber,
  getDefaultProvider,
} = require("ethers");
var difUtils = require('ethers').utils;
const { NFTToken, FlatPriceSale } = require("./constants");
const FlatPriceSaleABI = require("./abi/FlatPriceSale.abi");
const NFTTokenABI = require("./abi/NFTToken.abi");
const NFTType = require("../schemas/NftType.schema");

/*
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
*/

const sign = (types, values) => {
  console.log("signing", ...values);
  let data = utils.defaultAbiCoder.encode(types, values);
  console.log("abi encoded:");
  console.log(data);

  const hash = utils.keccak256(utils.hexlify(data));
  console.log("key", process.env.OWNER_KEY);
  const signer = new utils.SigningKey(process.env.OWNER_KEY);
  const { r, s, v } = signer.signDigest(hash);
  return { r, s, v };
};

const getSetSale = async (nftId, callback) => {
  let provider = new providers.WebSocketProvider(process.env.WSS_PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(
    FlatPriceSale,
    FlatPriceSaleABI,
    walletWithProvider
  );
  const r = await contract.sets(nftId);

  return r;
};

const findLikes = (nfts, account) => {
  for (let i = 0; i < nfts.length; i++) {
    const likes = nfts[i]._doc.likes;
    if (likes && likes.find((like) => like.toString() === account)) {
      nfts[i] = {
        ...nfts[i]._doc,
        likes: [],
        likeCount: nfts[i]._doc.likes.length,
        liked: true,
      };
    } else {
      nfts[i] = {
        ...nfts[i]._doc,
        likes: [],
        likeCount: nfts[i]._doc.likes.length || 0,
        liked: false,
      };
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
};

const getUserNfts = async (account) => {
  let provider = new providers.WebSocketProvider(process.env.WSS_PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);
  let userNfts = await contract.getFullBalance(account);
  // console.log('userNfts', userNfts)
  let arr1 = [];
  let arr2 = [];
  let map1 = userNfts[0].map((nft) => {
    console.log("nft", nft);
	// var wei = difUtils.bigNumberify("1000000000000000000000");
    // arr1.push(utils.BigNumber.from(nft));
    arr1.push(utils.formatEther(nft)*10e17);
  });
  let map2 = userNfts[1].map((nft) => {
    // arr2.push(utils.BigNumber.from(nft));
    arr2.push(utils.formatEther(nft)*10e17);
  });
  console.log("mapped", arr1, arr2);
  return map1, map2;
};

module.exports = {
  sign,
  getSetSale,
  findLikes,
  getUserNfts,
};
