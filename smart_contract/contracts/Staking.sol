// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IRewardToken.sol";
import "./interfaces/IStake.sol";

import "hardhat/console.sol";

contract Staking is IStake {
  address public owner;
  IERC20 public stakingToken;
  IRewardToken public rewardToken;

  uint public totalPackages;

  mapping(uint => Package) public packages;

  mapping(address => StakeHolder[]) public _stakes;

  address[] public _stakers;
  mapping(address => bool) public isStaked;

  constructor(IERC20 _stakingToken, IRewardToken _rewardToken) {
    owner = msg.sender;
    stakingToken = _stakingToken;
    rewardToken = _rewardToken;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Stake: Only Owner can perform this action!");
    _;
  }

  modifier isValidPackage(uint packageId) {
    require(
      packageId > 0 && packageId <= totalPackages,
      "Stake: Invalid Package Id!"
    );
    _;
  }

  function addPackages(
    uint _percentageInBips,
    uint _inDays
  ) external onlyOwner {
    unchecked {
      totalPackages++;
    }
    require(_percentageInBips > 100 && _inDays > 0, "Stake: Value is Invalid!");

    uint dayInSecond = 24 * 60 * 60;
    Package memory p1;
    p1.percentageInBips = _percentageInBips;
    p1.inDays = _inDays * dayInSecond;
    p1.active = true;
    packages[totalPackages] = p1;
  }

  function updatePackages(
    uint packageId,
    uint _percentageInBips,
    uint _inDays,
    bool active
  ) external onlyOwner isValidPackage(packageId) {
    require(_inDays > 0 && _percentageInBips > 100, "Stake: Value is Invalid!");

    uint dayInSecond = 24 * 60 * 60;
    Package memory p1 = packages[packageId];
    p1.percentageInBips = _percentageInBips;
    p1.inDays = _inDays * dayInSecond;
    p1.active = active;
    packages[packageId] = p1;
  }

  function stakeToken(
    uint packageId,
    uint _stakeAmount
  ) external isValidPackage(packageId) {
    Package memory p1 = packages[packageId];

    require(p1.active, "Stake: Package not Active Yet!");

    require(_stakeAmount > 10000, "Stake: Stake Amount is greater than 10000!");

    require(
      stakingToken.balanceOf(msg.sender) >= _stakeAmount,
      "Stake: Not Enough Token!"
    );

    StakeHolder memory s1;
    s1.stakeAmount = _stakeAmount;
    s1.totalClaimedReward = 0;
    s1.percentageInBips = p1.percentageInBips;
    s1.inDays = p1.inDays;
    s1.createdAt = block.timestamp;
    s1.withdrawAt = 0;
    s1.claimed = false;

    _stakes[msg.sender].push(s1);

    if (!isStaked[msg.sender]) {
      _stakers.push(msg.sender);
      isStaked[msg.sender] = true;
    }
  }

  function viewStakes(
    address userAddress
  ) external view returns (StakeHolder[] memory) {
    return _stakes[userAddress];
  }

  function stakerList() external view returns (address[] memory) {
    return _stakers;
  }

  function calculateStake(
    address userAddress,
    uint indexing
  ) public view returns (uint, uint) {
    StakeHolder memory s1 = _stakes[userAddress][indexing];

    // after time staking completed calulate percentage of stake
    uint percentage = (s1.stakeAmount * s1.percentageInBips) / 10000;

    // calculate per second reward generated
    uint perSecond = (percentage * 10 ** 8) / s1.inDays;

    // calculate total per second reward generated more time after staking time completed
    uint calculate = (block.timestamp - s1.createdAt) * perSecond;

    return (perSecond, calculate);
  }

  function withdrawalTokens(uint indexing) external {
    StakeHolder memory s1 = _stakes[msg.sender][indexing];

    require(block.timestamp > s1.inDays, "Stake: Staking Time not Completed!");

    require(!s1.claimed, "Stake: Reward Token already withdrawal!");

    (, uint tokens) = calculateStake(msg.sender, indexing);

    s1.withdrawAt = block.timestamp;
    s1.totalClaimedReward = tokens / 10 ** 8;
    s1.claimed = true;

    _stakes[msg.sender][indexing] = s1;

    rewardToken.mint(msg.sender, 0);
  }
}
