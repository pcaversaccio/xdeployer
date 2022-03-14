export interface XdeployConfig {
  salt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer?: any;
  networks?: Array<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rpcUrls?: Array<any>;
  gasLimit?: number;
  // Create2Deployer address - defaults to 0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2
  deployerAddress?: string;
}

export interface IDeploymentParams {
  contract: string;
  constructorArgs?: Array<any>;
}

export interface IDeploymentResult {
  network: string;
  contract: string;
  address: string | undefined;
  receipt: any;
  deployed: boolean;
  error: string | undefined;
}
