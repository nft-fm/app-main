import { Contract, utils, providers } from "ethers";
import { NFTToken, FlatPriceSale, Auction } from "./constants"
import NFTTokenABI from "./abi/NFTToken.abi.js";
import FlatPriceSaleABI from "./abi/FlatPriceSale.abi.js";


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
	const { provider, walletAddress } = await require()
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
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(NFTToken, NFTTokenABI, signer);

	let result = await contract.mintAndStake(data.amount, data.price, data.startTime, FlatPriceSale, data.encodedFee, data.databaseID, parseInt(data.v), data.r, data.s)
		.then(res => {
			pendingCallback();
			return res.wait();
		})

	finalCallback(result)
}

export const auctionNFT = async (data, pendingCallback, finalCallback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(NFTToken, NFTTokenABI, signer);

	let result = await contract.mintAndStake(data.amount, data.price, data.startTime, Auction, data.encodedArgs, data.databaseID, parseInt(data.v), data.r, data.s)
		.then(res => {
			pendingCallback();
			return res.wait();
		})

	finalCallback(result)
}

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


