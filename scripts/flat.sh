#!/usr/bin/env bash

for contract in "SimpleERC20" "StandardERC20" "PausableERC20" "BurnableERC20" "MintableERC20" "CommonERC20" "UnlimitedERC20" "AmazingERC20" "PowerfulERC20"
do
  npx truffle-flattener contracts/token/ERC20/$contract.sol > dist/$contract.dist.sol
done
