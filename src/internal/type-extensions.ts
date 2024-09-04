import "hardhat/types/config";
import { XdeployConfig } from "./types";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    xdeploy?: XdeployConfig;
  }

  interface HardhatConfig {
    xdeploy: XdeployConfig;
  }
}
