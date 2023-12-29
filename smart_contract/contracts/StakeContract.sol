// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IRewardToken.sol";
import "./interfaces/IStake.sol";

contract StakeContract is IStake {
    address public owner;
    IERC20 public stakingToken;
    IRewardToken public rewardToken;

    Package[] public packages;

    mapping(address => StakeHolder) private _stakes;

    constructor(IERC20 _stakingToken, IRewardToken _rewardToken) {
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

    function addUpdatePackages(
        uint _inDays,
        uint _percentage
    ) external onlyOwner {
        require(_inDays > 0 && _percentage > 0, "Stake: Value is Invalid!");
        packages.push(Package(_inDays, _percentage));
    }

    function viewAllPAckages() external view returns (Package[] memory) {
        return packages;
    }

    function stakeToken(
        uint _stakeAmount,
        uint packageId
    ) external isValidPackage(packageId) {
        require(_stakeAmount > 0, "Stake: Stake Amount not enough!");

        require(
            stakingToken.balanceOf(msg.sender) >= _stakeAmount,
            "Stake: Not Enough Token!"
        );

        Package memory p1 = packages[packageId];

        StakeHolder memory s1;
        s1.stakeAmount = _stakeAmount;
        s1.inDays = p1.inDays;
        s1.percentage = p1.percentage;
        s1.totalClaimedReward = 0;
        s1.createdAt = block.timestamp;
        _stakes[msg.sender] = s1;
    }
}
