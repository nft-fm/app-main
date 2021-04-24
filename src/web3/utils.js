import { Contract, utils, providers, constants, BigNumber, getDefaultProvider } from "ethers";

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
