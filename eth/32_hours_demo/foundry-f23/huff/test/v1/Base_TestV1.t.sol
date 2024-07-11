// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {IHorseStore} from "../../src/horseStoreV1/IHorseStore.sol";
import {HorseStore} from "../../src/horseStoreV1/HorseStore.sol";
import {Test, console2} from "forge-std/Test.sol";

abstract contract Base_TestV1 is Test {

    string public constant horseStoreLocation = "horseStoreV1/HorseStore";
    IHorseStore public horseStore;

    function setUp() public virtual {
        horseStore = IHorseStore(address(new HorseStore()));
    }

    function testReadValue() public view {
        uint256 initalValue = horseStore.readNumberOfHorses();
        assertEq(initalValue, 0);
    }

    function testWriteValue() public {
        horseStore.updateHorseNumber(10);
        uint256 initalValue = horseStore.readNumberOfHorses();
        assertEq(initalValue, 10);
    }
}
