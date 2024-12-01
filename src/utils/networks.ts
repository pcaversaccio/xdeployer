// List of supported networks with corresponding block explorer links and chain IDs
export const networksInfo = {
  localhost: { url: "N/A", chainId: undefined },
  hardhat: { url: "N/A", chainId: 31337 },
  sepolia: { url: "https://sepolia.etherscan.io", chainId: 11155111 },
  holesky: { url: "https://holesky.etherscan.io", chainId: 17000 },
  bscTestnet: { url: "https://testnet.bscscan.com", chainId: 97 },
  optimismSepolia: {
    url: "https://sepolia-optimism.etherscan.io",
    chainId: 11155420,
  },
  arbitrumSepolia: { url: "https://sepolia.arbiscan.io", chainId: 421614 },
  amoy: { url: "https://amoy.polygonscan.com", chainId: 80002 },
  polygonZkEVMTestnet: {
    url: "https://cardona-zkevm.polygonscan.com",
    chainId: 2442,
  },
  fantomTestnet: { url: "https://testnet.ftmscan.com", chainId: 4002 },
  fuji: { url: "https://testnet.snowtrace.io", chainId: 43113 },
  chiado: { url: "https://gnosis-chiado.blockscout.com", chainId: 10200 },
  moonbaseAlpha: { url: "https://moonbase.moonscan.io", chainId: 1287 },
  alfajores: { url: "https://alfajores.celoscan.io", chainId: 44787 },
  auroraTestnet: {
    url: "https://explorer.testnet.aurora.dev",
    chainId: 1313161555,
  },
  harmonyTestnet: {
    url: "https://explorer.testnet.harmony.one",
    chainId: 1666700000,
  },
  spark: { url: "https://explorer.fusespark.io", chainId: 123 },
  cronosTestnet: { url: "https://cronos.org/explorer/testnet3", chainId: 338 },
  evmosTestnet: {
    url: "https://www.mintscan.io/evmos-testnet",
    chainId: 9000,
  },
  bobaTestnet: { url: "https://testnet.bobascan.com", chainId: 2888 },
  cantoTestnet: { url: "https://testnet.tuber.build", chainId: 7701 },
  baseSepolia: { url: "https://sepolia.basescan.org", chainId: 84532 },
  mantleTestnet: { url: "https://sepolia.mantlescan.xyz", chainId: 5003 },
  filecoinTestnet: {
    url: "https://calibration.filfox.info/en",
    chainId: 314159,
  },
  scrollSepolia: { url: "https://sepolia.scrollscan.com", chainId: 534351 },
  lineaTestnet: { url: "https://sepolia.lineascan.build", chainId: 59141 },
  zoraSepolia: {
    url: "https://sepolia.explorer.zora.energy",
    chainId: 999999999,
  },
  luksoTestnet: {
    url: "https://explorer.execution.testnet.lukso.network",
    chainId: 4201,
  },
  mantaTestnet: {
    url: "https://pacific-explorer.sepolia-testnet.manta.network",
    chainId: 3441006,
  },
  blastTestnet: { url: "https://sepolia.blastscan.io", chainId: 168587773 },
  dosTestnet: { url: "https://test.doscan.io", chainId: 3939 },
  fraxtalTestnet: { url: "https://holesky.fraxscan.com", chainId: 2522 },
  metisTestnet: {
    url: "https://sepolia-explorer.metisdevops.link",
    chainId: 59902,
  },
  modeTestnet: { url: "https://sepolia.explorer.mode.network", chainId: 919 },
  seiArcticTestnet: { url: "https://seistream.app", chainId: 713715 },
  xlayerTestnet: { url: "https://www.oklink.com/xlayer-test", chainId: 195 },
  bobTestnet: { url: "https://testnet-explorer.gobob.xyz", chainId: 111 },
  coreTestnet: { url: "https://scan.test.btcs.network", chainId: 1115 },
  telosTestnet: { url: "https://testnet.teloscan.io", chainId: 41 },
  rootstockTestnet: {
    url: "https://rootstock-testnet.blockscout.com",
    chainId: 31,
  },
  chilizTestnet: { url: "https://testnet.chiliscan.com", chainId: 88882 },
  taraxaTestnet: { url: "https://testnet.explorer.taraxa.io", chainId: 842 },
  taikoTestnet: { url: "https://hekla.taikoscan.io", chainId: 167009 },
  zetaChainTestnet: {
    url: "https://athens.explorer.zetachain.com",
    chainId: 7001,
  },
  "5ireChainTestnet": { url: "https://testnet.5irescan.io", chainId: 997 },
  sapphireTestnet: {
    url: "https://explorer.oasis.io/testnet/sapphire",
    chainId: 23295,
  },
  worldChainTestnet: {
    url: "https://worldchain-sepolia.explorer.alchemy.com",
    chainId: 4801,
  },
  plumeTestnet: {
    url: "https://test-explorer.plumenetwork.xyz",
    chainId: 98864,
  },
  unichainTestnet: {
    url: "https://sepolia.uniscan.xyz",
    chainId: 1301,
  },
  xdcTestnet: {
    url: "https://testnet.xdcscan.com",
    chainId: 51,
  },
  sxTestnet: {
    url: "https://explorerl2.toronto.sx.technology",
    chainId: 79479957,
  },
  liskTestnet: {
    url: "https://sepolia-blockscout.lisk.com",
    chainId: 4202,
  },
  metalL2Testnet: {
    url: "https://testnet.explorer.metall2.com",
    chainId: 1740,
  },
  superseedTestnet: {
    url: "https://sepolia-explorer.superseed.xyz",
    chainId: 53302,
  },
  storyTestnet: {
    url: "https://odyssey.storyscan.xyz",
    chainId: 1516,
  },
  ethMain: { url: "https://etherscan.io", chainId: 1 },
  bscMain: { url: "https://bscscan.com", chainId: 56 },
  optimismMain: { url: "https://optimistic.etherscan.io", chainId: 10 },
  arbitrumOne: { url: "https://arbiscan.io", chainId: 42161 },
  arbitrumNova: { url: "https://nova.arbiscan.io", chainId: 42170 },
  polygon: { url: "https://polygonscan.com", chainId: 137 },
  polygonZkEVMMain: { url: "https://zkevm.polygonscan.com", chainId: 1101 },
  fantomMain: { url: "https://ftmscan.com", chainId: 250 },
  avalanche: { url: "https://snowtrace.io", chainId: 43114 },
  gnosis: { url: "https://gnosisscan.io", chainId: 100 },
  moonriver: { url: "https://moonriver.moonscan.io", chainId: 1285 },
  moonbeam: { url: "https://moonbeam.moonscan.io", chainId: 1284 },
  celo: { url: "https://celoscan.io", chainId: 42220 },
  auroraMain: {
    url: "https://explorer.mainnet.aurora.dev",
    chainId: 1313161554,
  },
  harmonyMain: { url: "https://explorer.harmony.one", chainId: 1666600000 },
  fuse: { url: "https://explorer.fuse.io", chainId: 122 },
  cronosMain: { url: "https://cronoscan.com", chainId: 25 },
  evmosMain: { url: "https://www.mintscan.io/evmos", chainId: 9001 },
  bobaMain: { url: "https://bobascan.com", chainId: 288 },
  cantoMain: { url: "https://tuber.build", chainId: 7700 },
  baseMain: { url: "https://basescan.org", chainId: 8453 },
  mantleMain: { url: "https://mantlescan.xyz", chainId: 5000 },
  filecoinMain: { url: "https://filfox.info/en", chainId: 314 },
  scrollMain: { url: "https://scrollscan.com", chainId: 534352 },
  lineaMain: { url: "https://lineascan.build", chainId: 59144 },
  zoraMain: { url: "https://explorer.zora.energy", chainId: 7777777 },
  luksoMain: {
    url: "https://explorer.execution.mainnet.lukso.network",
    chainId: 42,
  },
  mantaMain: { url: "https://pacific-explorer.manta.network", chainId: 169 },
  blastMain: { url: "https://blastscan.io", chainId: 81457 },
  dosMain: { url: "https://doscan.io", chainId: 7979 },
  fraxtalMain: { url: "https://fraxscan.com", chainId: 252 },
  enduranceMain: {
    url: "https://explorer-endurance.fusionist.io",
    chainId: 648,
  },
  kavaMain: { url: "https://kavascan.com", chainId: 2222 },
  metisMain: { url: "https://andromeda-explorer.metis.io", chainId: 1088 },
  modeMain: { url: "https://explorer.mode.network", chainId: 34443 },
  xlayerMain: { url: "https://www.oklink.com/xlayer", chainId: 196 },
  bobMain: { url: "https://explorer.gobob.xyz", chainId: 60808 },
  coreMain: { url: "https://scan.coredao.org", chainId: 1116 },
  telosMain: { url: "https://www.teloscan.io", chainId: 40 },
  rootstockMain: { url: "https://rootstock.blockscout.com", chainId: 30 },
  chilizMain: { url: "https://chiliscan.com", chainId: 88888 },
  taraxaMain: { url: "https://mainnet.explorer.taraxa.io", chainId: 841 },
  gravityAlphaMain: { url: "https://explorer.gravity.xyz", chainId: 1625 },
  taikoMain: { url: "https://taikoscan.io", chainId: 167000 },
  zetaChainMain: { url: "https://explorer.zetachain.com", chainId: 7000 },
  "5ireChainMain": { url: "https://5irescan.io", chainId: 995 },
  sapphireMain: {
    url: "https://explorer.oasis.io/mainnet/sapphire",
    chainId: 23294,
  },
  worldChainMain: {
    url: "https://worldchain-mainnet.explorer.alchemy.com",
    chainId: 480,
  },
  xdcMain: {
    url: "https://xdcscan.com",
    chainId: 50,
  },
  sxMain: {
    url: "https://explorerl2.sx.technology",
    chainId: 4162,
  },
  liskMain: {
    url: "https://blockscout.lisk.com",
    chainId: 1135,
  },
  metalL2Main: {
    url: "https://explorer.metall2.com",
    chainId: 1750,
  },
} as const;

// Define a type `SupportedNetwork` that represents the union of all possible network names
// from the `networksInfo` object. This type ensures that any value assigned to a variable
// of type `SupportedNetwork` is a valid network key in `networksInfo`. It provides
// compile-time safety by preventing the use of unsupported or misspelled network names,
// allowing us to catch potential errors early and ensure consistency when working with
// network-specific functions or data
export type SupportedNetwork = keyof typeof networksInfo;

// Extract the network keys as an array of strings for use in the main plugin script
export const networks = Object.keys(networksInfo) as SupportedNetwork[];

// Generate the transaction hash link
export const getTxHashLink = (network: SupportedNetwork, hash: string) => {
  const baseUrl = networksInfo[network].url;
  const path = network.startsWith("filecoin")
    ? "message"
    : network === "seiArcticTestnet"
      ? "transactions"
      : "tx";
  return `${baseUrl}/${path}/${hash}`;
};

// Generate the contract address link
export const getAddressLink = (network: SupportedNetwork, address: string) => {
  const baseUrl = networksInfo[network].url;
  const path = network === "seiArcticTestnet" ? "account" : "address";
  return `${baseUrl}/${path}/${address}`;
};
