const TEST_NFTToken = "0x56A1109767Fb39b048e2db760F6875FB3b3013e2";
const TEST_FlatPriceSale = "0x598cB39cB8049c5937b74f6570D97757F8EC8d7b";

const MAIN_NFTToken = "";
const MAIN_FlatPriceSale = "";

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
