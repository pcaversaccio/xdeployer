/* eslint-disable @typescript-eslint/no-explicit-any */
export interface XdeployConfig {
  contract?: string;
  constructorArgsPath?: string;
  salt?: string;
  signer?: any;
  networks?: Array<string>;
  rpcUrls?: Array<any>;
  gasLimit?: number;
}
