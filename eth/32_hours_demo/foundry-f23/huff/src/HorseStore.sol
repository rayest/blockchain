// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

contract HorseStore {
    uint256 public numberOfHorse;
    
    function updateHorseNumber(uint256 newNumberOfHorse)  external  {
        numberOfHorse = newNumberOfHorse;
    }

    function getNumberOfHorse() external view returns (uint256) {
        return numberOfHorse;
    }
}