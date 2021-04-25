import {NFTToken} from "./constants";
import NFTTokenABI from "./abi/NFTToken.abi.js";
import NftType from "../../src/web3/constants"

const { Contract, Wallet, providers } = require("ethers");

const listenForMint = async () => {
	let provider = new providers.WebsocketProvider(process.env.WSS_PROVIDER_URL);
	let walletWithProvider = new Wallet(process.env.PRIVATE_TEST_KEY, provider);
	const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

	contract.on("MintAndStake", async (data) => {
		await NftType.findByIdAndUpdate(data.nftID, {isMinted: true, saleId: data.databaseID})
	})
}