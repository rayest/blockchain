// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

library IterableMapping {
    struct Map {
        address[] keys;
        mapping(address => uint256) values;
        mapping(address => uint256) indexOf;
        mapping(address => bool) inserted;
    }

    function get(Map storage map, address key) public view returns (uint256) {
        return map.values[key];
    }

    function getKeyAtIndex(
        Map storage map,
        uint256 index
    ) public view returns (address) {
        return map.keys[index];
    }

    function size(Map storage map) public view returns (uint256) {
        return map.keys.length;
    }

    function set(Map storage map, address key, uint256 value) public {
        if (map.inserted[key]) {
            map.values[key] = value;
        } else {
            map.inserted[key] = true;
            map.values[key] = value;
            map.indexOf[key] = map.keys.length;
            map.keys.push(key);
        }
    }

    function remove(Map storage map, address key) public {
        if (!map.inserted[key]) {
            return;
        }

        delete map.inserted[key];
        delete map.values[key];
        uint256 index = map.indexOf[key];
        address lastKey = map.keys[map.keys.length - 1];
        map.indexOf[lastKey] = index;
        delete map.indexOf[key];

        map.keys[index] = lastKey;
        map.keys.pop();
    }
}

contract TestIterableMap {
    using IterableMapping for IterableMapping.Map;
    IterableMapping.Map private map;

    function testIterableMap() public {
        map.set(address(0), 0);
        map.set(address(1), 100);
        map.set(address(2), 200);
        map.set(address(2), 200); // update
        map.set(address(3), 300);

        for (uint256 i = 0; i < map.size(); i++) {
            address key = map.getKeyAtIndex(i);
            assert(map.get(key) == i * 100);
        }

        map.remove(address(1));
    }
}
