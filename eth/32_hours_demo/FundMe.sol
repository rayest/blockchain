// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {
    uint256 public minimumUSD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;


    function fund() public payable {
        // msg.sender is the address of the person who called this function
        // msg.value is the amount of wei they sent
        require(getConversionRate(msg.value) >= minimumUSD;, "You need to spend more ETH!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;
    }

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     */

    // get price with chainlink

    function getPrice() public view returns (uint256) {
        // need ABI
        // Address
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
    }

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
        return priceFeed.version();
    }

    function getConversionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        // 1 ETH = x USD
        // 1 ETH = 1000000000000000000 wei
        // x USD = 1000000000000000000 wei
        // x = 1000000000000000000 / getPrice()
        uint256 price = getPrice();
        uint256 ethAmountInUSD = (ethAmount * price) / 1e18;
        return ethAmountInUSD;
    }
}
