export interface XdeployConfig {
  networks?: Array<string>;
  contract?: string;
  salt?: string;
  constructorArgsPath?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rpcUrls?: Array<any>;
}
