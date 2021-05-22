const TEST_NFTToken = "0x780105270Ac02e0A591053f9308b314586bB0F92";
const TEST_FlatPriceSale = "0x6b74AFa03BCe7EA12229708588f1701f97560784";
const TEST_VinylAddress = "0x79de729addde262592ef50f8ac37a92b81854c4f";
const TEST_TokenSale = "0x71231555F136435270b095744277e7204757F12e";

const MAIN_VinylAddress = "0xc17b6C92BB728259ca2F76c88a4A48ac077587f7";
const MAIN_NFTToken = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";
const MAIN_TokenSale = "0xB29F1ab1b820ec5E96Df9D237dD6C1b4AFDCc534";

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;
export const VinylAddress = isMain ? MAIN_VinylAddress : TEST_VinylAddress;
export const TokenSaleAddress = isMain ? MAIN_TokenSale : TEST_TokenSale;