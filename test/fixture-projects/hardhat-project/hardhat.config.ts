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
    contract: "ERC20Mock",
    constructorArgsPath:
      "../test/fixture-projects/hardhat-project/deploy-args.ts",
    salt: ethers.utils.id(Date.now().toString()),
    signer:
      "0xe1904817e407877ea09135933f39121aa68ed0d9729d301084c544204171d100",
    networks: ["hardhat"],
    rpcUrls: ["hardhat"],
    gasLimit: 1.2 * 10 ** 6,
  },
};

export default config;
