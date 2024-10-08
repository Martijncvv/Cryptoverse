import React, { useEffect, useState } from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { TextSF } from "@/components/ui/TextSF";
import { ButtonSF } from "@/components/form/ButtonSF";
import { Styles } from "@/assets/constants/Styles";
import { base } from "viem/chains";
// import type {
//   Basename,
//   GetName,
// } from "@coinbase/onchainkit/src/identity/types";
// import { getChainPublicClient } from "@coinbase/onchainkit/src/network/getChainPublicClient";
// import { convertReverseNodeToBytes } from "@coinbase/onchainkit/src/identity/utils/convertReverseNodeToBytes";
// import L2ResolverAbi from "@coinbase/onchainkit/src/identity/abis/L2ResolverAbi";
// import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "@coinbase/onchainkit/src/identity/constants";
import { addressFormatter } from "@/utils/addressFormatter";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getChainLogo } from "@/utils/getChainLogo";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { useToast } from "@/hooks/ToastProvider";
import { ConnectAccountField } from "@/components/onchain/ConnectAccountField";

interface AccountFieldProps {}

export const AccountField: React.FC<AccountFieldProps> = () => {
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { displayToast } = useToast();
  const { disconnect } = useDisconnect();
  const { width: windowWidth } = useWindowDimensions();

  const [baseEnsName, setBaseEnsName] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isBurgerMenu = windowWidth < 724;

  const getBaseEns = async () => {
    if (!address) return null;

    // const ensName = await getName({ address, chain: base });
    // if (ensName) {
    //   setBaseEnsName(ensName);
    // } else {
    //   console.log("No Base ENS");
    // }
  };

  useEffect(() => {
    getBaseEns();
  }, [address]);

  const toggleExpand = () => {
    displayToast("wallet connected");
    setIsExpanded((prev) => !prev);
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      displayToast("wallet disconnected");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error disconnecting wallet");
      console.error(error);
      displayToast(`error: ${error?.message}`, "error");
      setIsExpanded(false);
    }
  };

  const handleSwitchChain = () => {
    try {
      switchChain({ chainId: base.id });
      displayToast("You got Based");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error switching chain");
      console.error(error);
      displayToast(`error: ${error?.message}`, "error");
      setIsExpanded(false);
    }
  };

  if (!address) {
    return <ConnectAccountField />;
  }

  if (address && chainId) {
    return (
      <>
        <View style={styles.container}>
          <Pressable onPress={toggleExpand} style={styles.accountInfo}>
            <Image style={styles.tokenIcon} source={getChainLogo(chainId)} />
            <TextSF style={styles.accountText}>
              {baseEnsName ? `${baseEnsName}` : addressFormatter(address)}
            </TextSF>
            <Ionicons
              name={"log-out-outline"}
              size={22}
              color={Colors.neutrals.dark}
            />
          </Pressable>
          {isExpanded && (
            <View
              style={
                isBurgerMenu
                  ? styles.mobileMenuFieldContainer
                  : styles.menuFieldContainer
              }
            >
              <ButtonSF
                onPress={handleDisconnect}
                text={"Disconnect"}
                icon={"log-out-outline"}
                iconPosition={"post"}
                iconSize={22}
              />
            </View>
          )}
          {chainId !== base?.id ? (
            <ButtonSF
              onPress={handleSwitchChain}
              text={"Wrong network, get Based"}
            />
          ) : null}
        </View>
      </>
    );
  }

  return null;
};

// const getName = async ({ address, chain = mainnet }: GetName) => {
//   let client = getChainPublicClient(chain);
//
//   const addressReverseNode = convertReverseNodeToBytes(address, base.id);
//   try {
//     const basename = await client.readContract({
//       abi: L2ResolverAbi,
//       address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
//       functionName: "name",
//       args: [addressReverseNode],
//     });
//     if (basename) {
//       return basename as Basename;
//     }
//   } catch (error) {
//     console.error("Error getting ENS name");
//     console.error(error);
//     return null;
//   }
// };

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: Styles.spacing.md,
    zIndex: -1,
  },
  menuFieldContainer: {
    position: "absolute",
    top: "100%",
    marginTop: Styles.spacing.xs,
    gap: Styles.spacing.xxs,
    right: 0,

    backgroundColor: Colors.neutrals.medium,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.dark,
    overflow: "hidden",
  },
  mobileMenuFieldContainer: {
    marginTop: Styles.spacing.md,
    gap: Styles.spacing.sm,

    backgroundColor: Colors.neutrals.light,
    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.dark,
  },

  accountInfo: {
    paddingHorizontal: Styles.spacing.lg,
    paddingVertical: Styles.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Styles.spacing.md,

    borderRadius: Styles.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.dark,

    backgroundColor: Colors.base.white,
  },
  accountText: {
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.base.black,
  },
  tokenIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
});
