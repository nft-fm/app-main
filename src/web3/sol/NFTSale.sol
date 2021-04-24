// SPDX-License-Identifier: MIT

import "./lib/Context.sol";
import "./lib/SafeMath.sol";
import "./lib/Ownable.sol";
import "./lib/IERC20.sol";
import "./lib/IERC1155.sol";
import "./lib/ReentrancyGuard.sol";

pragma solidity 0.8.4;

contract NFTSale is Context, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    constructor (
      address nftToken, address _authAddress
    ) {
        NFT_TOKEN = IERC1155(nftToken);
		nftAddress = nftToken;
        authAddress = _authAddress;
    }

    event Buy(uint256 indexed saleId, uint256 nftID, uint256 amount, address indexed account);

    address public authAddress;
	address public nftAddress;
    IERC1155 private NFT_TOKEN;

    struct NFTSetSale {
      uint32 saleId;
      uint256 timestamp;
	  address buyer;
    }

    mapping(uint32 => NFTSetSale) public sales;
    uint32 public totalSales;

	struct NFTSet {
		address payable artist;
		uint256 startTime;
		uint32 quantity;
		uint32 sold;
		uint256 price;
		bool isPaused;
	}

	mapping(uint256 => NFTSet) sets;

	function stake(uint256 nftID, address payable artist, uint32 amount, uint256 price, uint256 startTime) public nonReentrant {
		require(_msgSender() == nftAddress, "Can only stake via NFT_FM contract.");
		require(sets[nftID].artist == address(0), "Sale already exists for that NFT.");
		sets[nftID] = NFTSet(artist, startTime, amount, 0, price, false);
	}

	function buyNFT(uint256 nftID, uint32 amount) payable public nonReentrant {
		NFTSet memory set = sets[nftID];
		require(set.artist != address(0), "Sale does not exist.");
		require(amount > 0, "Must select an amount of tokens");
		require(block.timestamp > set.startTime, "Sale has not started yet.");
		require(!set.isPaused, "Sale is paused.");
		require(set.sold + amount > amount, "Addition overflow");
		require(set.sold + amount <= set.quantity, "Insufficient stock.");

		totalSales++;
		sales[totalSales] = NFTSetSale(totalSales, block.timestamp, _msgSender());
		emit Buy(totalSales, nftID, amount, _msgSender());

		uint256 cost = set.price.mul(amount).mul(1e18);
		require(cost == msg.value, "Exact change required.");
		sets[nftID].sold = set.sold + amount;
		sets[nftID].artist.transfer(cost);
		NFT_TOKEN.safeTransferFrom(address(this), _msgSender(), nftID, amount, "");
	}

    function setAuthAddress(address _address) public onlyOwner {
        authAddress = _address;
    }

    function setSetPrice(uint256 nftID, uint256 price) public {
		require(sets[nftID].artist == _msgSender(), "You are not the artist.");
		sets[nftID].price = price;
    }

	function pauseSale(uint256 nftID) public {
		require(sets[nftID].artist == _msgSender(), "You are not the artist.");
		sets[nftID].isPaused = true;
	}

	function unpauseSale(uint256 nftID) public {
		require(sets[nftID].artist == _msgSender(), "You are not the artist.");
		sets[nftID].isPaused = false;
	}
}