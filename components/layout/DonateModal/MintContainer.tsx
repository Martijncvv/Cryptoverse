import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { CardContainer } from "@/components/layout/CardContainer";
import { SubTitle } from "@/components/ui/SubTitle";
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
import { MintOption } from "@/components/layout/DonateModal/MintOption";

interface MintContainerProps {}

type TokenId = "0" | "1" | "2";

const TOKEN_ID_COST: Record<TokenId, number> = {
  "0": 1000000,
  "1": 2000000,
  "2": 5000000,
};
const DECIMALS = 6;

const mintOptions = [
  {
    id: "1",
    mintId: "0" as TokenId,
    packages: "1",
    usdc: "20",
  },
  {
    id: "2",
    mintId: "1" as TokenId,
    packages: "5",
    usdc: "100",
  },
  {
    id: "3",
    mintId: "1" as TokenId,
    packages: "10",
    usdc: "200",
  },
];

export const MintContainer: React.FC<MintContainerProps> = ({}) => {
  const [selectedId, setSelectedId] = useState<TokenId | null>(null);

  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const getMintId = (id: string) => {
    return mintOptions.find((option) => option.id === id)?.mintId;
  };

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
      const mintId = getMintId(selectedId);
      if (mintId) {
        setTimeout(() => {
          mint(mintId);
        }, 10000);
      }
    }
  }, [approvalIsSuccess]);

  console.log("hashApprove", hashApprove);

  const handleMintPress = () => {
    if (selectedId) {
      const mintId = getMintId(selectedId);
      if (mintId) {
        approve(mintId);
      }
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
    <CardContainer gap={Styles.spacing.lg}>
      <View>
        {ensAvatar && <Image alt="ENS Avatar" source={ensAvatar} />}
        <SubTitle text={"Select amount of donation package"} />
        <Text style={styles.subTitle}>Total includes transaction fees</Text>
      </View>
      <View style={styles.donationOptionsField}>
        {mintOptions.map((option) => (
          <MintOption
            key={option.id}
            option={option}
            onPress={handleOptionPress}
            selectedId={selectedId}
          />
        ))}
      </View>

      <ButtonSF
        onPress={handleMintPress}
        text={"Mint"}
        icon={"wallet"}
        iconPosition={"pre"}
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
});
