# xdeployer 💥

[![Test xdeploy](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml/badge.svg)](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit/)
[![npm package](https://img.shields.io/npm/v/xdeployer.svg)](https://www.npmjs.com/package/xdeployer)

[Hardhat](https://hardhat.org) plugin to deploy your smart contracts across multiple Ethereum Virtual Machine (EVM) chains with the same deterministic address.

> [!TIP]
> It is pronounced _cross_-deployer.

## What

This plugin will help you make easier and safer usage of the [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) EVM opcode. `CREATE2` can be used to compute in advance the address where a smart contract will be deployed, which allows for interesting new mechanisms known as _counterfactual interactions_.

## Installation

With `npm` versions `>=7`:

```console
# based on ethers v6
npm install --save-dev xdeployer
```

With `npm` version `6`:

```console
# based on ethers v6
npm install --save-dev xdeployer @nomicfoundation/hardhat-ethers ethers
```

<details>
<summary> Using <code>ethers</code> version <code>5</code> </summary>

With `npm` versions `>=7`:

```console
# based on ethers v5
npm install --save-dev 'xdeployer@^1.2.7'
```

With `npm` version `6`:

```console
# based on ethers v5
npm install --save-dev 'xdeployer@^1.2.7' @nomiclabs/hardhat-ethers 'ethers@^5.7.2' '@openzeppelin/contracts@^4.9.0'
```

</details>

Or if you are using [Yarn](https://classic.yarnpkg.com):

```console
# based on ethers v6
yarn add --dev xdeployer @nomicfoundation/hardhat-ethers ethers
```

<details>
<summary> Using <code>ethers</code> version <code>5</code> </summary>

```console
# based on ethers v5
yarn add --dev 'xdeployer@^1.2.7' @nomiclabs/hardhat-ethers 'ethers@^5.7.2' '@openzeppelin/contracts@^4.9.0'
```

</details>

In case you are using [pnpm](https://pnpm.io), invoke:

```console
# based on ethers v6
pnpm add --save-dev xdeployer
```

<details>
<summary> Using <code>ethers</code> version <code>5</code> </summary>

```console
# based on ethers v5
pnpm add --save-dev 'xdeployer@^1.2.7'
```

</details>

> [!NOTE]
> This plugin uses the optional chaining operator (`?.`). Optional chaining is _not_ supported in Node.js `v13` and below.

Import the plugin in your `hardhat.config.js`:

```js
require("xdeployer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "xdeployer";
```

## Required Plugins

- [@nomicfoundation/hardhat-ethers](https://www.npmjs.com/package/@nomicfoundation/hardhat-ethers)
- [ethers](https://www.npmjs.com/package/ethers)

## Tasks

This plugin provides the `xdeploy` task, which allows you to deploy your smart contracts across multiple EVM chains with the same deterministic address:

```console
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
    constructorArgsPath: "PATH_TO_CONSTRUCTOR_ARGS", // optional; default value is `undefined`
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: 1_500_000, // optional; default value is `1.5e6`
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
    constructorArgsPath: "PATH_TO_CONSTRUCTOR_ARGS", // optional; default value is `undefined`
    salt: "YOUR_SALT_MESSAGE",
    signer: "SIGNER_PRIVATE_KEY",
    networks: ["LIST_OF_NETWORKS"],
    rpcUrls: ["LIST_OF_RPCURLS"],
    gasLimit: 1_500_000, // optional; default value is `1.5e6`
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
    signer: vars.get("PRIVATE_KEY", ""),
    networks: ["hardhat", "sepolia", "holesky"],
    rpcUrls: [
      "hardhat",
      vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
      vars.get("ETH_HOLESKY_TESTNET_URL", "https://holesky.rpc.thirdweb.com"),
    ],
    gasLimit: 1.2 * 10 ** 6,
},
```

> [!NOTE]
> We recommend using [Hardhat configuration variables](https://hardhat.org/hardhat-runner/docs/guides/configuration-variables) introduced in Hardhat version [`2.19.0`](https://github.com/NomicFoundation/hardhat/releases/tag/hardhat%402.19.0) to set the private key of your signer.

The current available networks are:

- **Local:**
  - `localhost`
  - `hardhat`
- **EVM-Based Test Networks:**
  - `sepolia`
  - `holesky`
  - `bscTestnet`
  - `optimismSepolia`
  - `arbitrumSepolia`
  - `mumbai`
  - `polygonZkEVMTestnet`
  - `fantomTestnet`
  - `fuji`
  - `chiado`
  - `moonbaseAlpha`
  - `alfajores`
  - `auroraTestnet`
  - `harmonyTestnet`
  - `spark`
  - `cronosTestnet`
  - `evmosTestnet`
  - `bobaTestnet`
  - `cantoTestnet`
  - `baseSepolia`
  - `mantleTestnet`
  - `filecoinTestnet`
  - `scrollSepolia`
  - `lineaTestnet`
  - `zoraSepolia`
  - `luksoTestnet`
  - `mantaTestnet`
  - `frameTestnet`
- **EVM-Based Production Networks:**
  - `ethMain`
  - `bscMain`
  - `optimismMain`
  - `arbitrumOne`
  - `arbitrumNova`
  - `polygon`
  - `polygonZkEVMMain`
  - `fantomMain`
  - `avalanche`
  - `gnosis`
  - `moonriver`
  - `moonbeam`
  - `celo`
  - `auroraMain`
  - `harmonyMain`
  - `fuse`
  - `cronosMain`
  - `evmosMain`
  - `bobaMain`
  - `cantoMain`
  - `baseMain`
  - `mantleMain`
  - `filecoinMain`
  - `scrollMain`
  - `lineaMain`
  - `zoraMain`
  - `luksoMain`
  - `mantaMain`

> [!IMPORTANT]
> Note that you must ensure that your deployment account has sufficient funds on **all** target networks. In addition, please be aware that `gnosis` refers to the previously known _xDai_ chain.

### Local Deployment

If you also want to test deploy your smart contracts on `"hardhat"` or `"localhost"`, you must first add the following Solidity file called `Create2DeployerLocal.sol` to your `contracts/` folder:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { CreateX } from "xdeployer/src/contracts/CreateX.sol";

contract Create2DeployerLocal is CreateX {}
```

> For this kind of deployment, you must set the Solidity version in the `hardhat.config.js` or `hardhat.config.ts` file to `0.8.23` or higher.

The RPC URL for `hardhat` is simply `hardhat`, while for `localhost` you must first run `npx hardhat node`, which defaults to `http://127.0.0.1:8545`. It is important to note that the local deployment does _not_ generate the same deterministic address as on all live test/production networks, since the address of the smart contract that calls the opcode `CREATE2` differs locally from the live test/production networks. I recommend using local deployments for general testing, for example to understand the correct `gasLimit` target size.

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

> BigInt literals (e.g. `100_000_000_000_000_000_000n`) can be used for the constructor arguments if you set `target: ES2020` in your `tsconfig.json` file. See also [here](./tsconfig.json) for an example.

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

> [!WARNING]
> Solidity version [`0.8.20`](https://github.com/ethereum/solidity/releases/tag/v0.8.20) introduced support for the new opcode [`PUSH0`](https://eips.ethereum.org/EIPS/eip-3855), which was added as part of the [Shanghai hard fork](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md). Prior to running a deployment with a `>=0.8.20`-compiled bytecode (using the EVM version `shanghai`), please verify that _all_ targeted EVM networks support the `PUSH0` opcode. Otherwise, a deployment attempt on an EVM chain without `PUSH0` support may result in deployment or runtime failure(s).

## Usage

```console
npx hardhat xdeploy
```

### Usage With Truffle

[Truffle](https://trufflesuite.com/truffle/) suite users can leverage the Hardhat plugin [`hardhat-truffle5`](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-truffle5) (or if you use Truffle v4 [`hardhat-truffle4`](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-truffle4)) to integrate with `TruffleContract` from Truffle v5. This plugin allows tests and scripts written for Truffle to work with Hardhat.

## How It Works

EVM opcodes can only be called via a smart contract. I have deployed a helper smart contract [`CreateX`](https://github.com/pcaversaccio/createx) with the same address across all the available networks to make easier and safer usage of the `CREATE2` EVM opcode. During your deployment, the plugin will call this contract.

### A Note on `SELFDESTRUCT`

Using the `CREATE2` EVM opcode always allows to redeploy a new smart contract to a previously selfdestructed contract address. However, if a contract creation is attempted, due to either a creation transaction or the `CREATE`/`CREATE2` EVM opcode, and the destination address already has either nonzero nonce, or non-empty code, then the creation throws immediately, with exactly the same behavior as would arise if the first byte in the init code were an invalid opcode. This applies retroactively starting from genesis.

### A Note on the Contract Creation Transaction

It is important to note that the `msg.sender` of the contract creation transaction is the helper smart contract [`CreateX`](https://github.com/pcaversaccio/createx) with address `0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed`. If you are relying on common smart contract libraries such as [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)[^1] for your smart contract, which set certain constructor arguments to `msg.sender` (e.g. `owner`), you will need to change these arguments to `tx.origin` so that they are set to your deployer's EOA address. For another workaround, see [here](https://github.com/pcaversaccio/xdeployer/discussions/18).

> [!CAUTION]
> Please familiarise yourself with the security considerations concerning `tx.origin`. You can find more information about it, e.g. [here](https://docs.soliditylang.org/en/latest/security-considerations.html#tx-origin).

## Donation

I am a strong advocate of the open-source and free software paradigm. However, if you feel my work deserves a donation, you can send it to this address: [`0x07bF3CDA34aA78d92949bbDce31520714AB5b228`](https://etherscan.io/address/0x07bF3CDA34aA78d92949bbDce31520714AB5b228). I can pledge that I will use this money to help fix more existing challenges in the Ethereum ecosystem 🤝.

[^1]: Please note that [OpenZeppelin Contracts version `5.0.0`](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v5.0.0) has made the initial `owner` explicit (see PR [#4267](https://github.com/OpenZeppelin/openzeppelin-contracts/pull/4267)).
