// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {HuffDeployer} from "foundry-huff/HuffDeployer.sol";
import {Base_TestV1, HorseStore} from "./Base_TestV1.t.sol";

contract HorseStorageHuff is Base_TestV1 {

 function setUp() public override {
        // 这里：读取的是 huff 合约所在的位置嘛，和 solc 的不一样
        // 然后：默认会继承和执行父类的 setUp 和所有测试方法
        horseStore = HorseStore(HuffDeployer.config().deploy(horseStoreLocation));
    // }

    // function testReadHuffValue() public {
    //     uint256 initalValue = horseStoreHuff.readNumberOfHorses();
    //     assertEq(initalValue, 0);
    // }
}
}