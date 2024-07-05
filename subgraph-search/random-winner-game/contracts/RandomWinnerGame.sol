// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomWinnerGame is Ownable {
    address public s_owner;

    bool public gameStarted;
    uint8 public maxPlayers;
    uint256 public entryFee;
    address[] public players;
    uint256 public gameId;

    constructor(address _owner) Ownable(_owner) {
        s_owner = _owner;
    }

    event GameStarted(uint256 indexed gameId, uint8 indexed maxPlayers, uint256 entryFee);
    event PlayerJoined(uint256 indexed gameId, address indexed player);
    event GameEnded(uint256 indexed gameId, address indexed winner, uint256 requestId);

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
            // here we will generate random number with auto increment but not VRF service
            // for simplicity we will use block.timestamp as random number
            uint256 requestId = block.timestamp;

            // mod 
            uint256 winnerIndex = requestId % maxPlayers;
            address winner = players[winnerIndex];
            
            // here we will not pay for testing subgraph search query
            // payable(winner).transfer(address(this).balance);

            emit GameEnded(gameId, winner, requestId);

            gameStarted = false;
        }
    }
}
