// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ComptrollerInterface.sol";
import "./CTokenInterface.sol";

contract CompoundApp {
    IERC20 public dai;
    CTokenInterface public cDai;

    IERC20 public bat;
    CTokenInterface public cBat;

    ComptrollerInterface public comptroller;

    constructor(
        address daiAddress,
        address cDaiAddress,
        address batAddress,
        address cBatAddress,
        address comptrollerAddress
    ) public {
        dai = IERC20(daiAddress);
        cDai = CTokenInterface(cDaiAddress);

        bat = IERC20(batAddress);
        cBat = CTokenInterface(cBatAddress);

        comptroller = ComptrollerInterface(comptrollerAddress);
    }

    // 购买 cDai。使用者需要先调用 approve 方法授权 Compound 合约转移 DAI 
    function invest(uint256 daiAmount) external {
        dai.approve(address(cDai), daiAmount);
        require(cDai.mint(daiAmount) == 0, "Invest failed");
    }

    // 赎回 cDai
    function cashOut(uint256 cDaiAmount) external {
        require(cDai.redeem(cDaiAmount) == 0, "Cash out failed");
    }

    // 借款. 将 cDAI 市场添加为抵押品市场，允许用户基于此抵押借贷
    function borrow(uint256 daiAmount) external {
        dai.approve(address(cDai), daiAmount);  
        cDai.mint(daiAmount);

        address[] memory markets = new address[](1);
        markets[0] = address(cDai);
        comptroller.enterMarkets(markets);

        require(cDai.borrow(daiAmount) == 0, "Borrow failed");
    }

    // 还款.
    function payback(uint256 daiAmount) external {
        dai.approve(address(cDai), daiAmount);
        require(cDai.repayBorrow(daiAmount) == 0, "Payback failed");

        // optional: redeem cDai
        cDai.redeem(cDai.balanceOf(address(this)));
    }
}
