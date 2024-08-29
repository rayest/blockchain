// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

contract EVMStorage {
    // slot 0
    uint256 public s_x;

    // slot 1
    uint256 public s_y;

    // slot 2
    bytes32 public s_z;

    // slot 3
    bytes4 public s_a = 0x12345678;

    // save in slot 3 with s_a
    bytes2 public s_b = 0xabcd;

    // slot 4
    uint256 public data = 0x123456789ABCDEF123456789ABCDEF123456789ABCDEF123456789ABCDEF1234;

    // three in one slot
    struct SingleSlot {
        uint128 ss_x;
        uint64 ss_y;
        uint64 ss_z;
    }

    // three in three slot
    struct MultiSlot {
        uint256 ms_x;
        uint256 ms_y;
        uint256 ms_z;
    }

    // slot 5
    SingleSlot public ss = SingleSlot({ss_x: 1, ss_y: 2, ss_z: 3});

    // slot 6, 7, 8
    MultiSlot public ms = MultiSlot({ms_x: 11, ms_y: 22, ms_z: 33});

    // slot: constants 和 immutable 变量会被编译器优化，不会占用存储槽
    // ignore

    // slot: static array。数组会占用多个存储槽，每个槽存储 32 字节
    // slot 9, 9, 10, 10, 11
    uint128[5] private arr = [1, 2, 3, 4, 5];

    // slot: dynamic array。动态数组会占用一个存储槽，存储数组的长度
    // slot of array: 12
    // slot of element: keccak256(slot) + size of element  * index of element)
    // keccak256(12) + 0, keccak256(12) + 1, keccak256(12) + 2, keccak256(12) + 3, keccak256(12) + 4
    uint256[] private arr2 = [11, 22, 33, 44, 55];

    // slot: mapping
    // slot of mapping: 13
    // slot of value: keccak256(key, slot)
    mapping(address => uint256) private map;
    address public constant ADDR_1 = address(1);
    address public constant ADDR_2 = address(2);
    address public constant ADDR_3 = address(3);

    function initMap() public {
        map[ADDR_1] = 111;
        map[ADDR_2] = 222;
        map[ADDR_3] = 333;
    }

    function get_slot_from_mapping(address key) public view returns (uint256 value) {
        uint256 mapping_slot = 13;
        bytes32 slot_v = keccak256(abi.encode(key, mapping_slot));
        assembly {
            value := sload(slot_v)
        }
    }

    // 1、store 是一个函数，用于将数据存储到合约的存储槽中
    // 槽的编号从 0 开始，每个槽的大小为 32 字节
    // 一个字节等于 8 位，比如 0xababab 是 3 个字节
    // 如果存储的数据小于 32 字节，那么会将数据左对齐，然后存储
    // 比如：如果存储 1，那么会存储 32 个字节，前 31 个字节为 0，最后一个字节为 1
    // 具体为：0xababab -> 0x0000000000000000000000000000000000000000000000000000000000ababab
    function store(uint256 a, uint256 b, bytes32 c) public {
        assembly {
            sstore(0, a) // 在 slot 0 中存储 111
            sstore(1, b) // 在 slot 1 中存储 222
            sstore(2, c) // 在 slot 2 中存储 0xababab
        }
    }

    function sstore_agian(uint256 a, uint256 b, bytes32 c) public {
        assembly {
            sstore(s_x.slot, a)
            sstore(s_y.slot, b)
            sstore(s_z.slot, c)
        }
    }

    function load() public view returns (uint256, uint256, bytes32) {
        uint256 x;
        uint256 y;
        bytes32 z;
        assembly {
            x := sload(0)
            y := sload(1)
            z := sload(2)
        }
        return (x, y, z);
    }

    function load_again() public view returns (uint256, uint256, bytes32) {
        uint256 x;
        uint256 y;
        bytes32 z;
        assembly {
            x := sload(s_x.slot)
            y := sload(s_y.slot)
            z := sload(s_z.slot)
        }
        return (x, y, z);
    }

    // 2、多个字段，如果不满足 32 字节，会左对齐存储
    // 例如：字段 x 和 y，分别存储 333 和 444，那么会存储 32 字节，前 30 个字节为 0，最后两个字节为 333 和 444
    // 即 0x0000000000000000000000000000000000000000000000000000000000abcd12345678
    function load_multi_from_one_slot() public view returns (bytes32 x) {
        assembly {
            x := sload(3)
        }
        return x;
    }

    // 3、bit mask todo
    // 使用 shift 和 mask 操作，获取存储槽中的低 32 位
    function bit_mask_extract(uint8 startBit, uint8 length) public view returns (bytes32 result) {
        assembly {
            // 创建一个用于提取的 bit mask. 表示从 startBit 开始，长度为 length 的位
            // 例如，如果 startBit = 3，length = 5，mask = 0b00011111
            let mask := shl(startBit, sub(shl(length, 1), 1))

            // 提取并对齐结果。例如，如果 startBit = 3，那么结果会右移 3 位
            // and 表示按位与操作
            result := shr(startBit, and(sload(data.slot), mask))
        }
    }

    // struct slot
    function get_single_slot_from_struct() public view returns (uint128 x, uint64 y, uint64 z) {
        assembly {
            let s := sload(5)
            //  z |  y |  x
            // 64 | 64 | 128 bits
            // s = 32bytes = 256 bits
            x := s
            y := shr(128, s)
            z := shr(192, s)
        }
    }

    function get_multi_slot_from_struct() public view returns (uint256 x, uint256 y, uint256 z) {
        assembly {
            x := sload(6)
            y := sload(7)
            z := sload(8)
        }
    }

    function get_slot_from_array() public view returns (uint256 x) {
        assembly {
            x := sload(11)
        }
    }

    function get_slot_from_array_2() public view returns (uint256 x) {
        bytes32 start = keccak256(abi.encode(12));
        assembly {
            x := sload(start)
        }
    }
}
