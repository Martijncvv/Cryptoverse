import {
  useAccount,
  useChainId,
  usePublicClient,
  useWriteContract,
} from "wagmi";
import { createCollectorClient } from "@zoralabs/protocol-sdk";

export type CollectPremintProps = {
  contractAddress: string;
  uid: number;
};

export default function ZoraCollectPremint({
  contractAddress,
  uid,
}: CollectPremintProps) {
  const chainId = useChainId();
  const publicClient = usePublicClient()!;

  const { address: minterAccount } = useAccount();
  const { writeContract } = useWriteContract();

  const collectorClient = createCollectorClient({ chainId, publicClient });

  async function collectPremint() {
    if (!minterAccount) {
      console.error("No minter account");
      return;
    }
    const { parameters } = await collectorClient.mint({
      tokenContract: contractAddress as `0x${string}`,
      mintType: "premint",
      uid,
      quantityToMint: 1,
      mintComment: "test-12:28",
      minterAccount,
    });

    writeContract(parameters);
  }

  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={collectPremint}
    >
      Collect Premint
    </button>
  );
}
