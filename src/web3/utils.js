import { Contract, utils, providers, constants, BigNumber, getDefaultProvider } from "ethers";
import ERC20StakingABI from "./abi/Erc20StakingPool.abi";
import BDTABI from "./abi/BDT.abi";
import DCABI from "./abi/DC.abi";
// import NFTABI from "./abi/NFT.abi";
// import NFTSaleABI from "./abi/NFTSale.abi";
import {
	ERC20StakingAddress, LPStakingAddress, BDTAddress, BDTLPAddress, DCAddress,
	// NFTAddress, NFTSaleAddress
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
	console.log("provider:\n", provider);
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

export const fetchStakingFee = async (callback) => {
	console.log("called");
	const { provider } = await require()
	const signer = provider.getSigner();
	const contract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);

	const feeRate = contract.getFeeRate().then(r => (utils.formatEther(r)))

	Promise.all([feeRate]).then(res => {
		console.log("returning fee", res[0]);
		callback(
			parseFloat(res[0]).toFixed(2)
		)
	})
}

export const approveBDTStaking = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const contract = new Contract(BDTAddress, BDTABI, signer)
	contract
		.approve(ERC20StakingAddress, constants.MaxUint256)
		.then((r) => r.wait())
		.then(() => {
			const BDTBalance = contract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
			const Allowance = contract.allowance(walletAddress, ERC20StakingAddress).then(r => (utils.formatEther(r)))

			Promise.all([BDTBalance, Allowance]).then((res) => {
				console.log(res);
				callback({ balance: res[0], allowance: parseInt(res[1]) });
			})
		});
}

export const fetchBDTStaked = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);
	const contract = new Contract(BDTAddress, BDTABI, signer)

	const currStaked = stakeContract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	const rewardsAvailable = stakeContract.earned(walletAddress).then(r => (utils.formatEther(r)))
	const BDTBalance = contract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	const Allowance = contract.allowance(walletAddress, ERC20StakingAddress).then(r => (utils.formatEther(r)))
	console.log("what we gots here")

	Promise.all([BDTBalance, Allowance, currStaked, rewardsAvailable]).then((res) => {
		console.log(res);
		callback({ balance: res[0], allowance: parseInt(res[1]), currStaked: res[2], rewardsAvailable: parseFloat(res[3]).toFixed(2) });
	})
}

export const stakeBDT = async (amount, callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);
	stakeContract.stake(utils.parseEther(String(amount))).then(r => r.wait()).then(() => {
		callback()
	});
}

export const unstakeBDT = async (amount, callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);
	stakeContract.withdraw(utils.parseEther(String(amount))).then(r => r.wait()).then(() => {
		callback()
	});
}

export const claimBDTDC = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);
	stakeContract.redeem().then(r => r.wait()).then(() => {
		callback()
	});
}

export const approveBDTLPStaking = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	let contract = new Contract(BDTAddress, BDTABI, signer)
	contract = contract.attach(BDTLPAddress);
	console.log("newContract", contract);
	contract
		.approve(LPStakingAddress, constants.MaxUint256)
		.then((r) => r.wait())
		.then(() => {
			const BDTLPBalance = contract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
			const Allowance = contract.allowance(walletAddress, LPStakingAddress).then(r => (utils.formatEther(r)))
			Promise.all([BDTLPBalance, Allowance]).then((res) => {
				console.log(res);
				callback({ balance: res[0], allowance: parseInt(res[1]) });
			})
		});
}

export const fetchBDTLPStaked = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(LPStakingAddress, ERC20StakingABI, signer);
	let contract = new Contract(BDTAddress, BDTABI, signer)
	contract = contract.attach(BDTLPAddress);
	const currStaked = stakeContract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	const rewardsAvailable = stakeContract.earned(walletAddress).then(r => (utils.formatEther(r)))
	const BDTBalance = contract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	const Allowance = contract.allowance(walletAddress, LPStakingAddress).then(r => (utils.formatEther(r)))

	Promise.all([BDTBalance, Allowance, currStaked, rewardsAvailable]).then((res) => {
		console.log(res);
		callback({ balance: res[0], allowance: parseInt(res[1]), currStaked: res[2], rewardsAvailable: parseFloat(res[3]).toFixed(2) });
	})
}

