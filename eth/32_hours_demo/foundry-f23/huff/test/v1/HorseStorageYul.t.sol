// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Base_TestV1} from "./Base_TestV1.t.sol";
import {HorseStoreYul} from "../../src/horseStoreV1/HorseStoreYul.sol";
import {IHorseStore} from "../../src/horseStoreV1/IHorseStore.sol";

//  默认会继承和执行父类的 setUp 和所有测试方法
contract HorseStorageYul is Base_TestV1 {
 
    function setUp() public override {
        horseStore = IHorseStore(address(new HorseStoreYul()));
    }   
}