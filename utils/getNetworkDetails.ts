export const getNetworkDetails = (
  platformId: string,
): { domain: string; explorerUrl: string } | null => {
  let domain: string;
  let usdcContractAddress: string
  let apikey: string
  let explorerUrl: string;

  switch (platformId) {
    case "arbitrum-one":
      domain = "api.arbiscan.io";
      explorerUrl = "arbiscan.io";
      break;
    case "avalanche":
      domain = "api.snowtrace.io";
      explorerUrl = "snowtrace.io";
      break;
    case "base":
      domain = "api.basescan.org";
      explorerUrl = "basescan.org";
            usdcContractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
            apikey: "WE8V2FI55PN7K8J3U76CGT445CMVW9KKAX";
      break;
    case "blast":
      domain = "api.blastscan.io";
      explorerUrl = "blastscan.io";
      break;
    case "binance-smart-chain":
      domain = "api.bscscan.com";
      explorerUrl = "bscscan.com";
      break;
    case "celo":
      domain = "api.celoscan.io";
      explorerUrl = "celoscan.io";
      break;
    case "cronos":
      domain = "api.cronoscan.com";
      explorerUrl = "cronoscan.com";
      break;
    case "ethereum":
      domain = "api.etherscan.io";
      explorerUrl = "etherscan.io";
      break;
    case "fantom":
      domain = "api.ftmscan.com";
      explorerUrl = "ftmscan.com";
      break;
    case "linea": // todo check
      domain = "api.lineascan.build";
      explorerUrl = "lineascan.build";
      break;
    case "polygon-pos":
      domain = "api.polygonscan.com";
      explorerUrl = "polygonscan.com";
      break;
    case "optimistic-ethereum":
      domain = "api-optimistic.etherscan.io";
      explorerUrl = "optimistic.etherscan.io";
      break;
    case "scroll":
      domain = "api.scrollscan.com";
      explorerUrl = "scrollscan.com";
      break;
    default:
      console.log(
        `getPlatformDetails error: Invalid platformId: ${platformId}`,
      );
      return null;
  }

  return { domain, explorerUrl };
};