export const stakeBDTLP = async (amount, callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(LPStakingAddress, ERC20StakingABI, signer);
	stakeContract.stake(utils.parseEther(String(amount))).then(r => r.wait()).then(() => {
		callback()
	});
}

export const unstakeBDTLP = async (amount, callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(LPStakingAddress, ERC20StakingABI, signer);
	stakeContract.withdraw(utils.parseEther(String(amount))).then(r => r.wait()).then(() => {
		callback()
	});
}

export const claimBDTLPDC = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const stakeContract = new Contract(LPStakingAddress, ERC20StakingABI, signer);
	stakeContract.redeem().then(r => r.wait()).then(() => {
		callback()
	});
}

export const getDCBalance = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const contract = new Contract(DCAddress, DCABI, signer);
	const balance = contract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	Promise.all([balance]).then((res) => {
		console.log(res);
		callback(res)
	})
}

export const fetchBDTVotes = async (callback) => {
	const { provider, walletAddress } = await require()
	const signer = provider.getSigner();
	const bdtStakeContract = new Contract(ERC20StakingAddress, ERC20StakingABI, signer);
	let ethBdtLpStakeContract = new Contract(LPStakingAddress, ERC20StakingABI, signer);


	const ethBdtLpStaked = ethBdtLpStakeContract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))
	const bdtStaked = bdtStakeContract.balanceOf(walletAddress).then(r => (utils.formatEther(r)))

	Promise.all([bdtStaked, ethBdtLpStaked]).then((res) => {
		console.log(res);
		callback(parseFloat(res[0]) + (parseFloat(res[1]) * 30));
	})
}

// export const approveNFT = async (callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	const DCContract = new Contract(DCAddress, DCABI, signer);
// 	const BDTContract = new Contract(BDTAddress, BDTABI, signer);
// 	const DCAllowance = DCContract
// 		.approve(NFTSaleAddress, constants.MaxUint256)
// 		.then((r) => r.wait())
// 		.then(() => {
// 			const Allowance = DCContract.allowance(walletAddress, NFTSaleAddress).then(r => (utils.formatEther(r)))
// 			return Allowance;
// 		})
// 	const BDTAllowance = BDTContract
// 		.approve(NFTSaleAddress, constants.MaxUint256)
// 		.then((r) => r.wait())
// 		.then(() => {
// 			const Allowance = BDTContract.allowance(walletAddress, NFTSaleAddress).then(r => (utils.formatEther(r)))
// 			return Allowance;
// 		})
// 	Promise.all([DCAllowance, BDTAllowance]).then((res) => {
// 		console.log("is approved?", res);
// 		const ret = res[0] && res[1];
// 		callback(ret);
// 	})
// }

// export const fetchNFTApproved = async (callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	const DCContract = new Contract(DCAddress, DCABI, provider);
// 	const DCAllowance = DCContract.allowance(walletAddress, NFTSaleAddress).then(r => (utils.formatEther(r)))
// 	const BDTContract = new Contract(BDTAddress, BDTABI, provider);
// 	const BDTAllowance = BDTContract.allowance(walletAddress, NFTSaleAddress).then(r => (utils.formatEther(r)))

// 	Promise.all([DCAllowance, BDTAllowance]).then((res) => {
// 		console.log("is approved?", res);
// 		const ret = res[0] && res[1];
// 		callback(ret);
// 	})
// }

// export const buyNFT = async (callback) => {
// 	const { provider, walletAddress } = await require()
// 	const signer = provider.getSigner();
// 	let contract = new Contract(NFTSaleAddress, NFTSaleABI, signer);

// 	console.log("about to buy", utils.parseEther(String(1)));

// 	contract.estimate.buyNFT(utils.parseEther(String(1))).then(r => r.wait()).then((res) => {
// 		console.log("estimated gas", res);
// 		callback()
// 	});

// 	contract.buyNFT(utils.parseEther(String(1))).then(r => r.wait()).then(() => {
// 		callback()
// 	});
// }
