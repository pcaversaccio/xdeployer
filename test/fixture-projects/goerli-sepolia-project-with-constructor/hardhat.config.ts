import { HardhatUserConfig } from "hardhat/types";
import "../../../src/index";
import { ethers } from "ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey:
            // If there is no `.env` entry, we use one of the standard accounts of the Hardhat network.
            process.env.XDEPLOYER_TEST_ACCOUNT ||
            "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          balance: "100000000000000000000",
        },
      ],
      hardfork: "merge",
    },
  },
  defaultNetwork: "hardhat",
  xdeploy: {
    contract: "ERC20Mock",
    constructorArgsPath: "./deploy-args.ts",
    salt: ethers.utils.id(Date.now().toString()),
    signer: process.env.XDEPLOYER_TEST_ACCOUNT,
    networks: ["goerli", "sepolia"],
    rpcUrls: [
      process.env.ETH_GOERLI_TESTNET_URL,
      process.env.ETH_SEPOLIA_TESTNET_URL,
    ],
    gasLimit: 1.2 * 10 ** 6,
  },
};

export default config;
