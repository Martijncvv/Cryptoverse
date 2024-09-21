import {
  useAccount,
  useChainId,
  usePublicClient,
  useWriteContract,
} from "wagmi";
import { createCollectorClient } from "@zoralabs/protocol-sdk";

export type CollectMintProps = {
  contractAddress: string;
  uid: number;
};

export default function ZoraCollectMint({
  contractAddress,
  uid,
}: CollectMintProps) {
  const chainId = useChainId();
  const publicClient = usePublicClient()!;

  const { address: minterAccount } = useAccount();
  const { writeContract } = useWriteContract();

  const mintNft = async () => {
    const collectorClient = createCollectorClient({ chainId, publicClient });

    if (!minterAccount) {
      console.error("No minter account");
      alert("No minter account");
      return;
    }

    // prepare the mint transaction
    const { parameters } = await collectorClient.mint({
      // 1155 contract address
      tokenContract: contractAddress as `0x${string}`,
      // type of item to mint
      mintType: "1155",
      // 1155 token id to mint
      tokenId: uid,
      // quantity of tokens to mint
      quantityToMint: 1,
      // optional comment to include with the mint
      mintComment: "My comment-test-13:03",
      // optional address that will receive a mint referral reward
      mintReferral: "0x6c49C9975dF28670D86cdab96A560Da289814A43",
      // account that is to invoke the mint transaction
      minterAccount: minterAccount,
    });

    writeContract(parameters);
  };

  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={mintNft}
    >
      Collect Premint
    </button>
  );
}
