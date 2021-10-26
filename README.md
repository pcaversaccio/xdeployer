# xdeployer
[![build status](https://github.com/pcaversaccio/xdeployer/actions/workflows/test.yml/badge.svg)](https://github.com/pcaversaccio/xdeployer/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

_A one line description of the plugin_

[Hardhat](https://hardhat.org) plugin example. 

## What

<_A longer, one paragraph, description of the plugin_>

This plugin will help you with world domination by implementing a simple tic-tac-toe in the terminal.

## Installation

<_A step-by-step guide on how to install the plugin_>

```bash
npm install <your npm package name> [list of peer dependencies]
```

Import the plugin in your `hardhat.config.js`:

```js
require("<your plugin npm package name>");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "<your plugin npm package name>";
```


## Required plugins

<_The list of all the required Hardhat plugins if there are any_>

- [@nomiclabs/hardhat-web3](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-web3)

## Tasks

<_A description of each task added by this plugin. If it just overrides internal 
tasks, this may not be needed_>

This plugin creates no additional tasks.

<_or_>

This plugin adds the _example_ task to Hardhat:
```
output of `npx hardhat help example`
```

## Environment extensions

<_A description of each extension to the Hardhat Runtime Environment_>

This plugin extends the Hardhat Runtime Environment by adding an `example` field
whose type is `ExampleHardhatRuntimeEnvironmentField`.

## Configuration

<_A description of each extension to the HardhatConfig or to its fields_>

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`newPath` field.

This is an example of how to set it:

```js
module.exports = {
  paths: {
    newPath: "new-path"
  }
};
```

## Usage

<_A description of how to use this plugin. How to use the tasks if there are any, etc._>

There are no additional steps you need to take for this plugin to work.

Install it and access ethers through the Hardhat Runtime Environment anywhere
you need it (tasks, scripts, tests, etc).

---
## Some TO DOS (before releasing v1)
- Add separate integration tests for hardhat/localhost & multiple test networks;
- Write proper README including specific preparation for deployment on Hardhat/localhost network (node v17 port [::1]). Also only testnet support for the moment being;
- Explain prefixed gasLimit value;
- Explain architecture behind plugin & deployed smart contract (& ownable & pausable structure behind it) & link to smart contract repo;
- Deploy to further testnets (BSC Testnet, Fantom Testnet, Huobi Testnet, Optimism Testnet, Polygon Testnet, Arbitrum Testnet); 
- Publish to NPM;
