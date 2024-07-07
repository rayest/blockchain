### Automation

1. 定义需要执行 automation 的 smart contract，部署返回 contract address

2. 注册 automation 即 upkeep，选择需要使用的 trigger 方式，如 time-based、Custom logic、Log trigger 三种。选择步骤一中生成的合约地址，以及合约中需要 定时执行任务的函数名称、以及函数参数

 > 示例

```solidity
contract SimpleCounter {
    uint public count = 0;

    event intAdded(address indexed sndrAddress,uint indexed intToAdd, uint curcount,uint blocknbr);
    event intReset(address indexed sndrAddress,uint blocknbr, uint curcount);
    
    function addInteger(uint intToAdd) public returns(uint) {
        count += intToAdd;
        emit intAdded(msg.sender,intToAdd,count,block.number);
        return count;
    }

    function reset() public returns(uint) {
        count = 0;
        emit intReset(msg.sender,block.number, count);
        return count;
    }
}
```



### DataFeeds

1. 基于 AggregatorV3Interface 获取指定 address 下货币对的 price feed
> 示例

```solidity
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts@1.1.1/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED
 * VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/**
 * If you are reading data feeds on L2 networks, you must
 * check the latest answer from the L2 Sequencer Uptime
 * Feed to ensure that the data is accurate in the event
 * of an L2 sequencer outage. See the
 * https://docs.chain.link/data-feeds/l2-sequencer-feeds
 * page for details.
 */

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}

```

### VRF2.5
