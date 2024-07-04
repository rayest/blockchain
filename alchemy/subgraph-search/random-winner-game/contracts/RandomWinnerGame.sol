// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";


contract RandomWinnerGame {
    event GameStarted(uint256 indexed gameId, uint8 indexed maxPlayers, uint256 entryFee);
    event PlayerJoined(uint256 indexed gameId, address indexed player);
    event GameEnded(uint256 indexed gameId, address indexed winner, uint256 requestId);

    error RandomWinnerGame__GameAlreadyStarted();
    error RandomWinnerGame__GameNotStarted();
    error RandomWinnerGame__GameIsFull();
    error RandomWinnerGame__MaxPlayersLessThanZero();
    error RandomWinnerGame__ValueNotEqualEntryFee();

    function startGame() public{

    }

}
