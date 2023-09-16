import { ethers } from "hardhat";

async function main() {
  /*
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
  
    const lockedAmount = ethers.parseEther("0.001");
    */

  const board = await ethers.deployContract("ColorBoard", []);
  await board.waitForDeployment();

  console.log("Board contract deployed to ", board.target);
  // 0x2Fdf5FE2099D81218FE1d78e66699e486669563F - contract address

  // const ans1 = await board.getColor(1, 4);
  // const ans2 = await board.getColor(4, 5);
  // const ans3 = await board.getColor(3, 5);
  // const ans4 = await board.getColor(3, 6);

  // console.log(ans1, ans2, ans3, ans4);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
