const TEST_NftAddress = "0x2F21E100bbDb58349aF2EE1EC9C0016783A9e48A";
const TEST_FlatPriceSale = "0x00972A100d0b36b608467F38A803DaDa78f2Cd87";
const TEST_VinylAddress = "0x79de729addde262592ef50f8ac37a92b81854c4f";
const TEST_TokenSaleAddress = "0x71231555F136435270b095744277e7204757F12e";
const TEST_AirdropAddress = "0xfb350dc8c2d739F9cA19A8A3B340e85c14138E6c";

const TEST_BSC_NftAddress = "0xF495c06BdB0F87489384ecAb838c4e8d0068a590";
const TEST_BSC_FlatPriceSale = "0x7A1eE0C0c12a2425832EDFE013eCf43874E9524B";

const TEST_StakingAddress = "0xfa800E905Ca7e8CaFB283a6F4c1A91f178602500"

const MAIN_VinylAddress = "4";
const MAIN_NftAddress = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";
const MAIN_TokenSaleAddress = "0xB29F1ab1b820ec5E96Df9D237dD6C1b4AFDCc534";
const MAIN_AirdropAddress = "0xC5532b875fab234b5aA58d6b28C208DF2f739b8F";

const MAIN_BSC_NftAddress = "0xbE2158fd41bCca105Bf68f54B8A4794d4a25A3cC";
const MAIN_BSC_FlatPriceSale = "0x163379Fe64F07bD6a4b84f10c6Ba9AA9d4F2DFCa";

const MAIN_StakingAddress = "0xfa800E905Ca7e8CaFB283a6F4c1A91f178602500" //TODO deploy and change this

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NftAddress = isMain ? MAIN_NftAddress : TEST_NftAddress;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
export const VinylAddress = isMain ? MAIN_VinylAddress : TEST_VinylAddress;
export const TokenSaleAddress = isMain ? MAIN_TokenSaleAddress : TEST_TokenSaleAddress;
export const AirdropAddress = isMain ? MAIN_AirdropAddress : TEST_AirdropAddress;

export const BSC_NftAddress = isMain ? MAIN_BSC_NftAddress : TEST_BSC_NftAddress;
export const BSC_FlatPriceSale = isMain ? MAIN_BSC_FlatPriceSale : TEST_BSC_FlatPriceSale;

export const StakingAddress = isMain ? MAIN_StakingAddress : TEST_StakingAddress