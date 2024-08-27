// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/// @custom:oz-upgrades-from Greeter
contract GreeterV2 is Initializable, OwnableUpgradeable {
    string public greeting;

    function initialize(address initalOwner, string memory _greeting) public initializer {
        __Ownable_init(initalOwner);
        greeting = _greeting;
    }

    function resetGreeting() public {
        greeting = "resetted greeting";
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
