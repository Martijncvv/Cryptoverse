import { useCallback } from "react";

import { useAccount } from "wagmi";
import {
  LifecycleStatus,
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/esm/transaction";

import { ConnectWallet, Wallet } from "@coinbase/onchainkit/esm/wallet";
import { Avatar, Name } from "@coinbase/onchainkit/esm/identity";
import {
  BASE_SEPOLIA_CHAIN_ID,
  BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
  TEST_1155_CONTRACT_ADDRESS,
} from "@/assets/constants/Constants";
import { base } from "viem/chains";
import { ERC20ApprovalAbi } from "@/components/onchain/contracts/erc20Abi";
import { TestERC1155Abi } from "@/components/onchain/contracts/erc1155Abi";

export const TransactionComponents = () => {
  const accountInfo = useAccount();
  const address: `0x${string}` | undefined = accountInfo?.address;

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log("LifecycleStatus", status);
  }, []);

  const erc20Contract = [
    {
      address: BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
      abi: ERC20ApprovalAbi,
      functionName: "approve",
      args: [TEST_1155_CONTRACT_ADDRESS, "3000000"], // Approving 2 token (assuming 6 decimals)
    },
  ];

  const erc1155Contract = [
    {
      address: TEST_1155_CONTRACT_ADDRESS,
      abi: TestERC1155Abi,
      functionName: "mint",
      args: ["0", "1"], // Minting 1 token
    },
  ];

  return address ? (
    <Transaction
      chainId={BASE_SEPOLIA_CHAIN_ID}
      contracts={erc1155Contract}
      onStatus={handleOnStatus}
    >
      <TransactionButton />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" chain={base} />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
};
