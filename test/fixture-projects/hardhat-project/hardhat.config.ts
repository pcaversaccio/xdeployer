import { HardhatUserConfig } from "hardhat/types";
import * as dotenv from "dotenv";

// We load the plugin here.
import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4", // Hardhat currently only fully supports up to and including 0.8.4
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  xdeploy: {
    networks: ["rinkeby", "ropsten", "kovan"],
    contract: "ERC20Mock",
    salt: "YOLO",
    constructorArgsPath: "contracts/deploy-args.js",
    signer: process.env.PRIVATE_KEY,
    rpcUrls: [process.env.RINKEBY_URL, process.env.ROPSTEN_URL, process.env.KOVAN_URL],
  }
};

export default config;
