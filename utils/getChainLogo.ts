import {ImageSourcePropType} from "react-native";

/**
 * Returns the logo image for a given blockchain network based on its chain ID.
 *
 * @param {number} chainId - The unique identifier of the blockchain network.
 * @returns {string} The path to the logo image file for the specified chain.
 *
 * @example
 * const ethereumLogo = getChainLogo(1);
 * // Returns path to Ethereum logo
 *
 * @example
 * const unknownChainLogo = getChainLogo(999);
 * // Returns path to default Ethereum logo for unknown chain IDs
 */
export const getChainLogo = (chainId: number): ImageSourcePropType => {
  switch (chainId) {
    case 1:
      return require("@/assets/images/networks/ethereum-chain-logo.png");
    case 10:
      return require("@/assets/images/networks/optimism-chain-logo.png");
    case 56:
      return require("@/assets/images/networks/binance-chain-logo.png");
    case 137:
      return require("@/assets/images/networks/polygon-chain-logo.png");
    case 900:
      return require("@/assets/images/networks/solana-chain-logo.png");
    case 8453:
      return require("@/assets/images/networks/base-chain-logo.png");
    case 84532:
      return require("@/assets/images/networks/test-chain-logo.png");
    case 42161:
      return require("@/assets/images/networks/arbitrum-chain-logo.png");
    default:
      return require("@/assets/images/coins/doge-coin-logo.png");
  }
};
