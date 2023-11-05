import { HardhatUserConfig } from "hardhat/types";
import { vars } from "hardhat/config";
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
          privateKey: vars.get(
            "PRIVATE_KEY",
            // `If there is no `PRIVATE_KEY` entry, we use one of the standard accounts of the Hardhat network.
            "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          ),
          balance: "100000000000000000000",
        },
      ],
      hardfork: "shanghai",
    },
  },
  defaultNetwork: "hardhat",
  xdeploy: {
    contract: "ERC20Mock",
    constructorArgsPath: "./deploy-args.ts",
    salt: ethers.id(Date.now().toString()),
    signer: vars.get("XDEPLOYER_TEST_ACCOUNT", ""),
    networks: ["goerli", "sepolia"],
    rpcUrls: [
      vars.get("ETH_GOERLI_TESTNET_URL", "https://rpc.ankr.com/eth_goerli"),
      vars.get("ETH_SEPOLIA_TESTNET_URL", "https://rpc.sepolia.org"),
    ],
    gasLimit: 1.2 * 10 ** 6,
  },
};

export default config;
