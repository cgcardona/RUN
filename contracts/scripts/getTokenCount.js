const hre = require("hardhat");

const coinName = "RunnerCollection"
const coinAddr = "0x50ddc33a56eAC4455c635540034590373b282031"

async function main() {  
  const contract = await hre.ethers.getContractAt(coinName, coinAddr)
  const contractAddress = contract.address
  console.log(`Address: ${contractAddress}`)

  const tokenCount = await contract.retrieve()
  console.log(tokenCount)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })