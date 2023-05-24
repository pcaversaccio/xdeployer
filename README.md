# xdeployer 💥

[![Test xdeploy](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml/badge.svg)](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm package](https://img.shields.io/npm/v/xdeployer.svg)](https://www.npmjs.com/package/xdeployer)

[Hardhat](https://hardhat.org) plugin to deploy your smart contracts across multiple Ethereum Virtual Machine (EVM) chains with the same deterministic address.

> It is pronounced _cross_-deployer.

## What

This plugin will help you make easier and safer usage of the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) EVM opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed, which allows for interesting new mechanisms known as _counterfactual interactions_.

## Installation

```bash
npm install --save-dev xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts
```

Or if you are using [Yarn](https://classic.yarnpkg.com):

```bash
yarn add --dev xdeployer @nomiclabs/hardhat-ethers @openzeppelin/contracts
```

> **Note:** This plugin uses the optional chaining operator (`?.`). Optional chaining is _not_ supported in Node.js v13 and below.

Import the plugin in your `hardhat.config.js`:

```js
require("xdeployer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "xdeployer";
```

## Required Plugins

- [@nomiclabs/hardhat-ethers](https://www.npmjs.com/package/@nomiclabs/hardhat-ethers)
- [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts)

## Tasks

This plugin provides the `xdeploy` task, which allows you to deploy your smart contracts across multiple EVM chains with the same deterministic address:

```bash
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

The parameters `constructorArgsPath` and `gasLimit` are _optional_. The `salt` parameter is a random value (32 byte string) used to create the contract address. If you have previously deployed the same contract with the identical `salt`, the contract creation transaction will fail due to [EIP-684](https://github.com/ethereum/EIPs/issues/684). For more details, see also [here](#a-note-on-selfdestruct).

_Example:_

```ts
xdeploy: {
  contract: "ERC20Mock",
  constructorArgsPath: "./deploy-args.ts",
  salt: "WAGMI",
  signer: process.env.PRIVATE_KEY,
  networks: ["hardhat", "goerli", "sepolia"],
  rpcUrls: ["hardhat", process.env.ETH_GOERLI_TESTNET_URL, process.env.ETH_SEPOLIA_TESTNET_URL],
  gasLimit: 1.2 * 10 ** 6,
},
```

The current available networks are:

- **Local:**
  - `localhost`
  - `hardhat`
- **EVM-Based Test Networks:**
  - `rinkeby`
  - `ropsten`
  - `kovan`
  - `goerli`
  - `sepolia`
  - `bscTestnet`
  - `optimismTestnet`
  - `arbitrumTestnet`
  - `mumbai`
  - `polygonZkEVMTestnet`
  - `hecoTestnet`
  - `fantomTestnet`
  - `fuji`
  - `sokol`
  - `chiado`
  - `moonbaseAlpha`
  - `alfajores`
  - `auroraTestnet`
  - `harmonyTestnet`
  - `autobahnTestnet`
  - `spark`
  - `cronosTestnet`
  - `evmosTestnet`
  - `bobaTestnet`
  - `cantoTestnet`
  - `baseTestnet`
  - `mantleTestnet`
  - `scrollTestnet`
  - `lineaTestnet`
- **EVM-Based Production Networks:**
  - `ethMain`
  - `bscMain`
  - `optimismMain`
  - `arbitrumMain`
  - `arbitrumNova`
  - `polygon`
  - `polygonZkEVMMain`
  - `hecoMain`
  - `fantomMain`
  - `avalanche`
  - `gnosis`
  - `moonriver`
  - `moonbeam`
  - `celo`
  - `auroraMain`
  - `harmonyMain`
  - `autobahn`
  - `fuse`
  - `cronos`
  - `evmosMain`
  - `bobaMain`
  - `cantoMain`

> Note that you must ensure that your deployment account has sufficient funds on **all** target networks. In addition, please be aware that `gnosis` refers to the previously known _xDai_ chain. Eventually, whilst this plugin supports Optimism Kovan and Optimism Goerli via `optimismTestnet`, and Arbitrum Rinkeby and Arbitrum Goerli via `arbitrumTestnet`, it will output the resulting block explorer links in the terminal of Optimism Goerli and Arbitrum Goerli, as Optimism Kovan and Arbitrum Kovan are deprecated.

### Local Deployment

If you also want to test deploy your smart contracts on `"hardhat"` or `"localhost"`, you must first add the following Solidity file called `Create2DeployerLocal.sol` to your `contracts/` folder:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Create2Deployer } from "xdeployer/src/contracts/Create2Deployer.sol";

contract Create2DeployerLocal is Create2Deployer {}
```

> For this kind of deployment, you must set the Solidity version in the `hardhat.config.js` or `hardhat.config.ts` file to `0.8.19` or higher.

The RPC URL for `hardhat` is simply `hardhat`, while for `localhost` you must first run `npx hardhat node`, which defaults to `http://127.0.0.1:8545`. Note that `localhost` in Node.js v17 favours IPv6, which means that you need to configure the network endpoint of `localhost` in `hardhat.config.js` or `hardhat.config.ts` like this:

```ts
networks: {
  localhost: {
    url: [::1],
  },
}
```

Eventually, it is important to note that the local deployment does _not_ generate the same deterministic address as on all live test/production networks, since the address of the smart contract that calls the opcode `CREATE2` differs locally from the live test/production networks. I recommend using local deployments for general testing, for example to understand the correct `gasLimit` target size.

### Further Considerations

The constructor arguments file must have an _exportable_ field called `data` in case you are using TypeScript:

```ts
const data = [
  "arg1",
  "arg2",
  ...
];
export { data };
```

> BigInt literals (e.g. `100000000000000000000n`) can be used for the constructor arguments if you set `target: ES2020` in your `tsconfig.json` file. See also [here](./tsconfig.json) for an example.

If you are using common JavaScript:

```js
module.exports = [
  "arg1",
  "arg2",
  ...
];
```

The `gasLimit` field is set to **1'500'000** by default because the `CREATE2` operations are a complex sequence of opcode executions. Usually the providers do not manage to estimate the `gasLimit` for these calls, so a predefined value is set.

The contract creation transaction is displayed on Etherscan (or any other block explorer) as a so-called _internal transaction_. An internal transaction is an action that is occurring within, or between, one or multiple smart contracts. In other words, it is initiated inside the code itself, rather than externally, from a wallet address controlled by a human. For more details on why it works this way, see [here](#how-it-works).

> **Warning**<br>
> Solidity version [`0.8.20`](https://github.com/ethereum/solidity/releases/tag/v0.8.20) introduced support for the new opcode [`PUSH0`](https://eips.ethereum.org/EIPS/eip-3855), which was added as part of the [Shanghai hard fork](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md). Prior to running a deployment, please verify that _all_ targeted EVM networks support the `PUSH0` opcode. Otherwise, a deployment attempt on an EVM chain without `PUSH0` support may result in deployment or runtime failure(s).

## Usage

```bash
npx hardhat xdeploy
```

### Usage With Truffle

[Truffle](https://www.trufflesuite.com/truffle) suite users can leverage the Hardhat plugin [`hardhat-truffle5`](https://hardhat.org/plugins/nomiclabs-hardhat-truffle5.html) (or if you use Truffle v4 [`hardhat-truffle4`](https://hardhat.org/plugins/nomiclabs-hardhat-truffle4.html)) to integrate with `TruffleContract` from Truffle v5. This plugin allows tests and scripts written for Truffle to work with Hardhat.

## How It Works

EVM opcodes can only be called via a smart contract. I have deployed a helper smart contract [`Create2Deployer`](https://github.com/pcaversaccio/create2deployer) with the same address across all the available networks to make easier and safer usage of the `CREATE2` EVM opcode. During your deployment, the plugin will call this contract.

### A Note on `SELFDESTRUCT`

Using the `CREATE2` EVM opcode always allows to redeploy a new smart contract to a previously selfdestructed contract address. However, if a contract creation is attempted, due to either a creation transaction or the `CREATE`/`CREATE2` EVM opcode, and the destination address already has either nonzero nonce, or non-empty code, then the creation throws immediately, with exactly the same behavior as would arise if the first byte in the init code were an invalid opcode. This applies retroactively starting from genesis.

### A Note on the Contract Creation Transaction

It is important to note that the `msg.sender` of the contract creation transaction is the helper smart contract [`Create2Deployer`](https://github.com/pcaversaccio/create2deployer) with address `0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2`. If you are relying on common smart contract libraries such as [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) for your smart contract, which set certain constructor arguments to `msg.sender` (e.g. `owner`), you will need to change these arguments to `tx.origin` so that they are set to your deployer's EOA address. For another workaround, see [here](https://github.com/pcaversaccio/xdeployer/discussions/18).

> **Caveat:** Please familiarise yourself with the security considerations concerning `tx.origin`. You can find more information about it, e.g. [here](https://docs.soliditylang.org/en/latest/security-considerations.html#tx-origin).

## Donation

I am a strong advocate of the open-source and free software paradigm. However, if you feel my work deserves a donation, you can send it to this address: [`0x07bF3CDA34aA78d92949bbDce31520714AB5b228`](https://etherscan.io/address/0x07bF3CDA34aA78d92949bbDce31520714AB5b228). I can pledge that I will use this money to help fix more existing challenges in the Ethereum ecosystem 🤝.
