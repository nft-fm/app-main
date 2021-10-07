import { Contract, utils, providers } from "ethers";
import {
  NftAddress,
  FlatPriceSale,
  VinylAddress,
  TokenSaleAddress,
  AirdropAddress,
  // Auction
  BSC_NftAddress,
  BSC_FlatPriceSale,
  StakingAddress,
} from "./constants";
import Swal from "sweetalert2";
import NFTTokenABI from "./abi/NFTToken.abi.js";
import FlatPriceSaleABI from "./abi/FlatPriceSale.abi.js";
import VinylABI from "./abi/Vinyl.abi";
import TokenSaleABI from "./abi/TokenSale.abi.js";
import AirdropABI from "./abi/Airdrop.abi.js";
import StakingABI from "./abi/Staking.abi.js";
// import BigNumber from "bignumber.js";

const chooseNftAddress = async () => {
  const newChainId = await window.ethereum.request({ method: "eth_chainId" });
  if (Number(newChainId) === 1 || Number(newChainId) === 4) {
    return NftAddress;
  } else if (Number(newChainId) === 56 || Number(newChainId) === 97) {
    return BSC_NftAddress;
  }
};
const chooseFlatPriceSale = async () => {
  const newChainId = await window.ethereum.request({ method: "eth_chainId" });
  if (Number(newChainId) === 1 || Number(newChainId) === 4) {
    return FlatPriceSale;
  } else if (Number(newChainId) === 56 || Number(newChainId) === 97) {
    return BSC_FlatPriceSale;
  }
};

export const getEthBalance = async (callback) => {
  let provider;
  let walletAddress = window.ethereum.selectedAddress;
  provider = new providers.Web3Provider(window.ethereum);
  let balance = await provider.getBalance(walletAddress);
  return callback(utils.formatEther(balance._hex));
};

export const require = async (statement, error) => {
  let provider;
  let walletAddress;
  // if (isMobile()) {
  // 	const baseProvider = new WalletConnectProvider({
  // 		rpc: { 1: "https://mainnet.eth.aragon.network/" }
  // 	});
  // 	await baseProvider.enable();
  // 	provider = new providers.Web3Provider(baseProvider);
  // 	walletAddress = baseProvider.accounts[0];
  // } else {
  provider = new providers.Web3Provider(window.ethereum);
  walletAddress = window.ethereum.selectedAddress;
  // }
  if (!statement && error) {
    throw error;
  }
  if (!provider) {
    throw new Error("provider not found");
  }
  if (!walletAddress) {
    throw new Error("userWallet not found");
  }
  return { provider, walletAddress };
};

export const getSetSale = async (nftId, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  let contract = new Contract(chooseFlatPriceSale(), FlatPriceSaleABI, signer);

  contract.sets(nftId).then((r) => {
    const res = {
      price: utils.formatEther(r.price),
      quantity: r.quantity,
      sold: r.sold,
    };
    callback(res);
  });
};

export const mintNFT = async (data, finalCallback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  let contract = new Contract(chooseNftAddress(), NFTTokenABI, signer);

  let result = await contract
    .mintAndStake(
      data.amount,
      data.price,
      data.startTime,
      chooseFlatPriceSale(),
      data.encodedFee,
      data.databaseID,
      parseInt(data.v),
      data.r,
      data.s
    )
    .then((res) => {
      return res.wait();
    });

  finalCallback(result);
};

// export const auctionNFT = async (data, pendingCallback, finalCallback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NftAddress, NFTTokenABI, signer);

// 	let result = await contract.mintAndStake(data.amount, data.price, data.startTime, Auction, data.encodedArgs, data.databaseID, parseInt(data.v), data.r, data.s)
// 		.then(res => {
// 			pendingCallback();
// 			return res.wait();
// 		})

// 	finalCallback(result)
// }
export const getVinylBalance = async (callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const vinylContract = new Contract(VinylAddress, VinylABI, signer);
  const vinylBalance = vinylContract
    .balanceOf(walletAddress)
    .then((r) => utils.formatEther(r));

  Promise.all([vinylBalance]).then((res) => {
    callback({ vinyl: res });
  });
};

