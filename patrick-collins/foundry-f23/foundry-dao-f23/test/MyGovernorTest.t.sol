// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {MyGovernor} from "../src/MyGovernor.sol";
import {GovToken} from "../src/GovToken.sol";
import {TimeLock} from "../src/TimeLock.sol";
import {Box} from "../src/Box.sol";

contract MyGovernorTest is Test {
    GovToken token;
    TimeLock timelock;
    MyGovernor governor;
    Box box;

    uint256 public constant MIN_DELAY = 3600; // 1 hour - after a vote passes, you have 1 hour before you can enact
    uint256 public constant QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
    uint256 public constant VOTING_PERIOD = 50400; // This is how long voting lasts
    uint256 public constant VOTING_DELAY = 1; // How many blocks till a proposal vote becomes active

    address[] proposers;
    address[] executors;

    bytes[] functionCalls;
    address[] addressesToCall;
    uint256[] values;

    address public constant VOTER = address(1);

    function setUp() public {
        token = new GovToken(); // 初始化一个 GovToken 合约
        token.mint(VOTER, 100e18); // 给 VOTER 地址发行 100 个代币

        vm.prank(VOTER); // 设置当前调用者为 VOTER 地址
        token.delegate(VOTER); // VOTER 地址委托给自己
        timelock = new TimeLock(MIN_DELAY, proposers, executors); // 初始化一个 TimeLock 合约
        governor = new MyGovernor(token, timelock); // 初始化一个 MyGovernor 合约
        bytes32 proposerRole = timelock.PROPOSER_ROLE(); // 获取 TimeLock 合约的 PROPOSER_ROLE
        bytes32 executorRole = timelock.EXECUTOR_ROLE(); // 获取 TimeLock 合约的 EXECUTOR_ROLE
        bytes32 adminRole = timelock.TIMELOCK_ADMIN_ROLE(); // 获取 TimeLock 合约的 TIMELOCK_ADMIN_ROLE

        timelock.grantRole(proposerRole, address(governor)); // 授予 MyGovernor 合约 PROPOSER_ROLE 权限
        timelock.grantRole(executorRole, address(0)); // 授予 0 地址 EXECUTOR_ROLE 权限
        timelock.revokeRole(adminRole, msg.sender); // 撤销 msg.sender 的 TIMELOCK_ADMIN_ROLE 权限

        box = new Box();
        box.transferOwnership(address(timelock));
    }

    function testCantUpdateBoxWithoutGovernance() public {
        vm.expectRevert();
        box.store(1);
    }

    function testGovernanceUpdatesBox() public {
        uint256 valueToStore = 777; 
        string memory description = "Store 1 in Box";
        bytes memory encodedFunctionCall = abi.encodeWithSignature("store(uint256)", valueToStore);
        addressesToCall.push(address(box));
        values.push(0);
        functionCalls.push(encodedFunctionCall);
        // 1. Propose to the DAO
        uint256 proposalId = governor.propose(addressesToCall, values, functionCalls, description);

        console.log("Proposal State:", uint256(governor.state(proposalId)));
        // governor.proposalSnapshot(proposalId)
        // governor.proposalDeadline(proposalId)

        vm.warp(block.timestamp + VOTING_DELAY + 1);
        vm.roll(block.number + VOTING_DELAY + 1);

        console.log("Proposal State:", uint256(governor.state(proposalId)));

        // 2. Vote
        string memory reason = "I like a do da cha cha";
        // 0 = Against, 1 = For, 2 = Abstain for this example
        uint8 voteWay = 1;
        vm.prank(VOTER);

        // VOTER 投票支持 proposalId 提案
        governor.castVoteWithReason(proposalId, voteWay, reason);

        vm.warp(block.timestamp + VOTING_PERIOD + 1);
        vm.roll(block.number + VOTING_PERIOD + 1);

        console.log("Proposal State:", uint256(governor.state(proposalId)));

        // 3. Queue
        bytes32 descriptionHash = keccak256(abi.encodePacked(description));
        governor.queue(addressesToCall, values, functionCalls, descriptionHash);
        vm.roll(block.number + MIN_DELAY + 1);
        vm.warp(block.timestamp + MIN_DELAY + 1);

        // 4. Execute
        governor.execute(addressesToCall, values, functionCalls, descriptionHash);

        assert(box.retrieve() == valueToStore);
    }
}
