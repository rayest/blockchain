// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Proxy.sol";

contract SmallProxy is Proxy {
    // This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    bytes32 private constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // 该函数用于设置实现合约的地址，如果要升级合约，只需要调用该函数并传入新的实现合约地址即可。 
    function setImplementation(address newImplementation) public {
        assembly {
            // 存储新的实现合约地址
            sstore(_IMPLEMENTATION_SLOT, newImplementation)
        }
    }

    // 该函数用于获取实现合约的地址 
    function _implementation() internal view override returns (address implementationAddress) {
        assembly {
            implementationAddress := sload(_IMPLEMENTATION_SLOT)
        }
    }

    // 该函数用于获取调用实现合约的数据，返回的是一个 bytes 类型的数据，可以通过 abi.decode 函数来解码。
    function getDataToTransact(uint256 numberToUpdate) public pure returns (bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", numberToUpdate);
    }

    // 该函数用于读取存储在代理合约的 存储槽 0 的值，返回的是一个 uint256 类型的数据。 
    // 之所以是存储槽 0 是因为我们在 _IMPLEMENTATION_SLOT 中存储的是实现合约的地址，所以我们可以通过 sload(0) 来读取存储槽 0 的值。
    // 代理合约的存储槽 0 的值就是实现合约的地址。sload(0) 会返回存储槽 0 的值。
    function readStorage() public view returns (uint256 valueAtStorageSlotZero) {
        assembly {
            valueAtStorageSlotZero := sload(0)
        }
    }

    // receiver function
    receive() external payable {}
}

// 比如是一个代理合约，它的实现合约是 ImplementationA，然后我们可以通过 setImplementation 函数来设置实现合约。
// 通过 getDataToTransact 函数来获取调用实现合约的数据。
// 通过 readStorage 函数来读取存储在代理合约的存储槽0的值。
// 代理合约的 fallback 函数会调用实现合约的函数。

// 代理合约的实现合约是 ImplementationA，它有一个公共变量 value，还有一个公共函数 setValue，用来设置 value 的值。
// 如果该合约是旧合约
contract ImplementationA {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue;
    }
}

// 如果该合约是新合约，先部署 ImplementationA 并进行数据存储和读取
// 再部署该合约，然后调用 setImplementation 函数设置实现合约为 ImplementationB
// 实现了代理合约的升级
contract ImplementationB {
    uint256 public value;

    function setValue(uint256 newValue) public {
        value = newValue + 2;
    }
}

// function setImplementation(){}
// Transparent Proxy -> Ok, only admins can call functions on the proxy
// anyone else ALWAYS gets sent to the fallback contract.

// UUPS -> Where all upgrade logic is in the implementation contract, and
// you can't have 2 functions with the same function selector.
