import { Contract, utils, providers, constants, BigNumber, getDefaultProvider } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import isMobile from "../utils/isMobile";
import { NFTToken, NFTSale } from "./constants"
import NFTTokenABI from "./abi/NFTToken.abi.js";
import NFTSaleABI from "./abi/NFTSale.abi.js";

export const require = async (statement, error) => {
	let provider;
	let walletAddress;
	if (isMobile()) {
		const baseProvider = new WalletConnectProvider({
			rpc: {
				1: "https://mainnet.eth.aragon.network/"
			}
		});
		await baseProvider.enable();
		provider = new providers.Web3Provider(baseProvider);
		walletAddress = baseProvider.accounts[0];
	} else {
		provider = new providers.Web3Provider(window.ethereum);
		walletAddress = window.ethereum.selectedAddress;
	}
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
	let contract = new Contract(NFTSale, NFTSaleABI, signer);

	contract.sets(nftId).then(r => {
		console.log("got ret", r);
		callback(r);
	});
}


export const mintNFT = async (data, pendingCallback, finalCallback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(NFTToken, NFTTokenABI, signer);

	let result = await contract.mintAndStake(data.amount, data.price, data.startTime, NFTSale, data.databaseID, parseInt(data.v), data.r, data.s)
		.then(res => {
			pendingCallback();
			return res.wait();
		})

	finalCallback(result)
}

export const buyNFT = async (data, pendingCallback, finalCallback) => {
	const { provider } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(NFTSale, NFTSaleABI, signer);

	contract.NFTSetSale();
	let result = await contract.buy(data.saleId, data.nftID, data.amount, data.account)
		.then(res => {
			pendingCallback();
			return res.wait();
		})
	console.log("buy result", result);
	finalCallback(result)
}


