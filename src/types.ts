export interface XdeployConfig {
  networks?: Array<any>;
  contract?: string;
  salt?: string;
  constructorArgsPath?: string;
  signer?: any;
  rpcUrls?: Array<any>;
}
