import {
  useAccount,
  useChainId,
  usePublicClient,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import { createCollectorClient } from "@zoralabs/protocol-sdk";
import { BaseError, erc20Abi } from "viem";

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
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const getMintCost = async () => {
    const collectorClient = createCollectorClient({ chainId, publicClient });

    const { prepareMint } = await collectorClient.getToken({
      // 1155 contract address
      tokenContract: contractAddress as `0x${string}`,
      // 1155 token id
      tokenId: uid,
      mintType: "1155",
    });

    const { costs } = prepareMint({
      minterAccount: minterAccount,
      quantityToMint: 1,
    });
    console.log("cost123: ", costs);
  };

  const approveTx = async () => {
    const collectorClient = createCollectorClient({ chainId, publicClient });

    if (!minterAccount) {
      console.error("No minter account");
      alert("No minter account");
      return;
    }

    // prepare the mint transaction
    const { erc20Approval } = await collectorClient.mint({
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
      // token approval info
    });

    console.log("erc20Approval: ", erc20Approval);

    writeContract({
      abi: erc20Abi,
      address: erc20Approval!.erc20,
      functionName: "approve",
      args: [erc20Approval!.approveTo, erc20Approval!.quantity],
      account: minterAccount,
    });
  };

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

    const writeResult = writeContract(parameters);
    console.log("writeResult: ", writeResult);
  };

  return (
    <>
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={getMintCost}
      >
        mintCost
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={approveTx}
      >
        Approve
      </button>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={mintNft}
      >
        Mint
      </button>
    </>
  );
}
