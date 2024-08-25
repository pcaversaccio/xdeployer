// List of supported networks with corresponding block explorers
export const networksInfo: {
  [explorer: string]: "N/A" | `{"http" | "https"}//${string}`
} = {
  localhost: "N/A",
  hardhat: "N/A",
  sepolia: "https://sepolia.etherscan.io/",
  holesky: "https://holesky.etherscan.io/",
  bscTestnet: "https://testnet.bscscan.com/",
  optimismSepolia: "https://sepolia-optimism.etherscan.io/",
  arbitrumSepolia: "https://sepolia.arbiscan.io/",
  amoy: "https://amoy.polygonscan.com/",
  polygonZkEVMTestnet: "https://cardona-zkevm.polygonscan.com/",
  fantomTestnet: "https://testnet.ftmscan.com/",
  fuji: "https://testnet.snowtrace.io/",
  chiado: "https://gnosis-chiado.blockscout.com/",
  moonbaseAlpha: "https://moonbase.moonscan.io/",
  alfajores: "https://alfajores.celoscan.io/",
  auroraTestnet: "https://explorer.testnet.aurora.dev/",
  harmonyTestnet: "https://explorer.testnet.harmony.one/",
  spark: "https://explorer.fusespark.io/",
  cronosTestnet: "https://cronos.org/explorer/testnet3/",
  evmosTestnet: "https://www.mintscan.io/evmos-testnet/",
  bobaTestnet: "https://testnet.bobascan.com/",
  cantoTestnet: "https://testnet.tuber.build/",
  baseSepolia: "https://sepolia.basescan.org/",
  mantleTestnet: "https://sepolia.mantlescan.xyz/",
  filecoinTestnet: "https://calibration.filfox.info/en/",
  scrollSepolia: "https://sepolia.scrollscan.com/",
  lineaTestnet: "https://sepolia.lineascan.build/",
  zoraSepolia: "https://sepolia.explorer.zora.energy/",
  luksoTestnet: "https://explorer.execution.testnet.lukso.network/",
  mantaTestnet: "https://pacific-explorer.sepolia-testnet.manta.network/",
  blastTestnet: "https://sepolia.blastscan.io/",
  dosTestnet: "https://test.doscan.io/",
  fraxtalTestnet: "https://holesky.fraxscan.com/",
  metisTestnet: "https://sepolia-explorer.metisdevops.link/",
  modeTestnet: "https://sepolia.explorer.mode.network/",
  seiArcticTestnet: "https://seistream.app/",
  xlayerTestnet: "https://www.oklink.com/xlayer-test/",
  bobTestnet: "https://testnet-explorer.gobob.xyz/",
  coreTestnet: "https://scan.test.btcs.network/",
  telosTestnet: "https://testnet.teloscan.io/",
  rootstockTestnet: "https://rootstock-testnet.blockscout.com/",
  chilizTestnet: "https://testnet.chiliscan.com/",
  taraxaTestnet: "https://testnet.explorer.taraxa.io/",
  taikoTestnet: "https://hekla.taikoscan.io/",
  zetaChainTestnet: "https://athens.explorer.zetachain.com/",
  ethMain: "https://etherscan.io/",
  bscMain: "https://bscscan.com/",
  optimismMain: "https://optimistic.etherscan.io/",
  arbitrumOne: "https://arbiscan.io/",
  arbitrumNova: "https://nova.arbiscan.io/",
  polygon: "https://polygonscan.com/",
  polygonZkEVMMain: "https://zkevm.polygonscan.com/",
  fantomMain: "https://ftmscan.com/",
  avalanche: "https://snowtrace.io/",
  gnosis: "https://gnosisscan.io/",
  moonriver: "https://moonriver.moonscan.io/",
  moonbeam: "https://moonbeam.moonscan.io/",
  celo: "https://celoscan.io/",
  auroraMain: "https://explorer.mainnet.aurora.dev/",
  harmonyMain: "https://explorer.harmony.one/",
  fuse: "https://explorer.fuse.io/",
  cronosMain: "https://cronoscan.com/",
  evmosMain: "https://www.mintscan.io/evmos/",
  bobaMain: "https://bobascan.com/",
  cantoMain: "https://tuber.build/",
  baseMain: "https://basescan.org/",
  mantleMain: "https://mantlescan.xyz/",
  filecoinMain: "https://filfox.info/en/",
  scrollMain: "https://scrollscan.com/",
  lineaMain: "https://lineascan.build/",
  zoraMain: "https://explorer.zora.energy/",
  luksoMain: "https://explorer.execution.mainnet.lukso.network/",
  mantaMain: "https://pacific-explorer.manta.network/",
  blastMain: "https://blastscan.io/",
  dosMain: "https://doscan.io/",
  fraxtalMain: "https://fraxscan.com/",
  enduranceMain: "https://explorer-endurance.fusionist.io/",
  kavaMain: "https://kavascan.com/",
  metisMain: "https://andromeda-explorer.metis.io/",
  modeMain: "https://explorer.mode.network/",
  xlayerMain: "https://www.oklink.com/xlayer/",
  bobMain: "https://explorer.gobob.xyz/",
  coreMain: "https://scan.coredao.org/",
  telosMain: "https://www.teloscan.io/",
  rootstockMain: "https://rootstock.blockscout.com/",
  chilizMain: "https://chiliscan.com/",
  taraxaMain: "https://mainnet.explorer.taraxa.io/",
  gravityAlphaMain: "https://explorer.gravity.xyz/",
  taikoMain: "https://taikoscan.io/",
  zetaChainMain: "https://explorer.zetachain.com/"
};

export const networks = Object.keys(networksInfo);

export const explorers = Object.values(networksInfo);

export const getTxHashLink = (network: string, hash: string) => {
  const explorer = networksInfo[network] as string;

  if (network.slice(0, 8) == "filecoin") {
    return `${explorer}message/${hash}`
  } else if (network.slice(0, 16) ==
    "seiArcticTestnet") {
    return `${explorer}transactions/${hash}`
  }

  return `${explorer}tx/${hash}`;
}

export const getAddressLink = (network: string, address: string) => {
  const explorer = networksInfo[network] as string;

  if (network.slice(0, 16) ==
    "seiArcticTestnet") {
    return `${explorer}account/${address}`
  }

  return `${explorer}address/${address}`;
}