const hre = require("hardhat");

const EP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const AC_ADDRESS = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";
const PAYMASTER_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

async function main() {
  const account = await hre.ethers.getContractAt("Account", AC_ADDRESS);
  const count = await account.count();
  console.log(`Account count: ${count}`);

  console.log(
    "account balance: ",
    await hre.ethers.provider.getBalance(AC_ADDRESS)
  );

  const ep = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
  console.log("account balance on EP: ", await ep.balanceOf(AC_ADDRESS));

  const paymaster = await hre.ethers.getContractAt("Paymaster", PAYMASTER_ADDRESS);
  console.log("paymaster balance on EP: ", await ep.balanceOf(PAYMASTER_ADDRESS));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
