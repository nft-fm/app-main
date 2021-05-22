const TEST_NFTToken = "0x2c4EC4e60edf2352546C72Ba6ef1585DBA2AF4f9";
const TEST_FlatPriceSale = "0x5B9B4a70Bc62eaE25D96FAc206d75E6CEf18B24d";

const MAIN_NFTToken = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";

const isMain = process.env.REACT_APP_IS_MAINNET;

const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;

module.exports = {
NFTToken,
FlatPriceSale,
}
