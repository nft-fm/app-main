const TEST_NFTToken = "0x2c4EC4e60edf2352546C72Ba6ef1585DBA2AF4f9";
const TEST_FlatPriceSale = "0x5B9B4a70Bc62eaE25D96FAc206d75E6CEf18B24d";
const TEST_VinylAddress = "0x79de729addde262592ef50f8ac37a92b81854c4f";

const MAIN_VinylAddress = "0xc17b6C92BB728259ca2F76c88a4A48ac077587f7";
const MAIN_NFTToken = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
export const VinylAddress = isMain ? MAIN_VinylAddress : TEST_VinylAddress;