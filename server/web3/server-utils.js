const {
  Contract,
  utils,
  providers,
  Wallet,
  BigNumber,
  getDefaultProvider,
} = require("ethers");
var difUtils = require("ethers").utils;
const { TEST_NFTToken, MAIN_NFTToken, TEST_FlatPriceSale, MAIN_FlatPriceSale } = require("./constants");
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
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET ? process.env.MAIN_PROVIDER_URL : process.env.RINKEBY_PROVIDER_URL;
  const FlatPriceSale = process.env.REACT_APP_IS_MAINNET ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
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
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET ? process.env.MAIN_PROVIDER_URL : process.env.RINKEBY_PROVIDER_URL;
	const NFTToken = process.env.REACT_APP_IS_MAINNET ? MAIN_NFTToken : TEST_NFTToken;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

  let userNfts = await contract.getFullBalance(account);
  // let nftIds = [];
  // let numNfts = [];
  // userNfts[0].map((nft) => {
  //   nftIds.push(utils.formatEther(nft) * 10e17);
  // });
  // userNfts[1].map((nft) => {
  //   numNfts.push(utils.formatEther(nft) * 10e17);
  // });

  let nftIdsAndQuantities = []
  for (let i = 0; i < userNfts[0].length; i++) {
    nftIdsAndQuantities.push({id: utils.formatEther(userNfts[0][i]) * 10e17, quantity: utils.formatEther(userNfts[1][i]) * 10e17})
  }
  return nftIdsAndQuantities;
  // return { nftIds, numNfts };
};

module.exports = {
  sign,
  getSetSale,
  findLikes,
  getUserNfts,
};
