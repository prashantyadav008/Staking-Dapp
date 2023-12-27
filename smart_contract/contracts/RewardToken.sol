// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./IRewardToken.sol";

contract RewardToken is ERC20, IRewardToken {
    address public owner;

    address public stakeContract;

    constructor() ERC20("Reward Token", "Reward Token") {
        owner = msg.sender;
    }

    function mint(address to, uint amount) external {
        _mint(to, amount);
    }

    function setStakeContract(address _stakeContract) external {
        require(
            owner == msg.sender,
            "RewardToken: Only Owner can perform this action!"
        );

        require(
            _stakeContract != address(0),
            "RewardToken: Contract Address is Invalid!"
        );

        stakeContract = _stakeContract;
    }
}
