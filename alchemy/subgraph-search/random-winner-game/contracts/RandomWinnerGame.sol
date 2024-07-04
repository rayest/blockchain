// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract RandomWinnerGame is VRFConsumerBaseV2Plus {
    bool public gameStarted;
    uint8 public maxPlayers;
    uint256 public entryFee;
    address[] public players;
    uint256 public gameId;

    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256 randomWords;
    }

    // chain link variables
    mapping(uint256 => RequestStatus) public s_requests;
    uint256 public s_subscriptionId;
    uint256[] public requestIds;
    uint256 public lastRequestId;
    bytes32 public keyHash = 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint32 public callbackGasLimit = 100000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;

    constructor(uint256 subscriptionId) VRFConsumerBaseV2Plus(0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B) {
        s_subscriptionId = subscriptionId;
    }

    event GameStarted(uint256 indexed gameId, uint8 indexed maxPlayers, uint256 entryFee);
    event PlayerJoined(uint256 indexed gameId, address indexed player);
    event GameEnded(uint256 indexed gameId, address indexed winner, uint256 requestId);

    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    error RandomWinnerGame__GameAlreadyStarted();
    error RandomWinnerGame__GameNotStarted();
    error RandomWinnerGame__GameIsFull();
    error RandomWinnerGame__MaxPlayersLessThanZero();
    error RandomWinnerGame__ValueNotEqualEntryFee();

    function startGame(uint8 _maxPlayers, uint256 _entryFee) external onlyOwner {
        if (gameStarted) {
            revert RandomWinnerGame__GameAlreadyStarted();
        }
        if (_maxPlayers <= 0) {
            revert RandomWinnerGame__MaxPlayersLessThanZero();
        }

        gameStarted = true;
        maxPlayers = _maxPlayers;
        entryFee = _entryFee;
        gameId++;
        delete players;
        emit GameStarted(gameId, maxPlayers, entryFee);
    }

    function joinGame() external payable {
        if (!gameStarted) {
            revert RandomWinnerGame__GameNotStarted();
        }
        if (players.length >= maxPlayers) {
            revert RandomWinnerGame__GameIsFull();
        }
        if (msg.value != entryFee) {
            revert RandomWinnerGame__ValueNotEqualEntryFee();
        }

        if (players.length >= maxPlayers) {
            revert RandomWinnerGame__GameIsFull();
        }

        players.push(msg.sender);
        emit PlayerJoined(gameId, msg.sender);

        if (players.length == maxPlayers) {
            getRandomWinner(false);
            // todo we can use the return value to other things if needed
        }
    }

    function getRandomWinner(bool enableNativePayment) private onlyOwner returns (uint256 requestId) {
        // Will revert if subscription is not set and funded.
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: enableNativePayment}))
            })
        );
        s_requests[requestId] = RequestStatus({randomWords: 0, exists: true, fulfilled: false});
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    // this is the callback function that will be called by the chainlink node automatically
    function fulfillRandomWords(uint256 _requestId, uint256[] calldata _randomWords) internal override {
        require(s_requests[_requestId].exists, "request not found");
        uint256 winnerIndex = _randomWords[0] % players.length;
        address winner = players[winnerIndex];
        (bool success,) = winner.call{value: address(this).balance}("");
        require(success, "Failed to send ether to winner.");
        emit GameEnded(gameId, winner, _requestId);
        gameStarted = false;
    }
}
