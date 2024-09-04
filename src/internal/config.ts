import { ConfigExtender } from "hardhat/types";
import { GASLIMIT } from "../utils/constants";

export const xdeployConfigExtender: ConfigExtender = (config, userConfig) => {
  const defaultConfig = {
    contract: undefined,
    constructorArgsPath: undefined,
    salt: undefined,
    signer: undefined,
    networks: [],
    rpcUrls: [],
    gasLimit: GASLIMIT,
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
