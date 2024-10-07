import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { CardContainer } from "@/components/layout/CardContainer";
import { SubTitle } from "@/components/ui/SubTitle";
import { TextSF } from "@/components/ui/TextSF";
import {
  BaseError,
  useAccount,
  useEnsAvatar,
  useEnsName,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
  TEST_1155_CONTRACT_ADDRESS,
} from "@/assets/constants/Constants";
import { ERC20ApprovalAbi } from "@/assets/contracts/erc20Abi";
import { TestERC1155Abi } from "@/assets/contracts/erc1155Abi";
import { useEffect, useState } from "react";
import { baseSepolia } from "wagmi/chains";
import { Toast } from "@/components/ui/Toast";
import { ButtonSF } from "@/components/form/ButtonSF";

interface MintContainerProps {}

type TokenId = "0" | "1" | "2";

const TOKEN_ID_COST: Record<TokenId, number> = {
  "0": 1000000,
  "1": 2000000,
  "2": 5000000,
};
const DECIMALS = 6;

export const MintContainer: React.FC<MintContainerProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<TokenId | "">("");
  const [hooveredId, setHooveredId] = useState<TokenId | "">("");

  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const {
    data: hashApprove,
    isPending: isPendingApprove,
    error: errorApprove,
    writeContract: writeApproveContract,
  } = useWriteContract();
  const {
    data: hashMint,
    isPending: isPendingMint,
    error: errorMint,
    writeContract: writeMintContract,
  } = useWriteContract();

  // https://github.com/wevm/wagmi/issues/3219
  const { isLoading: approvalIsLoading, isSuccess: approvalIsSuccess } =
    useWaitForTransactionReceipt({
      chainId: baseSepolia.id,
      hash: hashApprove,
    });

  useEffect(() => {
    if (hashApprove && selectedId && approvalIsSuccess) {
      // wait 10 seconds
      setTimeout(() => {
        mint(selectedId);
      }, 10000);
    }
  }, [approvalIsSuccess]);

  console.log("hashApprove", hashApprove);

  const handleMintPress = () => {
    if (selectedId) {
      approve(selectedId);
    } else {
      Alert.alert("Please select a donation package");
    }
  };

  const approve = async (id: TokenId) => {
    try {
      writeApproveContract({
        address: BASE_SEPOLIA_USDC_CONTRACT_ADDRESS,
        abi: ERC20ApprovalAbi,
        functionName: "approve",
        args: [TEST_1155_CONTRACT_ADDRESS, BigInt(TOKEN_ID_COST[id])],
      });
    } catch (error) {
      console.error("Approval transaction failed:", error);
    }
  };

  const mint = async (id: string) => {
    console.log("minting #", id);
    writeMintContract({
      address: TEST_1155_CONTRACT_ADDRESS,
      abi: TestERC1155Abi,
      functionName: "mint",
      args: [BigInt(id), BigInt(1)],
    });
  };

  console.log("approvalIsSuccess", approvalIsSuccess);
  console.log("ensAvatar", ensAvatar);

  const handleOptionPress = (id: TokenId) => {
    setSelectedId(id);
  };

  return (
    <CardContainer gap={Styles.spacing.xl}>
      <View>
        {ensAvatar && <Image alt="ENS Avatar" source={ensAvatar} />}
        <SubTitle text={"Select amount of donation package"} />
        <Text style={styles.subTitle}>Total includes transaction fees</Text>
      </View>
      <View style={styles.donationOptionsField}>
        {(["0", "1", "2"] as const).map((id) => (
          <Pressable
            key={id}
            style={[
              styles.donationOptionBox,
              hooveredId === id && {
                ...styles.donationOptionBoxHoover,
              },
              selectedId === id && {
                ...styles.donationOptionBoxSelected,
              },
            ]}
            onPress={() => handleOptionPress(id)}
            onHoverIn={() => setHooveredId(id)}
            onHoverOut={() => setHooveredId("")}
          >
            <TextSF
              style={[
                styles.donationOptionText,

                selectedId === id && {
                  ...styles.donationOptionTextSelected,
                },
              ]}
            >
              {" "}
              {Number(id) + 1}
            </TextSF>
          </Pressable>
        ))}
      </View>
      <View style={styles.totalField}>
        <TextSF style={styles.totalLabel}>Total value</TextSF>
        <TextSF
          style={styles.totalValue}
        >{`${selectedId ? TOKEN_ID_COST[selectedId] / 10 ** DECIMALS : ""} USDC`}</TextSF>
      </View>
      <ButtonSF
        onPress={handleMintPress}
        text={"Mint"}
        icon={"wallet"}
        iconPosition={"post"}
        disabled={!selectedId}
      />
      {isPendingApprove && (
        <Toast text="Transaction is pending..." type="pending" />
      )}
      {approvalIsLoading && (
        <Toast text={"Waiting for confirmation..."} type="pending" />
      )}
      {approvalIsSuccess && (
        <Toast text={"Transaction confirmed."} type="success" />
      )}
      {errorApprove && (
        <Toast
          text={
            (errorApprove as BaseError).shortMessage || errorApprove.message
          }
          type="error"
        />
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: Styles.typography.fontSize.xs,
    color: Colors.neutrals.dark,
  },

  donationOptionsField: {
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Styles.spacing.sm,
  },

  donationOptionBox: {
    flex: 1,
    paddingVertical: Styles.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Styles.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neutrals.default,
    backgroundColor: Colors.base.white,
  },
  donationOptionBoxSelected: {
    borderColor: Colors.principal.default,
  },
  donationOptionBoxHoover: {
    borderColor: Colors.principal.default,
    backgroundColor: Colors.principal.light,

    // WEB
    shadowColor: Colors.principal.medium,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  donationOptionTextSelected: {
    color: Colors.principal.default,
  },
  donationOptionText: {
    display: "flex",
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    textAlign: "center",
  },

  totalField: {
    paddingVertical: Styles.spacing.xxs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
