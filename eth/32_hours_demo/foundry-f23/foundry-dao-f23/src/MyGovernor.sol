// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Governor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorSettings} from "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {GovernorVotesQuorumFraction} from
    "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import {GovernorTimelockControl} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {IGovernor} from "@openzeppelin/contracts/governance/IGovernor.sol";

// 这个合约是 DAO 中的治理合约，用于投票决定是否执行某个提案
contract MyGovernor is
    Governor, // 
    GovernorSettings, // 提供了设置投票延迟时间、投票时间、提案最小投票数量的接口
    GovernorCountingSimple, // 提供了计票的接口
    GovernorVotes, // 提供了投票的接口
    GovernorVotesQuorumFraction, // 提供了计算提案通过的最小投票数量的接口
    GovernorTimelockControl // 提供了控制提案的接口。
{
    constructor(IVotes _token, TimelockController _timelock)
        Governor("MyGovernor")
        GovernorSettings(1, /* 1 block */ 50400, /* 1 week */ 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4)
        GovernorTimelockControl(_timelock)
    {}

    // The following functions are overrides required by Solidity.

    // 这个函数是 GovernorSettings 的接口函数，返回投票延迟的时间，这个延迟时间是指提案被创建后，需要等待多久才能开始投票
    function votingDelay() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingDelay();
    }

    // 这个函数是 GovernorSettings 的接口函数，返回投票的时间，这个时间是指投票开始后，需要等待多久才能结束投票
    function votingPeriod() public view override(IGovernor, GovernorSettings) returns (uint256) {
        return super.votingPeriod();
    }

    // 这个函数是 GovernorSettings 的接口函数，返回提案的最小投票数量，如果投票数量低于这个值，提案会被拒绝
    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    // 这个函数是 Governor 的接口函数，返回提案的状态，包括 Pending、Active、Canceled、Defeated、Succeeded、Queued、Expired、Executed
    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    // 这个函数是 Governor 的接口函数，返回提案的投票结果，包括 NotYetOpen、InVote、Accepted、Rejected、Canceled
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor, IGovernor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function proposalThreshold() public view override(Governor, GovernorSettings) returns (uint256) {
        return super.proposalThreshold();
    }

    // 这个函数是 Governor 的接口函数，用于投票。投票者可以选择支持、反对、或者不投票
    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    // 这个函数是 Governor 的接口函数，用于取消提案。只有在提案还没有被执行的情况下才能取消提案
    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    // 这个函数是 Governor 的接口函数，用于投票。投票者可以选择支持、反对、或者不投票
    function _executor() internal view override(Governor, GovernorTimelockControl) returns (address) {
        return super._executor();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
