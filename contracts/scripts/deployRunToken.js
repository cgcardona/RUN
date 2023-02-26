// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const RunToken = await hre.ethers.getContractFactory("RunToken");
  const runToken = await RunToken.deploy();

  await runToken.deployed();
  console.log("$RUN token deployed to:", runToken.address);

  // await runToken.mintTokens("0xBd26804139886d3A0B3378d1D7E95a8bd260619f", 55);
  // console.log("$RUN tokens minted")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
