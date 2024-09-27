import { useCallback } from "react";

import { useAccount } from "wagmi";
import {
  LifecycleStatus,
  Transaction,
  TransactionButton,
} from "@coinbase/onchainkit/esm/transaction";
import {
  BASE_SEPOLIA_CHAIN_ID,
  BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
  TEST_1155_CONTRACT_ADDRESS,
} from "@/assets/constants/Constants";
import { ERC20ApprovalAbi } from "@/components/onchain/contracts/erc20Abi";
import { TestERC1155Abi } from "@/components/onchain/contracts/erc1155Abi";
import { TextSF } from "@/components/ui/TextSF";

type TokenId = "0" | "1" | "2";

const TOKEN_ID_COST: Record<TokenId, number> = {
  "0": 1000000,
  "1": 2000000,
  "2": 5000000,
};

interface ContractCall {
  address: string;
  abi: any; // Consider using a more specific type if possible
  functionName: string;
  args: any[]; // Consider using a more specific type if possible
}

export const TxsComponent = () => {
  let txStatus = "Transaction status";
  const accountInfo = useAccount();
  const address: `0x${string}` | undefined = accountInfo?.address;

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
    if (status.statusName === "transactionPending") {
      txStatus = "Transaction is pending";
    } else if (status.statusName === "success") {
      txStatus = "Transaction is successful";
    } else if (status.statusName === "error") {
      txStatus = "Transaction failed";
    }
  }, []);

  if (!address) {
    return null;
  }

  const createApprovalTx = (id: TokenId): ContractCall => ({
    address: BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
    abi: ERC20ApprovalAbi,
    functionName: "approve",
    args: [TEST_1155_CONTRACT_ADDRESS, TOKEN_ID_COST[id].toString()],
  });

  const createMintTx = (id: TokenId): ContractCall => ({
    address: TEST_1155_CONTRACT_ADDRESS,
    abi: TestERC1155Abi,
    functionName: "mint",
    args: [id, "1"], // Minting 1 token
  });

  const contractCalls: ContractCall[] = [
    createApprovalTx("0"),
    createMintTx("0"),
    // createApprovalTx('1'),
    // createMintTx('1'),
    // createApprovalTx('2'),
    // createMintTx('2'),
  ];

  return (
    <>
      <TextSF>{txStatus}</TextSF>
      <Transaction
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onStatus={handleOnStatus}
        contracts={contractCalls}
      >
        <TransactionButton text={"Donate & Mint"} />
      </Transaction>
    </>
  );
};
