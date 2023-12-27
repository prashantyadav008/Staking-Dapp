// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IRewardToken.sol";

contract StakeContract {
    ERC20 public stakingToken;
    IRewardToken public rewardToken;

    constructor(ERC20 _stakingToken, IRewardToken _rewardToken) {
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
    }

    function stakeToken(uint stakeAmount) external view {
        require(
            stakeAmount > 0 &&
                stakingToken.balanceOf(msg.sender) >= stakeAmount,
            "Stake: Token Quantity is Invalid !"
        );
    }
}
