import { Image, StyleSheet, Text, View } from "react-native";
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
import { ERC20ApprovalAbi } from "@/assets/abis/erc20Abi";
import { TestERC1155Abi } from "@/assets/abis/erc1155Abi";
import { useEffect, useState } from "react";
import { baseSepolia } from "wagmi/chains";
import { Toast, ToastProps, ToastType } from "@/components/ui/Toast";
import { ButtonSF } from "@/components/form/ButtonSF";
import { MintOption } from "@/components/layout/DonateModal/MintOption";
import { useModal } from "@/hooks/ModalProvider";

interface MintContainerProps {}

type TokenId = "0" | "1" | "2";

const TOKEN_ID_COST: Record<TokenId, number> = {
  "0": 1000000,
  "1": 2000000,
  "2": 5000000,
};
const DECIMALS = 6;

export const MINT_OPTIONS = [
  {
    id: "1",
    mintId: "0" as TokenId,
    packages: "1",
    usdc: "10",
    mintInput:
      "0x1b2ef1ca0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  },
  {
    id: "2",
    mintId: "1" as TokenId,
    packages: "2",
    usdc: "20",
    mintInput:
      "0x1b2ef1ca00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
  },
  {
    id: "3",
    mintId: "2" as TokenId,
    packages: "5",
    usdc: "50",
    mintInput:
      "0x1b2ef1ca00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001",
  },
];

export const MintContainer: React.FC<MintContainerProps> = ({}) => {
  const { openModal } = useModal();
  const { address } = useAccount();

  const [selectedId, setSelectedId] = useState<TokenId | null>(null);
  const [toastAlert, setToastAlert] = useState<ToastProps | null>(null);
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const getMintId = (id: string) => {
    return MINT_OPTIONS.find((option) => option.id === id)?.mintId;
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
  const { isLoading: isLoadingApproval, isSuccess: isSuccessApproval } =
    useWaitForTransactionReceipt({
      chainId: baseSepolia.id,
      hash: hashApprove,
    });
  const { isLoading: isLoadingMint, isSuccess: isSuccessMint } =
    useWaitForTransactionReceipt({
      chainId: baseSepolia.id,
      hash: hashMint,
    });

  useEffect(() => {
    if (hashApprove && selectedId && isSuccessApproval) {
      const mintId = getMintId(selectedId);
      if (mintId) {
        setTimeout(() => {
          mint(mintId);
        }, 1000);
      }
    }
  }, [isSuccessApproval]);

  const handleMintPress = () => {
    if (selectedId) {
      const mintId = getMintId(selectedId);
      if (mintId) {
        approve(mintId);
      }
    } else {
      handleToastAlert({
        text: "Please select a donation package",
        type: "error",
      });
    }
  };

  const handleToastAlert = ({
    text,
    type,
  }: {
    text: string;
    type: ToastType;
  }) => {
    setToastAlert({ text, type });
    setTimeout(() => {
      setToastAlert(null);
    }, 2000);
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

  const handleOptionPress = (id: TokenId) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (errorApprove || errorMint) {
      setToastAlert({
        text:
          (errorApprove as BaseError)?.shortMessage ||
          errorApprove?.message ||
          (errorMint as BaseError)?.shortMessage ||
          errorMint?.message ||
          "An error occurred",
        type: "error",
      });
      setTimeout(() => {
        setToastAlert(null);
      }, 5000);
    } else if (isSuccessMint) {
      setToastAlert({ text: "Mint confirmed", type: "success" });
      openModal("confirmDonation");
    } else if (isLoadingMint) {
      setToastAlert({
        text: "Waiting for mint confirmation",
        type: "pending",
      });
    } else if (isPendingMint) {
      setToastAlert({
        text: "Mint is pending",
        type: "pending",
      });
    } else if (isSuccessApproval) {
      setToastAlert({
        text: "Approval confirmed",
        type: "success",
      });
    } else if (isLoadingApproval) {
      setToastAlert({
        text: "Waiting for approval confirmation",
        type: "pending",
      });
    } else if (isPendingApprove) {
      setToastAlert({
        text: "Approval is pending",
        type: "pending",
      });
    }
  }, [
    errorApprove,
    errorMint,
    isSuccessMint,
    isLoadingMint,
    isPendingMint,
    isSuccessApproval,
    isLoadingApproval,
    isPendingApprove,
  ]);

  return (
    <CardContainer gap={Styles.spacing.lg}>
      <View>
        {ensAvatar && <Image alt="ENS Avatar" source={ensAvatar} />}
        <SubTitle text={"Select amount of donation package"} />
        <Text style={styles.subTitle}>Total includes transaction fees</Text>
      </View>
      <View style={styles.donationOptionsField}>
        {MINT_OPTIONS.map((option) => (
          <MintOption
            key={option.id}
            option={option}
            onPress={handleOptionPress}
            selectedId={selectedId}
          />
        ))}
      </View>

      {toastAlert ? (
        <Toast text={toastAlert.text} type={toastAlert.type} />
      ) : (
        <ButtonSF
          onPress={handleMintPress}
          text={"Mint"}
          disabled={!selectedId}
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
