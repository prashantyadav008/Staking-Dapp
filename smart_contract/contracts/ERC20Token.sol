// SPDX-License-Identifier: UNLICENSED
// The SPDX-License-Identifier specifies the license type for your smart contract.

// Solidity version to be used for compilation. ^0.8.9 means any version that is 0.8.9 or higher.
pragma solidity ^0.8.9;

// Import the ERC20.sol file from the OpenZeppelin Contracts library.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ERC20Token
 * @dev ERC20 token representing a staking token.
 */
contract ERC20Token is ERC20 {
    // Declare a state variable to store the contract owner's address.
    address public owner;

    /**
     * @dev Constructor that initializes the ERC20 token with a name and symbol.
     */
    constructor() ERC20("Staking Token", "STAKE") {
        // Set the owner variable to the address of the deployer of the contract.
        owner = msg.sender;
    }

    /**
     * @dev Function to mint new staking tokens and assign them to a specified address.
     * @param to The address to which new staking tokens will be minted.
     * @param amount The amount of staking tokens to mint.
     */
    function mint(address to, uint amount) public {
        // Call the internal _mint function from ERC20 to create new tokens.
        _mint(to, amount);
    }
}
