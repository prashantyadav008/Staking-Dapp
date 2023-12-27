// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IRewardToken {
    function mint(address to, uint amount) external;

    function setStakeContract(address _stakeContract) external;
}
