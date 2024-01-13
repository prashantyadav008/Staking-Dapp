// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import the ERC20.sol file from the OpenZeppelin Contracts library.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Import the IRewardToken.sol file, assuming it defines an interface for RewardToken.
import "./interfaces/IRewardToken.sol";

/**
 * @title RewardToken
 * @dev ERC20 token representing rewards for a staking platform.
 */
contract RewardToken is ERC20, IRewardToken {
    // Declare a state variable to store the contract owner's address.
    address public owner;

    // Declare a state variable to store the address of the associated staking contract.
    address public staking;

    /**
     * @dev Constructor that initializes the ERC20 token with a name and symbol.
     */
    constructor() ERC20("Reward Token", "REWARD") {
        // Set the owner variable to the address of the deployer of the contract.
        owner = msg.sender;
    }

    /**
     * @dev Function to mint new reward tokens and assign them to a specified address.
     * @param to The address to which new reward tokens will be minted.
     * @param amount The amount of reward tokens to mint.
     */
    function mint(address to, uint amount) external {
        require(
            staking == msg.sender,
            "RewardToken: Only Staking Contract perform this action!"
        );

        // Call the internal _mint function from ERC20 to create new tokens.
        _mint(to, amount);
    }

    /**
     * @dev Function to set the associated staking contract address.
     * Only the owner can perform this action.
     * @param _staking The address of the staking contract.
     */
    function setStaking(address _staking) external {
        // Ensure that only the current owner can set the staking contract address.
        require(
            owner == msg.sender,
            "RewardToken: Only Owner can perform this action!"
        );

        // Ensure that the staking contract address is valid.
        require(
            _staking != address(0),
            "RewardToken: Contract Address is Invalid!"
        );

        // Set the staking contract address.
        staking = _staking;
    }
}
