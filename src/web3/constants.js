const TEST_NftAddress = "0x11F05b16a4Bc1596f2b0363a645A9F1e103701B5";
const TEST_FlatPriceSale = "0x5D2ec18A9a1d8ca233Af2e33eDC0094bDA061FF6";
const TEST_VinylAddress = "0x79de729addde262592ef50f8ac37a92b81854c4f";
const TEST_TokenSaleAddress = "0x71231555F136435270b095744277e7204757F12e";
const TEST_AirdropAddress = "0xfb350dc8c2d739F9cA19A8A3B340e85c14138E6c";

const TEST_BSC_NftAddress = "0x71231555F136435270b095744277e7204757F12e";
const TEST_BSC_FlatPriceSale = "0xeb641B6557E66a4FD73d463f904A3712bEA054f5";


const MAIN_VinylAddress = "4";
const MAIN_NftAddress = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";
const MAIN_TokenSaleAddress = "0xB29F1ab1b820ec5E96Df9D237dD6C1b4AFDCc534";
const MAIN_AirdropAddress = "0xC5532b875fab234b5aA58d6b28C208DF2f739b8F";

const MAIN_BSC_NftAddress = "0x71231555F136435270b095744277e7204757F12e";
const MAIN_BSC_FlatPriceSale = "0xeb641B6557E66a4FD73d463f904A3712bEA054f5";

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NftAddress = isMain ? MAIN_NftAddress : TEST_NftAddress;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
export const VinylAddress = isMain ? MAIN_VinylAddress : TEST_VinylAddress;
export const TokenSaleAddress = isMain ? MAIN_TokenSaleAddress : TEST_TokenSaleAddress;
export const AirdropAddress = isMain ? MAIN_AirdropAddress : TEST_AirdropAddress;

export const BSC_NftAddress = isMain ? MAIN_BSC_NftAddress : TEST_BSC_NftAddress;
export const BSC_FlatPriceSale = isMain ? MAIN_BSC_FlatPriceSale : TEST_BSC_FlatPriceSale;