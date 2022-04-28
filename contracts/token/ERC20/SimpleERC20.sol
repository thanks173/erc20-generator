// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SimpleERC20
 * @dev Implementation of the SimpleERC20
 */
contract SimpleERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialBalance
    ) payable ERC20(name, symbol) {
        require(initialBalance > 0, "SimpleERC20: supply cannot be zero");

        _mint(_msgSender(), initialBalance);
    }
}
