const { Contract, Wallet, providers } = require("ethers");

const { NFTToken } = require("./constants");
const NFTTokenABI = require("./abi/NFTToken.abi.js");
const NftType = require("../schemas/NftType.schema");

const listenForMint = async () => {
	let provider = new providers.WebSocketProvider(process.env.WSS_PROVIDER_URL);
	let walletWithProvider = new Wallet(process.env.OWNER_KEY, provider);
	const contract = new Contract(NFTToken, NFTTokenABI, walletWithProvider);

	contract.on("MintAndStake", async (data) => {
		console.log("mint and stake listened",  Number(data), data);
		await NftType.findByIdAndUpdate(Number(data), { isMinted: true, saleId: data.databaseID })
	})
}

module.exports = {
	listenForMint
}