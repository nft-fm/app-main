const {
  Contract,
  utils,
  providers,
  Wallet,
  BigNumber,
  getDefaultProvider,
} = require("ethers");
var difUtils = require("ethers").utils;
const {
  TEST_NFTToken,
  MAIN_NFTToken,
  TEST_VinylAddress,
  MAIN_VinylAddress,
  TEST_BSC_NFTToken,
  MAIN_BSC_NFTToken,
  TEST_StakingAddress,
  MAIN_StakingAddress,
} = require("./constants");
const FlatPriceSaleABI = require("./abi/FlatPriceSale.abi");
const NFTTokenABI = require("./abi/NFTToken.abi");
const VinylABI = require("./abi/Vinyl.abi");
const StakingABI = require("./abi/Staking.abi");
const dotenv = require("dotenv");
dotenv.config();

const sign = (types, values) => {
  let data = utils.defaultAbiCoder.encode(types, values);

  const hash = utils.keccak256(utils.hexlify(data));
  const signer = new utils.SigningKey(process.env.OWNER_KEY);
  const { r, s, v } = signer.signDigest(hash);
  return { r, s, v };
};

// const getSetSale = async (nftId, callback) => {
//   const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
//     ? process.env.MAIN_PROVIDER_URL
//     : process.env.RINKEBY_PROVIDER_URL;
//   const FlatPriceSale = process.env.REACT_APP_IS_MAINNET
//     ? MAIN_FlatPriceSale
//     : TEST_FlatPriceSale;
//   let provider = new providers.WebSocketProvider(PROVIDER_URL);
//   let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
//   const contract = new Contract(
//     FlatPriceSale,
//     FlatPriceSaleABI,
//     walletWithProvider
//   );
//   const r = await contract.sets(nftId);

//   return r;
// };

// this just formats likes at this point
const findLikes = (nfts, account) => (
  nfts.map(nft => {
    const likes = nft._doc.likes
    return {
      ...nft._doc,
      likes: [],
      liked: likes && likes.includes(account)
    }
  })
);

const getUserNftsETH = async (account) => {
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.MAIN_PROVIDER_URL
    : process.env.RINKEBY_PROVIDER_URL;
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_NFTToken
    : TEST_NFTToken;
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

  let nftIdsAndQuantities = [];
  for (let i = 0; i < userNfts[0].length; i++) {
    nftIdsAndQuantities.push({
      id: Math.round(utils.formatEther(userNfts[0][i]) * 10e17),
      quantity: Math.round(utils.formatEther(userNfts[1][i]) * 10e17),
      chain: "ETH",
    });
  }
  return nftIdsAndQuantities;
  // return { nftIds, numNfts };
};


const getUserNftsBSC = async (account) => {
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.BSC_PROVIDER_URL
    : process.env.BSCTEST_PROVIDER_URL;
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_BSC_NFTToken
    : TEST_BSC_NFTToken;

  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

  let userNfts = await contract.getFullBalance(account);

  let nftIdsAndQuantities = [];
  for (let i = 0; i < userNfts[0].length; i++) {
    nftIdsAndQuantities.push({
      id: Math.round(utils.formatEther(userNfts[0][i]) * 10e17),
      quantity: Math.round(utils.formatEther(userNfts[1][i]) * 10e17),
      chain: "BSC",
    });
  }
  console.log("bsc nfts", nftIdsAndQuantities);
  return nftIdsAndQuantities;
  // return { nftIds, numNfts };
};

const getVinylBalance = async (address) => {
  const ethProvider = getDefaultProvider(
    process.env.REACT_APP_IS_MAINNET
      ? process.env.MAIN_PROVIDER_URL
      : process.env.RINKEBY_PROVIDER_URL
  );
  const vinylAddress = process.env.REACT_APP_IS_MAINNET
    ? MAIN_VinylAddress
    : TEST_VinylAddress;
  const vinylContract = new Contract(vinylAddress, VinylABI, ethProvider);

  let promise = vinylContract.balanceOf(address).then((r) => {
    return { address, amount: parseFloat(utils.formatEther(r)) };
  });

  let newVariable = await Promise.all([promise]).then((res) => res);
  return newVariable;
};

const getVinylOwners = async (addresses) => {
  const ethProvider = getDefaultProvider(
    process.env.REACT_APP_IS_MAINNET
      ? process.env.MAIN_PROVIDER_URL
      : process.env.RINKEBY_PROVIDER_URL
  );
  const vinylAddress = process.env.REACT_APP_IS_MAINNET
    ? MAIN_VinylAddress
    : TEST_VinylAddress;
  const vinylContract = new Contract(vinylAddress, VinylABI, ethProvider);

  let promises = addresses.map((address) =>
    vinylContract.balanceOf(address).then((r) => {
      return { address, amount: parseFloat(utils.formatEther(r)) };
    })
  );

  let newVariable = await Promise.all([...promises]).then((res) => res);
  return newVariable;
};

const addArtistToStake = async (artistAddress, callback) => {
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.BSC_PROVIDER_URL
    : process.env.BSCTEST_PROVIDER_URL;
  const STAKING_ADDRESS = process.env.REACT_APP_IS_MAINNET
    ? MAIN_StakingAddress
    : TEST_StakingAddress;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(
    STAKING_ADDRESS,
    StakingABI,
    walletWithProvider
  );
  contract.isArtist(artistAddress).then((r) => {
    console.log(r);
    if (!r) {
      contract
        .addArtist(artistAddress)
        .then((r) => r.wait())
        .then(() => {
          callback("Artist added");
        });
    } else {
      callback("Artist already added");
    }
  });
};
const getStakersForArtist = async (address, callback) => {
  const PROVIDER_URL = getDefaultProvider(
    process.env.REACT_APP_IS_MAINNET
      ? process.env.BSC_PROVIDER_URL
      : process.env.BSCTEST_PROVIDER_URL
  );
  const STAKING_ADDRESS = process.env.REACT_APP_IS_MAINNET
    ? MAIN_StakingAddress
    : TEST_StakingAddress;
  const contract = new Contract(STAKING_ADDRESS, StakingABI, PROVIDER_URL);
  let promise = await contract.stakersForArtist(address).then((r) => {
    return r;
  });
  let newVariable = await Promise.all([...promise]).then((res) => res);
  return newVariable;
};

module.exports = {
  sign,
  findLikes,
  getUserNftsETH,
  getUserNftsBSC,
  getVinylOwners,
  getVinylBalance,
  addArtistToStake,
  getStakersForArtist,
};
