// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IYDAI {
    function deposit(uint256 _amount) external;
    function withdraw(uint256 _shares) external;
    function balanceOf(address _account) external view returns (uint256);
    function getPricePerFullShare() external view returns (uint256);
}

contract Wallet {
    address admin;
    IERC20 dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F); // 实例化 DAI 合约
    IYDAI ydai = IYDAI(0xC2cB1040220768554cf699b0d863A3cd4324ce32); // 实例化 yDAI 合约，用于调用 yDAI 合约的方法

    constructor() {
        admin = msg.sender;
    }

    function save(uint256 amount) external {
        dai.transferFrom(msg.sender, address(this), amount); // 从调用者地址转账 DAI 到该合约地址 this
        _save(amount); // 存入 yDAI
    }

    function spend(uint256 amount, address receipient) external {
        require(msg.sender == admin, "only admin"); // 限制只有管理员可以调用
        uint256 balanceShares = ydai.balanceOf(address(this)); // 获取 yDAI 合约中的余额
        ydai.withdraw(balanceShares); // 从 yDAI 取出 DAI
        dai.transfer(receipient, amount); // 将 DAI 转账给调用者
        uint256 balanceDai = dai.balanceOf(address(this)); // 获取合约中的 DAI 余额
        if (balanceDai > 0) {
            dai.transfer(admin, balanceDai); // 将合约中的 DAI 转账给管理员
            _save(amount); // 存入 yDAI
        }
    }

    function _save(uint256 amount) internal {
        dai.approve(address(ydai), amount); // 授权 yDAI 合约使用 DAI，授权额度为 amount
        ydai.deposit(amount); // 将 DAI 存入 yDAI 合约，存入额度为 amount，存入后会生成 yDAI
    }

    function balance() external view returns (uint256) {
        return ydai.balanceOf(address(this)) * ydai.getPricePerFullShare() / 1e18;
    }
}
