import { SupportedNetwork } from "../utils/networks";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface XdeployConfig {
  contract?: string;
  constructorArgsPath?: string;
  salt?: string;
  signer?: any;
  networks?: SupportedNetwork[];
  rpcUrls?: any[];
  gasLimit?: number;
}
