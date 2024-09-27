import { Pressable, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { CardContainer } from "@/components/layout/CardContainer";
import { SubTitle } from "@/components/ui/SubTitle";
import { TextSF } from "@/components/ui/TextSF";
import {
  BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  BASE_SEPOLIA_CHAIN_ID,
  BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
  TEST_1155_CONTRACT_ADDRESS,
} from "@/assets/constants/Constants";
import { ERC20ApprovalAbi } from "@/components/onchain/contracts/erc20Abi";
import { TestERC1155Abi } from "@/components/onchain/contracts/erc1155Abi";
import { useState } from "react";

interface MintContainerProps {}

type TokenId = "0" | "1" | "2";

const TOKEN_ID_COST: Record<TokenId, number> = {
  "0": 1000000,
  "1": 2000000,
  "2": 5000000,
};
const DECIMALS = 6;

export const MintContainer: React.FC<MintContainerProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<TokenId>("0");
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  // https://github.com/wevm/wagmi/issues/3219
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    chainId: BASE_SEPOLIA_CHAIN_ID,
    hash,
  });

  console.log("hash", hash);

  const approve = async (id: TokenId) => {
    setSelectedId(id);
    try {
      const result = await writeContract({
        address: BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
        abi: ERC20ApprovalAbi,
        functionName: "approve",
        args: [TEST_1155_CONTRACT_ADDRESS, BigInt(TOKEN_ID_COST[id])],
      });
      console.log("Transaction submitted:", result);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const mint = async (id: TokenId) => {
    writeContract({
      address: TEST_1155_CONTRACT_ADDRESS,
      abi: TestERC1155Abi,
      functionName: "mint",
      args: [BigInt(id), BigInt(1)],
    });
  };
  console.log("isSuccess", isSuccess);

  return (
    <CardContainer gap={Styles.spacing.xl}>
      <View>
        <SubTitle text={"Select amount of donation package"} />
        {/*{hash && <TextSF>Transaction Hash: {hash}</TextSF>}*/}
        {isPending && <TextSF>Transaction is pending...</TextSF>}
        {isLoading && <TextSF>Waiting for confirmation...</TextSF>}
        {isSuccess && <TextSF>Transaction confirmed.</TextSF>}
        {error && (
          <TextSF>
            Error: {(error as BaseError).shortMessage || error.message}
          </TextSF>
        )}
        <Text style={styles.subTitle}>Total includes transaction fees</Text>
      </View>
      <View style={styles.donationOptionsField}>
        {(["0", "1", "2"] as const).map((id) => (
          <Pressable
            key={id}
            style={styles.donationOptionBox}
            onPress={() => approve(id)}
          >
            <TextSF style={styles.donationOptionText}> {Number(id) + 1}</TextSF>
          </Pressable>
        ))}
      </View>
      <View style={styles.totalField}>
        <TextSF style={styles.totalLabel}>Total cost</TextSF>
        <TextSF
          style={styles.totalValue}
        >{`${selectedId ? TOKEN_ID_COST[selectedId] / 10 ** DECIMALS : "?"} USDC`}</TextSF>
      </View>
      {/*<TxsComponent />*/}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: Styles.typography.fontSize.xs,
    color: Colors.neutrals.dark,
  },

  donationOptionsField: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Styles.spacing.sm,
  },

  donationOptionBox: {
    flexBasis: "30%",
    paddingVertical: Styles.spacing.xl,

    borderRadius: Styles.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.principal.light,
    backgroundColor: "#E6F1FC", // todo
  },
  donationOptionText: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    textAlign: "center",
  },

  totalField: {
    paddingVertical: Styles.spacing.xxs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.dark,
  },
  totalValue: {
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
});
