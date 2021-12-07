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
  MAIN_FlatPriceSale,
  TEST_FlatPriceSale,
  MAIN_BSC_FlatPriceSale,
  TEST_BSC_FlatPriceSale,
  AirdropWallet,
} = require("./constants");
const FlatPriceSaleABI = require("./abi/FlatPriceSale.abi");
const NFTTokenABI = require("./abi/NFTToken.abi");
const VinylABI = require("./abi/Vinyl.abi");
const StakingABI = require("./abi/Staking.abi");
const dotenv = require("dotenv");
const Web3 = require("web3");
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
const findLikes = (nfts, account) =>
  nfts.map((nft) => {
    const likes = nft._doc.likes;
    return {
      ...nft._doc,
      likes: [],
      liked: likes && likes.includes(account),
    };
  });

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
    const quantity = Math.round(utils.formatEther(userNfts[1][i]) * 10e17)
    if (quantity) {
      nftIdsAndQuantities.push({
        id: Math.round(utils.formatEther(userNfts[0][i]) * 10e17),
        quantity,
        chain: "ETH",
      });
    }
  }
  console.log("eth nfts", nftIdsAndQuantities);
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

  let provider = new providers.JsonRpcProvider(PROVIDER_URL);
  // WebSocketProvider(PROVIDER_URL);
  console.log(1);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);
  console.log(2);

  let userNfts = await contract.getFullBalance(account);

  console.log(3);
  let nftIdsAndQuantities = [];
  for (let i = 0; i < userNfts[0].length; i++) {
    console.log(4);
    const quantity = Math.round(utils.formatEther(userNfts[1][i]) * 10e17)
    if (quantity) {
      nftIdsAndQuantities.push({
        id: Math.round(utils.formatEther(userNfts[0][i]) * 10e17),
        quantity,
        chain: "BSC",
      });
    }
  }
  console.log(5);
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
  let provider = new providers.JsonRpcProvider(PROVIDER_URL);
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

const getAllNftsFromEthContract = async (nftsFromDB, callback) => {
  const PROVIDER_URL = getDefaultProvider(
    process.env.REACT_APP_IS_MAINNET
      ? process.env.MAIN_PROVIDER_URL
      : process.env.RINKEBY_PROVIDER_URL
  );
  const FlatPriceSale = process.env.REACT_APP_IS_MAINNET
    ? MAIN_FlatPriceSale
    : TEST_FlatPriceSale;
  const contract = new Contract(FlatPriceSale, FlatPriceSaleABI, PROVIDER_URL);
  let nfts = [];
  for (let nft of nftsFromDB) {
    let r = await contract.sets(nft.nftId);
    nfts.push({ nftFromDB: nft, nftFromContract: r });
  }
  callback(nfts);
};
const getAllNftsFromBscContract = async (nftsFromDB, callback) => {
  const PROVIDER_URL = getDefaultProvider(
    process.env.REACT_APP_IS_MAINNET
      ? process.env.BSC_PROVIDER_URL
      : process.env.BSCTEST_PROVIDER_URL
  );
  const FlatPriceSale = process.env.REACT_APP_IS_MAINNET
    ? MAIN_BSC_FlatPriceSale
    : TEST_BSC_FlatPriceSale;
  const contract = new Contract(FlatPriceSale, FlatPriceSaleABI, PROVIDER_URL);
  let nfts = [];
  for (let nft of nftsFromDB) {
    let r = await contract.sets(nft.nftId);
    nfts.push({ nftFromDB: nft, nftFromContract: r });
  }
  callback(nfts);
};

const airdropOnNFTPurchase = async (receiver, amount, callback) => {
  const web3 = new Web3(
    process.env.REACT_APP_IS_MAINNET && process.env.PRODUCTION
      ? process.env.BSC_PROVIDER_URL
      : process.env.BSCTEST_PROVIDER_URL
  );
  const gasprice = await web3.eth.getGasPrice();
  let count = await web3.eth.getTransactionCount(AirdropWallet);

  const vinylAddress = process.env.REACT_APP_IS_MAINNET && process.env.PRODUCTION
    ? MAIN_StakingAddress
    : TEST_StakingAddress;
  const token = new web3.eth.Contract(VinylABI, vinylAddress);

  const txObject = {
    from: AirdropWallet,
    nonce: "0x" + count.toString(16),
    to: vinylAddress,
    gas: 100000,
    value: "0x0",
    data: token.methods
      .transfer(
        receiver,
        web3.utils.toHex(web3.utils.toWei(amount.toString(), "ether"))
      )
      .encodeABI(),
    gasPrice: gasprice,
  };

  web3.eth.accounts.signTransaction(
    txObject,
    process.env.AIRDROP_PRIVATE_KEY,
    (err, res) => {
      if (err) {
        return callback("signerError");
      }

      const raw = res.rawTransaction;
      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) {
          return callback("transactionError");
        } else {
          callback(txHash);
        }
      });
    }
  );
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
  getAllNftsFromEthContract,
  getAllNftsFromBscContract,
  airdropOnNFTPurchase,
};
