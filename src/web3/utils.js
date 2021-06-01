import { Contract, utils, providers } from "ethers";
import { NFTToken, FlatPriceSale, VinylAddress, TokenSaleAddress
	// Auction
 } from "./constants"
 import Swal from "sweetalert2";
import NFTTokenABI from "./abi/NFTToken.abi.js";
import FlatPriceSaleABI from "./abi/FlatPriceSale.abi.js";
import VinylABI from "./abi/Vinyl.abi";
import TokenSaleABI from "./abi/TokenSale.abi.js"
// import BigNumber from "bignumber.js";


export const getEthBalance = async (callback) => {
	let provider;
	let walletAddress = window.ethereum.selectedAddress;
	provider = new providers.Web3Provider(window.ethereum);
	let balance = await provider.getBalance(walletAddress)
	console.log('balance', utils.formatEther(balance._hex))
	return callback(utils.formatEther(balance._hex))
}


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
	// console.log("provider:\n", provider);
	if (!statement && error) {
		console.log(error)
		throw error
	}
	if (!provider) {
		console.log('provider not found')
		console.log(provider)
		throw 'provider not found'
	}
	if (!walletAddress) {
		console.log('userWallet not found')
		console.log(walletAddress)
		throw 'userWallet not found'
	}
	return { provider, walletAddress }
}


export const getSetSale = async (nftId, callback) => {
	const { provider } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(FlatPriceSale, FlatPriceSaleABI, signer);

	contract.sets(nftId).then(r => {
		const res = {
			price: utils.formatEther(r.price),
			quantity: r.quantity,
			sold: r.sold,
		};
		callback(res);
	});
}


export const mintNFT = async (data, pendingCallback, finalCallback) => {
	const { provider } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(NFTToken, NFTTokenABI, signer);

	let result = await contract.mintAndStake(data.amount, data.price, data.startTime, FlatPriceSale, data.encodedFee, data.databaseID, parseInt(data.v), data.r, data.s)
		.then(res => {
			pendingCallback();
			return res.wait();
		})

	finalCallback(result)
}

// export const auctionNFT = async (data, pendingCallback, finalCallback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTToken, NFTTokenABI, signer);

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
	const vinylBalance = vinylContract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
  
	Promise.all([vinylBalance]).then((res) => {
	  callback({ vinyl: res });
	});
  };

export const buyNFT = async (data, pendingCallback, finalCallback) => {
	const { provider } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(FlatPriceSale, FlatPriceSaleABI, signer);

	console.log("pricceee", data.price, utils.parseUnits(data.price), data.amount);

	let result = await contract.buyNFT(data.saleId, data.amount, { value: utils.parseUnits(data.price) })
		.then(res => {
			pendingCallback();
			return res.wait();
		})

	finalCallback(result)
}

export const buyPresale = async (amount, callback) => {
  const { provider } = await require()
  const signer = provider.getSigner()
  const contract = new Contract(
      TokenSaleAddress,
      TokenSaleABI,
      signer,
  )
  const price = await contract.getPrice()
  const frozen = await contract.getIsFrozen()
  if (frozen) {
      callback(null)
      return
  }
  console.log(amount); //may be a big number and if so need to change this stuff

  const buy = await contract.buy(amount, {
      value: price.mul(amount)
  })
  let res = await buy.wait()
  Swal.fire('Success!')
  callback(res)
}

export const getPresalePrice = async (callback) => {
  const { provider } = await require()
  const signer = provider.getSigner();
  const contract = new Contract(
      TokenSaleAddress,
      TokenSaleABI,
      signer,
  )
  const price = await contract.getPrice()
  callback(price)
}

export const approve = async (callback) => {
  const { provider } = await require()
  const signer = provider.getSigner();
  const contract = new Contract(
      VinylAddress,
      VinylABI,
      signer,
  )
  contract.approve("0xB29F1ab1b820ec5E96Df9D237dD6C1b4AFDCc534", "10000000000000000000000000");
}