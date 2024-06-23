// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    uint256 myFavoriteNumber;

    // 房产合约
    struct House {
        // 日期，年月
        string date;

        // 平均房价
        uint256 housePrice;
    }

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    // uint256[] public anArray;
    Person[] public listOfPeople;

    // 房价列表
    House[] public houseList;

    mapping(string => uint256) public nameToFavoriteNumber;

    // 房价映射
    mapping(string => uint256) public dateToHousePrice;

    function store(uint256 _favoriteNumber) public {
        myFavoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return myFavoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        listOfPeople.push(Person(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    function addHouse(string memory _date, uint256 _housePrice) public {
        houseList.push(House(_date, _housePrice));
        dateToHousePrice[_date] = _housePrice;
    }
}
