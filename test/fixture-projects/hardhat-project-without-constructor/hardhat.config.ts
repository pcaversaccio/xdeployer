import { HardhatUserConfig } from "hardhat/types";
import "../../../src/index";
import { ethers } from "ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey:
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
    contract: "SimpleContract",
    salt: ethers.utils.id(Date.now().toString()),
    signer: process.env.XDEPLOYER_TEST_ACCOUNT,
    networks: ["hardhat"],
    rpcUrls: ["hardhat"],
    gasLimit: 1.2 * 10 ** 6,
  },
};

export default config;
