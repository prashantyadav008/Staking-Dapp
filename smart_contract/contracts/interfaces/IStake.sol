// SPDX-License-Identifier: UNLICENSED
// The SPDX-License-Identifier specifies the license type for your smart contract.

// Solidity version to be used for compilation. ^0.8.9 means any version that is 0.8.9 or higher.
pragma solidity ^0.8.9;

/**
 * @title IRewardToken
 * @dev Interface for a reward token in a staking platform.
 */
interface IStake {
    struct Package {
        uint percentageInBips;
        uint inDays;
        bool active;
    }

    struct StakeHolder {
        uint stakeAmount;
        uint inDays;
        uint percentageInBips;
        uint totalClaimedReward;
        uint createdAt;
        bool claimed;
    }
}
