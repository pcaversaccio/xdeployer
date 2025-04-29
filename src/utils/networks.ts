// List of supported networks with corresponding block explorer links and chain IDs
export const networksInfo = {
  localhost: { url: "N/A", chainId: undefined },
  hardhat: { url: "N/A", chainId: 31337 },
  sepolia: { url: "https://sepolia.etherscan.io", chainId: 11155111 },
  holesky: { url: "https://holesky.etherscan.io", chainId: 17000 },
  hoodi: { url: "https://hoodi.etherscan.io", chainId: 560048 },
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
  fantomTestnet: {
    url: "https://explorer.testnet.fantom.network",
    chainId: 4002,
  },
  fuji: { url: "https://testnet.snowscan.xyz", chainId: 43113 },
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
  seiArcticDevnet: {
    url: "https://seitrace.com/?chain=arctic-1",
    chainId: 713715,
  },
  seiAtlanticTestnet: {
    url: "https://seitrace.com/?chain=atlantic-2",
    chainId: 1328,
  },
  xlayerTestnet: {
    url: "https://www.oklink.com/x-layer-testnet",
    chainId: 195,
  },
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
    url: "https://sepolia.worldscan.org",
    chainId: 4801,
  },
  plumeTestnet: {
    url: "https://testnet-explorer.plumenetwork.xyz",
    chainId: 98867,
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
    url: "https://aeneid.storyscan.io",
    chainId: 1315,
  },
  sonicTestnet: {
    url: "https://testnet.sonicscan.org",
    chainId: 57054,
  },
  flowTestnet: {
    url: "https://evm-testnet.flowscan.io",
    chainId: 545,
  },
  inkTestnet: {
    url: "https://explorer-sepolia.inkonchain.com",
    chainId: 763373,
  },
  morphTestnet: {
    url: "https://explorer-holesky.morphl2.io",
    chainId: 2810,
  },
  shapeTestnet: {
    url: "https://sepolia.shapescan.xyz",
    chainId: 11011,
  },
  etherlinkTestnet: {
    url: "https://testnet.explorer.etherlink.com",
    chainId: 128123,
  },
  soneiumTestnet: {
    url: "https://soneium-minato.blockscout.com",
    chainId: 1946,
  },
  swellTestnet: {
    url: "https://swell-testnet-explorer.alt.technology",
    chainId: 1924,
  },
  hemiTestnet: {
    url: "https://testnet.explorer.hemi.xyz",
    chainId: 743111,
  },
  berachainTestnet: {
    url: "https://testnet.berascan.com",
    chainId: 80069,
  },
  monadTestnet: {
    url: "https://testnet.monadexplorer.com",
    chainId: 10143,
  },
  cornTestnet: {
    url: "https://testnet.cornscan.io",
    chainId: 21000001,
  },
  arenazTestnet: {
    url: "https://arena-z.blockscout.com",
    chainId: 9897,
  },
  iotexTestnet: {
    url: "https://testnet.iotexscan.io",
    chainId: 4690,
  },
  hychainTestnet: {
    url: "https://testnet.explorer.hychain.com",
    chainId: 29112,
  },
  zircuitTestnet: {
    url: "https://explorer.garfield-testnet.zircuit.com",
    chainId: 48898,
  },
  megaETHTestnet: {
    url: "https://www.megaexplorer.xyz",
    chainId: 6342,
  },
  bitlayerTestnet: {
    url: "https://testnet.btrscan.com",
    chainId: 200810,
  },
  roninTestnet: {
    url: "https://saigon-app.roninchain.com",
    chainId: 2021,
  },
  ethMain: { url: "https://etherscan.io", chainId: 1 },
  bscMain: { url: "https://bscscan.com", chainId: 56 },
  optimismMain: { url: "https://optimistic.etherscan.io", chainId: 10 },
  arbitrumOne: { url: "https://arbiscan.io", chainId: 42161 },
  arbitrumNova: { url: "https://nova.arbiscan.io", chainId: 42170 },
  polygon: { url: "https://polygonscan.com", chainId: 137 },
  polygonZkEVMMain: { url: "https://zkevm.polygonscan.com", chainId: 1101 },
  fantomMain: { url: "https://explorer.fantom.network", chainId: 250 },
  avalanche: { url: "https://snowscan.xyz", chainId: 43114 },
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
  seiMain: { url: "https://seitrace.com/?chain=pacific-1", chainId: 1329 },
  xlayerMain: { url: "https://www.oklink.com/x-layer", chainId: 196 },
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
    url: "https://worldscan.org",
    chainId: 480,
  },
  plumeMain: {
    url: "https://phoenix-explorer.plumenetwork.xyz",
    chainId: 98866,
  },
  unichainMain: {
    url: "https://uniscan.xyz",
    chainId: 130,
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
  superseedMain: {
    url: "https://explorer.superseed.xyz",
    chainId: 5330,
  },
  sonicMain: {
    url: "https://sonicscan.org",
    chainId: 146,
  },
  flowMain: {
    url: "https://evm.flowscan.io",
    chainId: 747,
  },
  inkMain: {
    url: "https://explorer.inkonchain.com",
    chainId: 57073,
  },
  morphMain: {
    url: "https://explorer.morphl2.io",
    chainId: 2818,
  },
  shapeMain: {
    url: "https://shapescan.xyz",
    chainId: 360,
  },
  etherlinkMain: {
    url: "https://explorer.etherlink.com",
    chainId: 42793,
  },
  soneiumMain: {
    url: "https://soneium.blockscout.com",
    chainId: 1868,
  },
  swellMain: {
    url: "https://explorer.swellnetwork.io",
    chainId: 1923,
  },
  hemiMain: {
    url: "https://explorer.hemi.xyz",
    chainId: 43111,
  },
  berachainMain: {
    url: "https://berascan.com",
    chainId: 80094,
  },
  cornMain: {
    url: "https://cornscan.io",
    chainId: 21000000,
  },
  arenazMain: {
    url: "https://explorer.arena-z.gg",
    chainId: 7897,
  },
  iotexMain: {
    url: "https://iotexscan.io",
    chainId: 4689,
  },
  hychainMain: {
    url: "https://explorer.hychain.com",
    chainId: 2911,
  },
  zircuitMain: {
    url: "https://explorer.zircuit.com",
    chainId: 48900,
  },
  bitlayerMain: {
    url: "https://www.btrscan.com",
    chainId: 200901,
  },
  roninMain: {
    url: "https://app.roninchain.com",
    chainId: 2020,
  },
} as const;

// Mapping of Sei networks to their chain query identifiers required for constructing the
// correct Seitrace URLs
export const seitraceMap = {
  seiArcticDevnet: "arctic-1",
  seiAtlanticTestnet: "atlantic-2",
  seiMain: "pacific-1",
} as const;

// Define a type `SupportedSeitraceNetwork` that represents the keys from `seitraceMap`, representing
// the supported Seitrace networks.
export type SupportedSeitraceNetwork = keyof typeof seitraceMap;

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
  const baseUrl = new URL(networksInfo[network].url).origin;
  return network.startsWith("filecoin")
    ? `${baseUrl}/message/${hash}`
    : network.startsWith("sei")
      ? `${baseUrl}/tx/${hash}?chain=${seitraceMap[network as SupportedSeitraceNetwork]}`
      : `${baseUrl}/tx/${hash}`;
};

// Generate the contract address link
export const getAddressLink = (network: SupportedNetwork, address: string) => {
  const baseUrl = new URL(networksInfo[network].url).origin;
  return network.startsWith("sei")
    ? `${baseUrl}/account/${address}?chain=${seitraceMap[network as SupportedSeitraceNetwork]}`
    : `${baseUrl}/address/${address}`;
};
