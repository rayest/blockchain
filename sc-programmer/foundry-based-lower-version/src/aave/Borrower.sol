// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "https://github.com/aave/aave-protocol/blob/master/contracts/configuration/LendingPoolAddressesProvider.sol";
import "https://github.com/aave/aave-protocol/blob/master/contracts/lendingpool/LendingPool.sol";
import "https://github.com/aave/aave-protocol/blob/master/contracts/flashloan/base/FlashLoanReceiverBase.sol";

contract Borrower is FlashLoanReceiverBase {
    LendingPoolAddressesProvider provider;
    address dai;

    constructor(address _provider, address _dai) public FlashLoanReceiverBase(_provider) {
        provider = LendingPoolAddressesProvider(_provider);
        dai = _dai;
    }

    function startLoan(uint256 _amount, bytes calldata _params) public {
        LendingPool lendingPool = LendingPool(provider.getLendingPool());
        lendingPool.flashLoan(address(this), dai, _amount, _params);
    }

    function executeOperation(address _reserve, uint256 _amount, uint256 _fee, bytes calldata _params) external {
        // arbitrage, refinance, etc
        transferFundsBackToPoolInternal(_reserve, _amount + _fee);
    }
}
