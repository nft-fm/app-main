const { Contract, Wallet, providers, BigNumber } = require("ethers");

const {
  MAIN_FlatPriceSale,
  TEST_FlatPriceSale,
  MAIN_BSC_FlatPriceSale,
  TEST_BSC_FlatPriceSale,
} = require("./constants");
const FlatPriceSaleABI = require("./abi/FlatPriceSale.abi.js");
const NftType = require("../schemas/NftType.schema");
const User = require("../schemas/User.schema");
const { trackNftPurchase } = require("../modules/mixpanel");

const listenForBuyEth = async () => {
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_FlatPriceSale
    : TEST_FlatPriceSale;
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.MAIN_PROVIDER_URL
    : process.env.RINKEBY_PROVIDER_URL;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, FlatPriceSaleABI, walletWithProvider);

  contract.on("Buy", async (data) => {
    const blockNum = await provider.getBlockNumber();

    let filter = contract.filters.Buy(data);
    let event = await contract
      .queryFilter(filter, blockNum - 4000, blockNum)
      .then((r) => {
        return r;
      })
      .catch((r) => {
        console.log("owch", r);
      });
    const updateNFT = await NftType.findOneAndUpdate(
      { nftId: parseInt(event[0].args.nftID._hex, 16), chain: "ETH" },
      {
        $inc: {
          numSold: 1,
        },
      },
      { new: true }
    ).catch((err) => {
      console.log(err);
    });
    await User.findOneAndUpdate(
      { address: event[0].args.account },
      {
        $push: {
          nft: updateNFT._id,
          quantity: 1,
          chain: "ETH",
        },
      },
      { new: true }
    ).catch((err) => {
      console.log(err);
    });
    if (process.env.PRODUCTION) {
      trackNftPurchase({
        address: event[0].args.account,
        artistAddress: updateNFT.address,
        nftId: updateNFT._id,
        nftPrice: updateNFT.price,
        chain: "ETH",
      });
    }
  });
};

const listenForBuyBsc = async () => {
  const NFTToken = process.env.REACT_APP_IS_MAINNET
    ? MAIN_BSC_FlatPriceSale
    : TEST_BSC_FlatPriceSale;
  const PROVIDER_URL = process.env.REACT_APP_IS_MAINNET
    ? process.env.BSC_PROVIDER_URL
    : process.env.BSCTEST_PROVIDER_URL;
  let provider = new providers.WebSocketProvider(PROVIDER_URL);
  let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
  const contract = new Contract(NFTToken, FlatPriceSaleABI, walletWithProvider);

  contract.on("Buy", async (data) => {
    const blockNum = await provider.getBlockNumber();

    let filter = contract.filters.Buy(data);
    let event = await contract
      .queryFilter(filter, blockNum - 4000, blockNum)
      .then((r) => {
        return r;
      })
      .catch((r) => {
        console.log("owch", r);
      });
    const updateNFT = await NftType.findOneAndUpdate(
      { nftId: parseInt(event[0].args.nftID._hex, 16), chain: "BSC" },
      {
        $inc: {
          numSold: 1,
        },
      },
      { new: true }
    ).catch((err) => {
      console.log(err);
    });
    await User.findOneAndUpdate(
      { address: event[0].args.account },
      {
        $push: {
          nft: updateNFT._id,
          quantity: 1,
          chain: "BSC",
        },
      },
      { new: true }
    ).catch((err) => {
      console.log(err);
    });
    if (process.env.PRODUCTION) {
      trackNftPurchase({
        address: event[0].args.account,
        artistAddress: updateNFT.address,
        nftId: updateNFT._id,
        nftPrice: updateNFT.price,
        chain: "BSC",
      });
    }
  });
};

module.exports = {
  listenForBuyEth,
  listenForBuyBsc,
};
