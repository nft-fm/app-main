const TEST_NFTToken = "0x780105270Ac02e0A591053f9308b314586bB0F92";
const TEST_FlatPriceSale = "0x6b74AFa03BCe7EA12229708588f1701f97560784";

const MAIN_NFTToken = "0x88d3e00ce938f1A591336131B859465b50D608B7";
const MAIN_FlatPriceSale = "0xb46700fBE3C2ed36851A4ccFeAD109ceff32D40f";

const isMain = process.env.REACT_APP_IS_MAINNET;

export const NFTToken = isMain ? MAIN_NFTToken : TEST_NFTToken;
export const FlatPriceSale = isMain ? MAIN_FlatPriceSale : TEST_FlatPriceSale;