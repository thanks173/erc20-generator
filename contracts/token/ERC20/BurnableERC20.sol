// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

/**
 * @title BurnableERC20
 * @dev Implementation of the BurnableERC20
 */
contract BurnableERC20 is ERC20Burnable {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialBalance
    ) payable ERC20(name, symbol) {
        require(initialBalance > 0, "BurnableERC20: supply cannot be zero");

        _setupDecimals(decimals);
        _mint(_msgSender(), initialBalance);
    }
}
