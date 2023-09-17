import { ethers } from "hardhat";

async function main() {

  const board = await ethers.deployContract("CBoard", []);
  await board.waitForDeployment();

  console.log("Cboard contract deployed to ", board.target);
  // 0x2Fdf5FE2099D81218FE1d78e66699e486669563F - contract address

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
