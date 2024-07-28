// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract SimpleSwap {
    ISwapRouter public immutable swapRouter;
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint24 public constant feeTier = 3000; // 这个值是 Uniswap V3 的手续费率，表示 0.3%

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapWETHForDAI(uint256 amountIn) external returns (uint256 amountOut) {
      // msg.sender 通过 TransferHelper.safeTransferFrom() 方法将 WETH 转入合约
      TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);

      // 通过 TransferHelper.safeApprove() 方法授权 swapRouter 合约花费 WETH
      TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

      // 构造 swap 参数
      ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
          tokenIn: WETH9,
          tokenOut: DAI,
          fee: feeTier,
          recipient: msg.sender,
          deadline: block.timestamp,
          amountIn: amountIn,
          amountOutMinimum: 0,
          sqrtPriceLimitX96: 0
      });

      // 调用 swapRouter.exactInputSingle() 方法进行交换
      amountOut = swapRouter.exactInputSingle(params);

      // 返回 DAI
      return amountOut;
    }
}
