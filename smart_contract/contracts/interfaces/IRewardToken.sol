// SPDX-License-Identifier: UNLICENSED
// The SPDX-License-Identifier specifies the license type for your smart contract.

// Solidity version to be used for compilation. ^0.8.9 means any version that is 0.8.9 or higher.
pragma solidity ^0.8.9;

/**
 * @title IRewardToken
 * @dev Interface for a reward token in a staking platform.
 */
interface IRewardToken {
    /**
     * @dev Function to mint new reward tokens and assign them to a specified address.
     * @param to The address to which new reward tokens will be minted.
     * @param amount The amount of reward tokens to mint.
     */
    function mint(address to, uint amount) external;

    /**
     * @dev Function to set the associated staking contract address.
     * @param _stakeContract The address of the staking contract.
     */
    function setStakeContract(address _stakeContract) external;
}
