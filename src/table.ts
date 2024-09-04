import { RESET, BRIGHT, GREEN, YELLOW } from "./colour-codes";

export function createNetworkInfoTable(
  networksInfo: Record<string, { url: string; chainId: number | undefined }>,
) {
  const networks = Object.entries(networksInfo);

  // Calculate column widths
  const networkWidth = Math.max(
    ...networks.map(([name]) => name.length),
    "Network Name".length,
  );
  const chainIdWidth = Math.max(
    ...networks.map(([, info]) => info.chainId?.toString().length ?? 0),
    "Chain ID".length,
  );
  const urlWidth = Math.max(
    ...networks.map(([, info]) => info.url.replace(/\//g, "").length),
    "Explorer URL".length,
  );

  // Create table border
  const horizontalBorder = `${BRIGHT}+${"-".repeat(networkWidth + 2)}+${"-".repeat(chainIdWidth + 2)}+${"-".repeat(urlWidth + 2)}+${RESET}`;

  // Create table header
  const header = [
    `${GREEN}${"Network Name".padEnd(networkWidth)}${RESET}`,
    `${GREEN}${"Chain ID".padEnd(chainIdWidth)}${RESET}`,
    `${GREEN}${"Explorer URL".padEnd(urlWidth)}${RESET}`,
  ];

  // Print colourful title
  console.log(`\n${YELLOW}Supported Networks${RESET}\n`);

  // Print table
  console.log(horizontalBorder);
  console.log(
    `${BRIGHT}|${RESET} ${header.join(` ${BRIGHT}|${RESET} `)} ${BRIGHT}|${RESET}`,
  );
  console.log(horizontalBorder);

  // Create table rows
  networks.forEach(([network, info]) => {
    const rowColor = RESET;
    const row = [
      `${rowColor}${network.padEnd(networkWidth)}${RESET}`,
      `${rowColor}${(info.chainId?.toString() ?? "N/A").padEnd(chainIdWidth)}${RESET}`,
      `${rowColor}${info.url.replace(/\/$/, "").padEnd(urlWidth)}${RESET}`, // Remove all trailing forward slashes from the block explorer links
    ];
    console.log(
      `${BRIGHT}|${RESET} ${row.join(` ${BRIGHT}|${RESET} `)} ${BRIGHT}|${RESET}`,
    );
    console.log(horizontalBorder);
  });
}
