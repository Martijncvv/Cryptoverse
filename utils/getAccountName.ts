import { base, Chain, mainnet } from "viem/chains";

import {
  Address,
  createPublicClient,
  encodePacked,
  http,
  keccak256,
  namehash,
} from "viem";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "@/assets/constants/Constants";
import L2ResolverAbi from "@/assets/abis/L2ResolverAbi";

export const getAccountName = async ({
  address,
  chain,
}: {
  address: Address;
  chain: Chain;
}) => {
  let client = createPublicClient({
    chain: chain,
    transport: http(),
  });

  const addressReverseNode = convertReverseNodeToBytes(address, base.id);

  try {
    const basename = await client.readContract({
      abi: L2ResolverAbi,
      address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
      functionName: "name",
      args: [addressReverseNode],
    });

    if (basename) {
      return basename;
    }
  } catch (_error) {
    // This is a best effort attempt, so we don't need to do anything here.
  }

  return address;
};

/**
 * Convert an address to a reverse node for ENS resolution
 */
const convertReverseNodeToBytes = (address: Address, chainId: number) => {
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const chainCoinType = convertChainIdToCoinType(chainId);
  const baseReverseNode = namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`,
  );
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode]),
  );
  return addressReverseNode;
};

/**
 * Convert an chainId to a coinType hex for reverse chain resolution
 */
const convertChainIdToCoinType = (chainId: number): string => {
  // L1 resolvers to addr
  if (chainId === mainnet.id) {
    return "addr";
  }
  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};
