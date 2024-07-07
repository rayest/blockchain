const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ENTRY_POINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PAYMASTER_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

async function main() {
  const entryPoint = await hre.ethers.getContractAt(
    "EntryPoint",
    ENTRY_POINT_ADDRESS
  );

  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const accountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

    const initCode = "0x";
    // FACTORY_ADDRESS +
    // accountFactory.interface
    //   .encodeFunctionData("createAccount", [address0]) // 由于账户已经创建了，在之后的操作中需要注释掉。或者拆分为两个方法，一个是创建账户，一个是执行操作
    //   .slice(2); // remove the 0x prefix

//   await entryPoint.depositTo(PAYMASTER_ADDRESS, {
//     value: hre.ethers.parseEther("100"),
//   });

  const account = await hre.ethers.getContractFactory("Account");

  const userOp = {
    sender,
    nonce: await entryPoint.getNonce(sender, 0),
    initCode,
    callData: account.interface.encodeFunctionData("execute"),
    callGasLimit: 200_000,
    verificationGasLimit: 200_000,
    preVerificationGas: 50_000,
    maxFeePerGas: ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
    paymasterAndData: PAYMASTER_ADDRESS, // we're not using a paymaster, for now
    signature: "0x", // we're not validating a signature, for now
  };

  const tx = await entryPoint.handleOps([userOp], address0);
  const receipt = await tx.wait();
  console.log(receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
