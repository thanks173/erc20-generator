// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title StandardERC20
 * @dev Implementation of the StandardERC20
 */
contract StandardERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialBalance
    ) payable ERC20(name, symbol) {
        require(initialBalance > 0, "StandardERC20: supply cannot be zero");

        _setupDecimals(decimals);
        _mint(_msgSender(), initialBalance);
    }
}
