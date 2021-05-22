const TEST_NFTToken = "0x7Bc8AdC89C48be0Fad4694a4906D5B3aA2c5a98f";
const TEST_FlatPriceSale = "0xFD2Ee06b74fD5577Cdb1554CcbA2D363CE0fa236";

const MAIN_NFTToken = "";
const MAIN_FlatPriceSale = "";

const isMain = process.env.REACT_APP_IS_MAINNET;

const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;

module.exports = {
NFTToken,
FlatPriceSale,
}
