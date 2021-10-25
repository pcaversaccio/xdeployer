export interface XdeployConfig {
  contract?: string;
  constructorArgsPath?: string;
  salt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer?: any;
  networks?: Array<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rpcUrls?: Array<any>;
}
