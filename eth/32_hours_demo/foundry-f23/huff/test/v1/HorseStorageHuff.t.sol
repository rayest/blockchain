// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {HuffDeployer} from "foundry-huff/HuffDeployer.sol";
import {Base_TestV1, HorseStore} from "./Base_TestV1.t.sol";

contract HorseStorageHuff is Base_TestV1 {

 function setUp() public override {
        horseStore = HorseStore(HuffDeployer.config().deploy(horseStoreLocation));
    // }

    // function testReadHuffValue() public {
    //     uint256 initalValue = horseStoreHuff.readNumberOfHorses();
    //     assertEq(initalValue, 0);
    // }
}
}