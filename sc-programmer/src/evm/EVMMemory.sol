// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract EVMMemory {
    // memory data is not packed, all data is stored in 32 bytes
    struct Point {
        uint256 x; // 从内存位置 0x00 到 0x1F
        uint32 y; // 从内存位置 0x20 到 0x3F
        uint32 z; // 从内存位置 0x40 到 0x5F
    }

    // mstore(p,v) - store value v at memory position p
    // mload(p) - load 32 bytes from memory position p
    function m_load_default() public pure returns (bytes32 x, bytes32 y, bytes32 z) {
        assembly {
            x := mload(0x20)
            y := mload(0x40)
            z := mload(0x60)
        }
    }

    function m_store_and_load(uint256 _p, bytes32 _firstValue, bytes32 _lastValue)
        public
        pure
        returns (bytes32 value)
    {
        assembly {
            mstore(1, _firstValue) // 在内存位置 1 存储 _firstValue
            mstore(2, _lastValue) // 在内存位置 2 存储 _lastValue，会覆盖 _firstValue。因为内存位置 1 和 2 都是 32 字节，所以会覆盖 _firstValue。
            value := mload(1)
            value := mload(_p)
        }
    }

    function m_load(uint256 p) public pure returns (bytes32 value) {
        assembly {
            value := mload(p)
        }
    }

    // free memory pointer 和 内存分配
    function m_free() public pure returns (uint256 value_40, uint256 value_80) {
        assembly {
            // 内存地址 0x40 是存储 "free memory pointer"（空闲内存指针）
            // 这个指针的值是 0x80，表示第一个可用的空闲内存地址
            value_40 := mload(0x40)

            // 0x80 是初始的空闲内存地址，所以这个指针的值是 0，表示第二个可用的空闲内存地址
            value_80 := mload(0x80)
        }
    }

    // memory: expand . 内存分配时，gas 消耗的计算。有自己的规则，不同的内存分配大小，gas 消耗不同。
    // memory_size_word = (memory_byte_size + 31) / 32
    // memory_cost = (memory_size_word ** 2) / 512 + (3 * memory_size_word)
    function alloc_memo(uint256 n) external view returns (uint256) {
        uint256 gas_start = gasleft();
        uint256[] memory arr = new uint256[](n);
        uint256 gas_end = gasleft();
        return gas_start - gas_end;
    }

    // memory: struct
    // Same as: array
    function read_struct() public pure returns (uint256 x, uint32 y, uint32 z) {
        // point is stored in memory from 0x80
        // 0x80 is the free memory pointer
        Point memory p = Point(1, 2, 3);
        assembly {
            x := mload(0x80)
            y := mload(0xA0) // 即 mload(add(0x80, 0x20)): 0x80 + 0x20 = 0x80+0x10+0x10 = 0x90 + 0x10 = 0xA0
            z := mload(0xC0) // 即 mload(add(0x80, 0x40))
        }
    }

    function write_struct() public pure returns (uint256 x, uint32 y, uint32 z, bytes32 free_memory_pointer) {
        Point memory p;
        assembly {
            mstore(0x80, 11)
            mstore(0xA0, 22)
            mstore(0xC0, 33)
            free_memory_pointer := mload(0x40)
        }
        return (p.x, p.y, p.z, free_memory_pointer);
    }

    // 动态数组
    function read_array() public pure returns (bytes32 p, uint256 len, uint256 a0, uint256 a1, uint256 a2) {
        uint256[] memory arr = new uint256[](3);
        arr[0] = 1;
        arr[1] = 2;
        arr[2] = 3;

        assembly {
            p := arr // arr 的内存地址
            len := mload(arr) // arr 的长度
            a0 := mload(add(arr, 0x20)) // arr 的第一个元素的值
            a1 := mload(add(arr, 0x40)) // arr 的第二个元素的值
            a2 := mload(add(arr, 0x60)) // arr 的第三个元素的值
        }
    }

    function write_array() public pure returns (bytes32 p, uint256[] memory) {
        uint256[] memory arr = new uint256[](0);
        assembly {
            p := arr
            mstore(arr, 3) // arr 的长度
            mstore(add(arr, 0x20), 11) // arr 的第一个元素的值
            mstore(add(arr, 0x40), 22) // arr 的第二个元素的值
            mstore(add(arr, 0x60), 33) // arr 的第三个元素的值

            mstore(0x40, add(arr, 0x80)) // 需要手动更新 free memory pointer
        }
        return (p, arr);
    }

    // encode
    function encode_addr() public pure returns (bytes memory) {
        address addr = address(0x1234567890123456789012345678901234567890);
        return abi.encode(addr);
        // 0x0000000000000000000000001234567890123456789012345678901234567890
    }

    function encode_bytes4() public pure returns (bytes memory) {
        bytes4 b = 0x12345678;
        return abi.encode(b);
        // 0x123456780000000000000000000000000000000000000000000000000000000
    }

    function encode_struct() public pure returns (bytes memory) {
        Point memory p = Point(1, 2, 3);
        return abi.encode(p);
        // 0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003
    }

    function encode_array() public pure returns (bytes memory) {
        uint256[] memory arr = new uint256[](3);
        arr[0] = 1;
        arr[1] = 2;
        arr[2] = 3;
        return abi.encode(arr);
    }

    // return values。返回 element data from start - end 之间的值
    function return_values() public pure returns (uint256, uint256) {
        assembly {
            mstore(0x80, 11)
            mstore(0xA0, 22)
            // 从内存位置 0x80 开始，返回 64 = 0x40 字节的数据
            return(0x80, 0x40) // 返回两个值 11 和 22. 分别表示：返回值的起始位置和返回值的长度
            // return 指令会终止函数的执行
        }
    }

    // return values： hault execution.
    function return_values_hault() public pure returns (uint256, uint256) {
        (uint256 x, uint256 y) = return_values();
        return (123, 456); // 这行代码不会执行. 因为 return_values() 会终止函数的执行.
    }

    // return dynamic array
    function return_dynamic_array() public pure returns (uint256[] memory) {
        assembly {
            // offset
            mstore(0x80, 0x20)

            // length
            mstore(add(0x80, 0x20), 3)

            // elements
            mstore(add(0x80, 0x40), 11)
            mstore(add(0x80, 0x60), 22)
            mstore(add(0x80, 0x80), 33)

            // return : start - end
            return(0x80, mul(5, 0x20))
        }
    }
}
