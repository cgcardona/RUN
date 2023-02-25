let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    console.log("Account address:", await signer.getAddress());

    const balance = await signer.getBalance()
    const convertToEth = 1e18;
    console.log("account's balance in ether:", balance.toString() / convertToEth);
}

async function claimTokens() {
    const runTokenContractAddress = "0x4f5894502223AF523CFFcF78F0f75Dc6183cfF73";
    const runTokenContractAbi = [
        "function mintTokens(address account, uint256 amount) public",
    ];
    const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
    let convertToWei = 1000000000
    let amountToClaim = window.totalGAVAXScore * convertToWei
    await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
}

async function claimNft() {
    const nftContractAddress = "0xa56593feEF857a072ccAD88bB15d52D1aE0Ed8bf";
    const mintContractAbi = [
        "function mint(uint256 amount) public",
    ];
    const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
    await nftContract.connect(signer).mint(window.totalNFTScore.toString())
}
