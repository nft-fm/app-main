import { Contract, utils, providers, constants, BigNumber, getDefaultProvider } from "ethers";
import ERC20StakingABI from "./abi/Erc20StakingPool.abi";
import BDTABI from "./abi/BDT.abi";
import DCABI from "./abi/DC.abi";
import NFTABI from "./abi/NFT.abi";
import NFTSaleABI from "./abi/NFTSale.abi";
import {
	ERC20StakingAddress, LPStakingAddress, BDTAddress, BDTLPAddress, DCAddress,
	NFTAddress, NFTSaleAddress
} from './constants';
import WalletConnectProvider from "@walletconnect/web3-provider";
import isMobile from "../utils/isMobile";

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

// export const getPendingNFTs = async (callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTSaleAddress, NFTSaleABI, signer);
// 	let pending = await contract.getPendingPurchases(walletAddress)
// 	callback(pending)
// }

// export const redeemNFT = async (data, callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTSaleAddress, NFTSaleABI, signer);
// 	console.log("redeeming", contract, data);
// 	console.log("args", data.saleID, data.amount, data.saleID, parseInt(data.v), data.r, data.s)

// 	// let result = await contract.redeemERC1155(data.id, data.amount, data.saleID, parseInt(data.v), data.r, data.s)
// 	let result = await contract.redeemERC1155(data.saleID, data.amount, data.saleID, parseInt(data.v), data.r, data.s).then(res => res.wait())

// 	console.log("redeem nft result", result);

// 	callback(result)
// }

// export const getMyNFTs = async (callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTAddress, NFTABI, signer);
// 	let nfts = await contract.getFullBalance(walletAddress)
// 	console.log("mine", nfts);
// 	callback(nfts)
// }

// export const getOthersNFTs = async (callback, profile) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTAddress, NFTABI, signer);
// 	let nfts = await contract.getFullBalance(profile.address);
// 	callback(nfts, profile)
// }

