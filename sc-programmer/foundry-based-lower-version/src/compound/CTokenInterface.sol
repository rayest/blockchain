pragma solidity ^0.5.0;

import "./ComptrollerInterface.sol";

contract CTokenInterface {
    /**
     * User Interface **
     */
    function transfer(address dst, uint256 amount) external returns (bool);
    function transferFrom(address src, address dst, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function balanceOfUnderlying(address owner) external returns (uint256);
    function getAccountSnapshot(address account) external view returns (uint256, uint256, uint256, uint256);
    function borrowRatePerBlock() external view returns (uint256);
    function supplyRatePerBlock() external view returns (uint256);
    function totalBorrowsCurrent() external returns (uint256);
    function borrowBalanceCurrent(address account) external returns (uint256);
    function borrowBalanceStored(address account) public view returns (uint256);
    function exchangeRateCurrent() public returns (uint256);
    function exchangeRateStored() public view returns (uint256);
    function getCash() external view returns (uint256);
    function accrueInterest() public returns (uint256);
    function seize(address liquidator, address borrower, uint256 seizeTokens) external returns (uint256);

    function mint(uint256 mintAmount) external returns (uint256);
    function redeem(uint256 redeemTokens) external returns (uint256);
    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);
    function borrow(uint256 borrowAmount) external returns (uint256);
    function repayBorrow(uint256 repayAmount) external returns (uint256);
    function repayBorrowBehalf(address borrower, uint256 repayAmount) external returns (uint256);
    function liquidateBorrow(address borrower, uint256 repayAmount, CTokenInterface cTokenCollateral)
        external
        returns (uint256);
}
