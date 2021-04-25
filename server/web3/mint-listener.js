const { Contract, Wallet, providers } = require("ethers");

const {NFTToken} =  require( "./constants");
const NFTTokenABI = require( "./abi/NFTToken.abi.js");
const NftType = require("../schemas/NftType.schema");

const listenForMint = async () => {
	let provider = new providers.WebsocketProvider(process.env.WSS_PROVIDER_URL);
	let walletWithProvider = new Wallet(process.env.PRIVATE_TEST_KEY, provider);
	const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

	contract.on("MintAndStake", async (data) => {
		await NftType.findByIdAndUpdate(data.nftID, {isMinted: true, saleId: data.databaseID})
	})
}

module.exports = {
	listenForMint
}