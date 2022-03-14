# request-xdeployer 

[Hardhat](https://hardhat.org) plugin to deploy your smart contracts across multiple Ethereum Virtual Machine (EVM) chains with the same deterministic address.

## What
This repo is a fork of [xdeployer](https://github.com/pcaversaccio/xdeployer)
It enables smart contract deployment through the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) EVM opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed. It also decorelates the contract deployment address from the user nonce.

This plugin is used by [The RN library](https://github.com/requestnetwork/requestnetwork) to perform some contract deployments.

## Installation
```bash
npm install --save-dev request-xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts
```

Or if you are using [Yarn](https://classic.yarnpkg.com):
```bash
yarn add --dev request-xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts
```
> **Note:** This plugin uses the optional chaining operator (`?.`). Optional chaining is _not_ supported in Node.js v13 and below.

In your `hardhat.config.ts`:
```ts
import "xdeployer";
```

## Required Plugins
- [@nomiclabs/hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers)
- [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts)

## Environment Extensions
This plugin does not extend the environment.

## Configuration
 TypeScript configuration in your `hardhat.config.ts`:
```ts
const config: HardhatUserConfig = {
  networks: {
    mainnet: { ... }
  },
  xdeploy: {
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: "GAS_LIMIT",
    deployerAddress: "0x..."
  },
};
```

The parameter `gasLimit` and `deployerAddress` are _optional_. If `deployerAddress` is undefined the plugin will use the default deployer contract: for more information refer to [the main repo](https://github.com/pcaversaccio/xdeployer)
The `salt` parameter is a random value (32 byte string) used to create the contract address. If you have previously deployed the same contract with the identical `salt`, the contract creation transaction will fail due to [EIP-684](https://github.com/ethereum/EIPs/issues/684). For more details, see also [here](#a-note-on-selfdestruct).

_Example of configuration:_
```ts
xdeploy: {
  salt: "WAGMI",
  signer: process.env.PRIVATE_KEY,
  networks: ["hardhat", "rinkeby", "kovan"],
  rpcUrls: ["hardhat", process.env.RINKEBY_URL, process.env.KOVAN_URL],
  gasLimit: 1.2 * 10 ** 6,
},
```

To use this plugin in your code run:
```ts
const deploymentParams = {
  contract: "MyContract",
  constructorArgs: [true, 50, "example"]
}
const deploymentResult = await hre.run('xdeploy', deploymentParams)
```

