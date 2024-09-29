import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
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
import { base } from "wagmi/chains";
import { mainnet } from "viem/chains";
import type {
  Basename,
  GetName,
} from "@coinbase/onchainkit/src/identity/types";
import { getChainPublicClient } from "@coinbase/onchainkit/src/network/getChainPublicClient";
import { convertReverseNodeToBytes } from "@coinbase/onchainkit/src/identity/utils/convertReverseNodeToBytes";
import L2ResolverAbi from "@coinbase/onchainkit/src/identity/abis/L2ResolverAbi";
import { RESOLVER_ADDRESSES_BY_CHAIN_ID } from "@coinbase/onchainkit/src/identity/constants";
import { addressFormatter } from "@/utils/addressFormatter";
import { config } from "@/app/_layout";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getChainLogo } from "@/utils/getChainLogo";

interface AccountFieldProps {}

export const AccountField: React.FC<AccountFieldProps> = () => {
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { connectors, connect } = useConnect(config);
  const { disconnect } = useDisconnect();
  const { width: windowWidth } = useWindowDimensions();

  const [baseEnsName, setBaseEnsName] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isBurgerMenu = windowWidth < 724;

  const getBaseEns = async () => {
    if (!address) return null;

    const ensName = await getName({ address, chain: base });
    if (ensName) {
      setBaseEnsName(ensName);
    } else {
      console.log("No Base ENS");
    }
  };

  useEffect(() => {
    getBaseEns();
  }, [address]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  console.log("connectors: ", connectors);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      gap: Styles.spacing.md,
    },
    menuFieldContainer: {
      position: "absolute",
      top: "100%",
      gap: Styles.spacing.sm,
      right: Styles.spacing.sm,
      zIndex: 1000,
    },
    mobileMenuFieldContainer: {
      marginTop: Styles.spacing.md,
      gap: Styles.spacing.sm,
    },
    buttonField: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
    },
    accountInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: Styles.spacing.md,
    },
    tokenIcon: {
      height: 20,
      width: 20,
      resizeMode: "contain",
      marginHorizontal: 2,
    },

    menuField: {
      backgroundColor: "white",
    },
  });

  const handleConnectPress = (connector) => {
    console.log("connectors: ", connectors);
    connect({ connector });
    setIsExpanded(false);
  };

  const handleSwitchChain = () => {
    switchChain({ chainId: base.id });
    setIsExpanded(false);
  };

  if (!address && connectors.length > 0) {
    return (
      <>
        <Pressable onPress={toggleExpand} style={styles.accountInfo}>
          <Ionicons
            name={"log-in-outline"}
            size={24}
            color={Colors.principal.default}
          />
          <TextSF>Connect Wallet</TextSF>
        </Pressable>
        {isExpanded ? (
          <View
            style={
              isBurgerMenu
                ? styles.mobileMenuFieldContainer
                : styles.menuFieldContainer
            }
          >
            {connectors.map((connector) => (
              <ButtonSF
                key={connector.uid}
                onPress={() => handleConnectPress(connector)}
                text={
                  connector.id === "coinbaseWalletSDK"
                    ? "CB SmartWallet"
                    : connector.name
                }
              />
            ))}
          </View>
        ) : null}
      </>
    );
  }

  if (address) {
    return (
      <View style={styles.container}>
        <Pressable onPress={toggleExpand} style={styles.accountInfo}>
          <Image style={styles.tokenIcon} source={getChainLogo(chainId)} />
          <TextSF>
            {baseEnsName ? `${baseEnsName}` : addressFormatter(address)}
          </TextSF>
        </Pressable>
        {isExpanded && (
          <View
            style={
              isBurgerMenu
                ? styles.mobileMenuFieldContainer
                : styles.menuFieldContainer
            }
          >
            <View style={styles.menuField}>
              <ButtonSF onPress={() => disconnect()} text={"Disconnect"} />
            </View>
          </View>
        )}
        {chainId !== base?.id ? (
          <ButtonSF onPress={handleSwitchChain} text={"Switch to Base"} />
        ) : null}
      </View>
    );
  }

  return null;
};

const getName = async ({ address, chain = mainnet }: GetName) => {
  let client = getChainPublicClient(chain);

  const addressReverseNode = convertReverseNodeToBytes(address, base.id);
  try {
    const basename = await client.readContract({
      abi: L2ResolverAbi,
      address: RESOLVER_ADDRESSES_BY_CHAIN_ID[chain.id],
      functionName: "name",
      args: [addressReverseNode],
    });
    if (basename) {
      return basename as Basename;
    }
  } catch (error) {
    console.error("Error getting ENS name");
    console.error(error);
    return null;
  }
};
