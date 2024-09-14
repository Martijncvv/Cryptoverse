import { getNetworkDetails } from "@/utils/getNetworkDetails";

export const formatTxExplorerLink = (txHash: string, networkId: string) => {
  const networkDetails = getNetworkDetails(networkId);

  if (!networkDetails) {
    console.error("formatTxExplorerLink-Network not found: ", networkId);
    throw new Error("formatTxExplorerLink-Network not found");
  }

  return `https://${networkDetails.explorerUrl}"/tx/${txHash}`;
};
