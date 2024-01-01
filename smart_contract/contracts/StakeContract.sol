// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IRewardToken.sol";
import "./interfaces/IStake.sol";

/**
Todo
1. Update Staking Token Method.
2. Create Withdrawal Token Method.
3. Create Calculate Token Method.
*/

contract StakeContract is IStake {
    address public owner;
    IERC20 public stakingToken;
    IRewardToken public rewardToken;

    Package[] public packages;

    mapping(address => StakeHolder) private _stakes;

    constructor(IERC20 _stakingToken, IRewardToken _rewardToken) {
        owner = msg.sender;
        stakingToken = _stakingToken;
        rewardToken = _rewardToken;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Stake: Only Owner can perform this action!"
        );
        _;
    }

    modifier isValidPackage(uint packageId) {
        require(
            packageId > 0 && packageId <= packages.length,
            "Stake: Invalid Package Id!"
        );
        _;
    }

    function addPackages(
        uint _inDays,
        uint _percentageInBips
    ) external onlyOwner {
        require(
            _inDays > 0 && _percentageInBips > 100,
            "Stake: Value is Invalid!"
        );
        packages.push(Package(_inDays, _percentageInBips));
    }

    function viewAllPAckages() external view returns (Package[] memory) {
        return packages;
    }

    function stakeToken(
        uint _stakeAmount,
        uint packageId
    ) external isValidPackage(packageId) {
        require(
            _stakeAmount > 10000,
            "Stake: Stake Amount is greater than 10000!"
        );

        require(
            stakingToken.balanceOf(msg.sender) >= _stakeAmount,
            "Stake: Not Enough Token!"
        );

        Package memory p1 = packages[packageId];

        StakeHolder memory s1;
        s1.stakeAmount = _stakeAmount;
        s1.inDays = p1.inDays;
        s1.percentageInBips = p1.percentageInBips;
        s1.totalClaimedReward = 0;
        s1.createdAt = block.timestamp;
        _stakes[msg.sender] = s1;
    }
}
