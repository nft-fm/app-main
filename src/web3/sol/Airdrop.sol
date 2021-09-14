
// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.7.3;

import "./lib/Context.sol";
import "./lib/IERC20.sol";

contract Airdrop is Context {
	function airdrop(address token, address[] memory wallets, uint256[] memory amounts) public {
		require(wallets.length == amounts.length, "Array lengths must match.");
		IERC20 tokenContract = IERC20(token);
		for (uint i = 0; i < wallets.length; i++)
			tokenContract.transferFrom(_msgSender(), wallets[i], amounts[i]);
	}
}