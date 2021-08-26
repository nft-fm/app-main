const bscData = {
  chainId: "0x38",
  chainName: "Smart Chain",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};

const bscTestData = {
  chainId: "0x61",
  chainName: "BSC TestNet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  blockExplorerUrls: ["https://testnet.bscscan.com"],
};

const ethData = {
  chainId: "0x1",
};

const rinkebyData = {
  chainId: "0x4",
};

async function switchNetwork(network) {
  let method;
  let params;
  switch (network) {
    case "BSC":
      method = "wallet_addEthereumChain";
      params = process.env.REACT_APP_IS_MAINNET ? bscData : bscTestData;
      break;
    case "ETH":
      method = "wallet_switchEthereumChain";
      params = process.env.REACT_APP_IS_MAINNET ? ethData : rinkebyData;
      break;
  }
  if (!params) {
    return;
  }
  try {
    //The method returns null if the request was successful, and an error otherwise.
    const errors = await window.ethereum.request({
      method: method,
      params: [params],
    });

    if (!errors) {
      console.log("All good!");
      return;
    } else {
      console.log("Your loss!");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

export default switchNetwork;
