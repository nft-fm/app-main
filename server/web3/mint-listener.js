const { Contract, Wallet, providers } = require("ethers");

const {
  MAIN_NFTToken,
  TEST_NFTToken,
  MAIN_BSC_NFTToken,
  TEST_BSC_NFTToken,
} = require("./constants");
const NFTTokenABI = require("./abi/NFTToken.abi.js");
const NftType = require("../schemas/NftType.schema");

const listenForMintEth = async () => {
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_NFTToken
    : TEST_NFTToken;
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.MAIN_PROVIDER_URL
    : process.env.RINKEBY_PROVIDER_URL;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

  contract.on("MintAndStake", async (data) => {
    let filter = contract.filters.MintAndStake(data);
    let event = await contract.queryFilter(filter);
    await NftType.findByIdAndUpdate(event[0].args.databaseID.toString(), {
      isMinted: true,
      nftId: event[0].args.nftID,
    }).catch((err) => {
      console.log(err);
    });
  });
};

const listenForMintBsc = async () => {
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_BSC_NFTToken
    : TEST_BSC_NFTToken;
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.BSC_PROVIDER_URL
    : process.env.BSCTEST_PROVIDER_URL;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

  contract.on("MintAndStake", async (data) => {
    const blockNum = await provider.getBlockNumber();

    let filter = contract.filters.MintAndStake(data);
    let event = await contract.queryFilter(filter, blockNum - 4000, blockNum).then((r) => {
      return r;
    })
    .catch((r) => {
      console.log("owch", r);
    })
    ;
    await NftType.findByIdAndUpdate(event[0].args.databaseID.toString(), {
      isMinted: true,
      nftId: event[0].args.nftID,
    }).catch((err) => {
      console.log(err);
    });
  });
};

module.exports = {
  listenForMintEth,
  listenForMintBsc,
};
