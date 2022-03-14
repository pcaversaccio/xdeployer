import { ConfigExtender } from "hardhat/types";
import { CREATE2_DEPLOYER_ADDRESS, GASLIMIT } from "./constants";

export const xdeployConfigExtender: ConfigExtender = (config, userConfig) => {
  const defaultConfig = {
    salt: undefined,
    signer: undefined,
    networks: [],
    rpcUrls: [],
    gasLimit: GASLIMIT,
    deployerAddress: CREATE2_DEPLOYER_ADDRESS,
  };

  if (userConfig.xdeploy) {
    const customConfig = userConfig.xdeploy;
    config.xdeploy = {
      ...defaultConfig,
      ...customConfig,
    };
  } else {
    config.xdeploy = defaultConfig;
  }
};
