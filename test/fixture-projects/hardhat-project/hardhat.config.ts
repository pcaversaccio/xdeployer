import { HardhatUserConfig } from "hardhat/types";
import "../../../src/index";
import { ethers } from "ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
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
            "0xe1904817e407877ea09135933f39121aa68ed0d9729d301084c544204171d100",
          balance: "100000000000000000000",
        },
      ],
    },
  },
  defaultNetwork: "hardhat",
  xdeploy: {
    networks: ["hardhat"],
    contract: "ERC20Mock",
    salt: ethers.utils.id(Date.now().toString()),
    constructorArgsPath:
      "../test/fixture-projects/hardhat-project/deploy-args.ts",
    signer:
      "0xe1904817e407877ea09135933f39121aa68ed0d9729d301084c544204171d100",
    rpcUrls: ["hardhat"],
  },
};

export default config;
