# $RUN

Web3 game for Web3 Game workshop at ETH Denver 2023

## Getting Started

Clone the repo

```zsh
git clone https://github.com/cgcardona/RUN.git
cd RUN/
```

Install the dependencies

```zsh
cd contracts/
npm install
```

## Local Avalanche Network

Fire up a local 5 node Avalanche network using the [Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner)

```zsh
cd /path/to/avalanche-network-runner
go run examples/local/fivenodenetwork/main.go
```

## .env file

Rename `contracts/env-example` to `contracts/.env` and add your Fuji and local private keys

## Deploy the Smart Contracts

```zsh
# deploy the NFT Collection
npx hardhat run scripts/deployNFTCollection.js --network local
NFT Collection deployed to: 0xB1eCe8f6b341aEB75F0f22ADe2eE85B5cEbE582E

# deploy the $RUN token
npx hardhat run scripts/deployRunToken.js --network local
$RUN token deployed to: 0xBd26804139886d3A0B3378d1D7E95a8bd260619f
```

Paste the NFT Collection contract address to the `claimNft` function in `blockchain.js`

```js
const nftContractAddress = "0xB1eCe8f6b341aEB75F0f22ADe2eE85B5cEbE582E";
```

Paste the NFT Collection contract address to the `claimTokens` function in `blockchain.js`

```js
const runTokenContractAddress = "0xBd26804139886d3A0B3378d1D7E95a8bd260619f";
```

## Install Live Server

If you're using VSCode then install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and right-click on `index.html` and select "Open with Live Server" and load `http://127.0.0.1:5500/game/` in your browser.

## Credit

Credit to [Dapp University](https://www.youtube.com/watch?v=ZjQzxXhebVc) for the original Web3 game workshop.
