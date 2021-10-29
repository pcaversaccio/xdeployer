# xdeployer
[![build status](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml/badge.svg)](https://github.com/pcaversaccio/xdeployer/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
[![NPM Package](https://img.shields.io/npm/v/xdeployer.svg?style=flat-square)](https://www.npmjs.com/package/xdeployer)

[Hardhat](https://hardhat.org) plugin to deploy your smart contracts across multiple EVM chains with the same deterministic address.
> **Caveat:** Currently only test networks are supported. Production networks will be added as we move into a wider beta phase. Please report any issues [here](https://github.com/pcaversaccio/xdeployer/issues). 

## What
This plugin will help you make easier and safer usage of the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) EVM opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed, which allows for interesting new mechanisms known as _counterfactual interactions_.

## Installation
```bash
npm install --save-dev xdeployer @nomiclabs/hardhat-ethers
```

Import the plugin in your `hardhat.config.js`:
```js
require("xdeployer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:
```ts
import "xdeployer";
```

## Required Plugins
- [@nomiclabs/hardhat-ethers](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-ethers)

## Tasks
This plugin provides the `xdeploy` task, which allows you to deploy your smart contracts across multiple EVM chains with the same deterministic address:
```
npx hardhat xdeploy
```

## Environment Extensions
This plugin does not extend the environment.

## Configuration
You need to add the following configurations to your `hardhat.config.js` file:
```js
module.exports = {
  networks: {
    mainnet: { ... }
  },
  xdeploy: {
    contract: "YOUR_CONTRACT_NAME_TO_BE_DEPLOYED",
    constructorArgsPath: "PATH_TO_CONSTRUCTOR_ARGS",
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: "GAS_LIMIT",
  },
};
```

Or if you are using TypeScript, in your `hardhat.config.ts`:
```ts
const config: HardhatUserConfig = {
  networks: {
    mainnet: { ... }
  },
  xdeploy: {
    contract: "YOUR_CONTRACT_NAME_TO_BE_DEPLOYED",
    constructorArgsPath: "PATH_TO_CONSTRUCTOR_ARGS",
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: "GAS_LIMIT",
  },
};
```
The parameters `constructorArgsPath` and `gasLimit` are _optional_.

_Example:_
```ts
xdeploy: {
  contract: "ERC20Mock",
  constructorArgsPath: "./deploy-args.ts",
  salt: "WAGMI",
  signer: process.env.PRIVATE_KEY,
  networks: ["hardhat", "rinkeby", "kovan"],
  rpcUrls: ["hardhat", process.env.RINKEBY_URL, process.env.KOVAN_URL],
  gasLimit: 1.2 * 10 ** 6,
},
```

The current available networks are:
- `localhost`
- `hardhat`
- `rinkeby`
- `ropsten`
- `kovan`
- `goerli`
- `bsctestnet`
- `optimismtestnet`
- `arbitrumtestnet`
- `mumbai`
- `hecoinfotestnet`
- `fantomtestnet`
> Note that you must ensure that your deployment account has sufficient funds on all target networks.

### Local Deployment
If you also want to test deploy your smart contracts on `"hardhat"` or `"localhost"`, you must first add the following Solidity file called `Create2DeployerLocal.sol` to your `contracts/` folder:
```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "xdeployer/src/contracts/Create2Deployer.sol";

contract Create2DeployerLocal is Create2Deployer {}
```
> For this kind of deployment, you must set the Solidity version in the `hardhat.config.js` or `hardhat.config.ts` file to `0.8.4`.

The RPC URL for `hardhat` is simply `hardhat`, while for `localhost` you must first run `npx hardhat node`, which defaults to `http://127.0.0.1:8545`. Note that `localhost` in Node.js v17 favours IPv6, which means that you need to configure the network endpoint of `localhost` in `hardhat.config.js` or `hardhat.config.ts` like this:
```ts
networks: {
  localhost: {
    url: [::1],
  },
}
```

### Further Considerations
The constructor arguments file must have an _exportable_ field called `data`:
```js
exports.data = [
  "arg1",
  "arg2",
  ...
];
```

Or if you are using TypeScript:
```ts
const data = [
  "arg1",
  "arg2",
  ...
];
export { data };
```

The `gasLimit` field is set to to **1'500'000** by default because the `CREATE2` operations are a complex sequence of opcode executions. Usually the providers do not manage to estimate the gasLimit for these calls, so a predefined value is set.

## Usage
```
npx hardhat xdeploy
```

## How It Works
EVM opcodes can only be called via a smart contract. I have deployed a helper smart contract [`Create2Deployer`](https://github.com/pcaversaccio/create2deployer) with the same address across all the available networks to make easier and safer usage of the `CREATE2` EVM opcode. During your deployment, the plugin will call this contract. Currently, the `Create2Deployer` smart contract is `ownable` and `pausable` due to the testing phase. Once we move into a wider beta phase, I will redeploy the contract at the same address after selfdestructing the former smart contract first.

### A Note On `SELFDESTRUCT`
Using the `CREATE2` EVM opcode always allows to redeploy a new smart contract to a previously seldestructed contract address. However, if a contract creation is attempted, due to either a creation transaction or the `CREATE`/`CREATE2` EVM opcode, and the destination address already has either nonzero nonce, or non-empty code, then the creation throws immediately, with exactly the same behavior as would arise if the first byte in the init code were an invalid opcode. This applies retroactively starting from genesis.
