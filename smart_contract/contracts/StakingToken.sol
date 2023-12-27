// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingToken is ERC20 {
    address public owner;

    constructor() ERC20("Staking Token", "Stake Token") {
        owner = msg.sender;
    }

    function mint(address to, uint amount) public {
        _mint(to, amount);
    }
}
