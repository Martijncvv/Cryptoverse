import React, { useEffect, useState } from "react";

import { Image, Pressable, StyleSheet, View } from "react-native";
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
import { baseSepolia } from "wagmi/chains";

interface AccountFieldProps {
  hasLogoutIcon?: boolean;
}

export const AccountField: React.FC<AccountFieldProps> = ({
  hasLogoutIcon = true,
}) => {
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { displayToast } = useToast();
  const { disconnect } = useDisconnect();
  const [baseEnsName, setBaseEnsName] = useState<string | null>(null);

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

  const handleDisconnect = () => {
    try {
      disconnect();
      displayToast("wallet disconnected");
    } catch (error: any) {
      console.error("Error disconnecting wallet");
      console.error(error);
      displayToast(`error: ${error?.message}`, "error");
    }
  };

  const handleSwitchChain = () => {
    try {
      switchChain({ chainId: base.id });
      displayToast("You got Based");
    } catch (error: any) {
      console.error("Error switching chain");
      console.error(error);
      displayToast(`error: ${error?.message}`, "error");
    }
  };

  if (!address) {
    return <ConnectAccountField />;
  }

  if (address && chainId) {
    return (
      <>
        <View style={styles.container}>
          <Pressable onPress={handleDisconnect} style={styles.accountInfo}>
            <Image style={styles.tokenIcon} source={getChainLogo(chainId)} />
            <TextSF style={styles.accountText}>
              {baseEnsName ? `${baseEnsName}` : addressFormatter(address)}
            </TextSF>
            {hasLogoutIcon ? (
              <Ionicons
                name={"log-out-outline"}
                size={22}
                color={Colors.neutrals.dark}
              />
            ) : null}
          </Pressable>

          {chainId !== baseSepolia?.id ? ( // todo set to BAASE
            <ButtonSF
              onPress={handleSwitchChain}
              text={"Wrong network, go Based"}
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

  accountInfo: {
    alignSelf: "flex-start",
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