export const buyNFT = async (data, finalCallback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  let contract = new Contract(chooseFlatPriceSale(), FlatPriceSaleABI, signer);

  let result = await contract
    .buyNFT(data.saleId, data.amount, { value: utils.parseUnits(data.price) })
    .then((res) => {
      return res.wait();
    });

  finalCallback(result);
};

export const airdrop = async (wallets, amounts, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(AirdropAddress, AirdropABI, signer);
  contract.airdrop(VinylAddress, wallets, amounts).then(() => callback());
};

export const buyPresale = async (amount, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(TokenSaleAddress, TokenSaleABI, signer);
  const price = await contract.getPrice();
  const frozen = await contract.getIsFrozen();
  if (frozen) {
    callback(null);
    return;
  }

  const buy = await contract.buy(amount, {
    value: price.mul(amount),
  });
  let res = await buy.wait();
  Swal.fire("Success!");
  callback(res);
};

export const getPresalePrice = async (callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(TokenSaleAddress, TokenSaleABI, signer);
  const price = await contract.getPrice();
  callback(price);
};

export const approve = async (callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(VinylAddress, VinylABI, signer);
  contract.approve(
    "0xB29F1ab1b820ec5E96Df9D237dD6C1b4AFDCc534",
    "10000000000000000000000000"
  );
};

export const stakeVinyl = async (amount, address, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  contract
    .stake(address, utils.parseEther(String(amount)))
    .then((r) => r.wait())
    .then(() => {
      callback();
    });
};
export const claimVinyl = async (callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  contract
    .claim()
    .then((r) => r.wait())
    .then(() => {
      callback();
    });
};
export const unstakeVinyl = async (artistAddress, amount, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  contract
    .unstake(artistAddress, utils.parseEther(String(amount)))
    .then((r) => r.wait())
    .then(() => {
      callback();
    });
};
export const getBalanceOfVinyl = async (callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const VINYLBalance = contract
    .balanceOf(walletAddress)
    .then((r) => utils.formatEther(r));
  Promise.all([VINYLBalance]).then((res) => {
    callback({ balance: res[0] });
  });
};
export const getAccountTotalStaked = async (callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const totalStaked = contract
    .accountTotalStaked(walletAddress)
    .then((r) => utils.formatEther(r));
  Promise.all([totalStaked]).then((res) => {
    callback({ totalStaked: res[0] });
  });
};
export const getUserStakedToArtist = async (
  userAddress,
  artistAddress,
  callback
) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const totalStaked = contract
    .staked(userAddress, artistAddress)
    .then((r) => utils.formatEther(r));
  Promise.all([totalStaked]).then((res) => {
    callback({ userStaked: res[0] });
  });
};
export const getTotalStakedToArtist = async (address, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const totalStaked = contract
    .totalStakedToArtist(address)
    .then((r) => utils.formatEther(r));
  Promise.all([totalStaked]).then((res) => {
    callback({ totalStaked: res[0] });
  });
};
export const getStakersForArtist = async () => {
  // const { provider } = await require();
  // const signer = provider.getSigner();
  // const contract = new Contract(StakingAddress, StakingABI, signer)
};
export const getVinylStaked = async () => {
  // const { provider } = await require();
  // const signer = provider.getSigner();
  // const contract = new Contract(StakingAddress, StakingABI, signer)
};
export const getTotalEarned = async (address, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const totalEarned = contract
    .totalEarned(address)
    .then((r) => utils.formatEther(r));
  Promise.all([totalEarned]).then((res) => {
    callback({ totalEarned: res[0] });
  });
};
export const getAvailable = async (callback) => {
  const { provider, walletAddress } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  const available = contract
    .available(walletAddress)
    .then((r) => utils.formatEther(r));
  Promise.all([available]).then((res) => {
    callback({ available: res[0] });
  });
};
export const addArtistToStake = async (artistAddress, callback) => {
  const { provider } = await require();
  const signer = provider.getSigner();
  const contract = new Contract(StakingAddress, StakingABI, signer);
  contract
    .addArtist(artistAddress)
    .then((r) => r.wait())
    .then(() => {
      callback();
    });
};