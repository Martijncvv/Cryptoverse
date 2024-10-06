import React, { useEffect, useState } from "react";
import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
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
import { base, mainnet } from "viem/chains";
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
import { Toast } from "@/components/ui/Toast";

interface AccountFieldProps {}

export const AccountField: React.FC<AccountFieldProps> = () => {
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { connectors, connect } = useConnect(config);
  const { disconnect } = useDisconnect();
  const { width: windowWidth } = useWindowDimensions();

  const [baseEnsName, setBaseEnsName] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);
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

  const handleConnectPress = (connector: Connector) => {
    try {
      connect({ connector });
      setToastText("wallet connected");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error connecting wallet");
      console.error(error);
      setToastText(`error: ${error?.message}`);
      setIsExpanded(false);
    } finally {
      setTimeout(() => {
        setToastText(null);
      }, 3000);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
      setToastText("wallet disconnected");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error disconnecting wallet");
      console.error(error);
      setToastText(`error: ${error?.message}`);
      setIsExpanded(false);
    } finally {
      setTimeout(() => {
        setToastText(null);
      }, 3000);
    }
  };

  const handleSwitchChain = () => {
    try {
      switchChain({ chainId: base.id });
      setToastText("You got Based");
      setIsExpanded(false);
    } catch (error: any) {
      console.error("Error switching chain");
      console.error(error);
      setToastText(`error: ${error?.message}`);
      setIsExpanded(false);
    } finally {
      setTimeout(() => {
        setToastText(null);
      }, 3000);
    }
  };

  console.log("connectors: ", connectors);
  if (!address && connectors.length > 0) {
    return (
      <>
        <View>
          <Pressable onPress={toggleExpand} style={styles.accountInfo}>
            <TextSF style={styles.accountText}>Connect</TextSF>
            <Ionicons name={"wallet"} size={18} color={Colors.neutrals.black} />
          </Pressable>
          {isExpanded ? (
            <View
              style={
                isBurgerMenu
                  ? styles.mobileMenuFieldContainer
                  : styles.menuFieldContainer
              }
            >
              <View style={styles.menuOptionHeader}>
                <TextSF style={styles.menuOptionHeaderText}>
                  Your wallets
                </TextSF>
              </View>
              {connectors.map((connector) => (
                <Pressable
                  key={connector.uid}
                  style={styles.menuOption}
                  onPress={() => handleConnectPress(connector)}
                >
                  <Image style={styles.tokenIcon} source={connector.icon} />
                  <TextSF>
                    {connector.id === "coinbaseWalletSDK"
                      ? "CB SmartWallet"
                      : connector.name}
                  </TextSF>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        {toastText ? (
          <View style={!isBurgerMenu ? styles.toastField : null}>
            <Toast
              text={toastText}
              type={toastText?.includes("error") ? "error" : "success"}
            />
          </View>
        ) : null}
      </>
    );
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
              color={Colors.neutrals.black}
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
              <Pressable onPress={handleDisconnect} style={styles.menuOption}>
                <TextSF>Disconnect</TextSF>
                <Ionicons
                  name={"log-out-outline"}
                  size={22}
                  color={Colors.neutrals.black}
                />
              </Pressable>
            </View>
          )}
          {chainId !== base?.id ? (
            <ButtonSF
              onPress={handleSwitchChain}
              text={"Wrong network, get Based"}
            />
          ) : null}
        </View>
        {toastText ? (
          <View style={!isBurgerMenu ? styles.toastField : null}>
            <Toast
              text={toastText}
              type={toastText?.includes("error") ? "error" : "success"}
            />
          </View>
        ) : null}
      </>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: Styles.spacing.md,
  },
  menuFieldContainer: {
    position: "absolute",
    top: "100%",
    marginTop: Styles.spacing.xs,
    gap: Styles.spacing.xxs,
    right: 0,
    zIndex: 10,

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

  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 200,

    gap: Styles.spacing.sm,
    paddingVertical: Styles.spacing.lg,
    paddingLeft: Styles.spacing.xl,
    backgroundColor: Colors.neutrals.light,
  },
  menuOptionHeader: {
    paddingVertical: Styles.spacing.sm,
    paddingLeft: Styles.spacing.xl,
    backgroundColor: Colors.principal.light,
  },
  menuOptionHeaderText: {
    fontSize: Styles.typography.fontSize.xs,
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

    backgroundColor: Colors.neutrals.white,
  },
  accountText: {
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  tokenIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  toastField: {
    position: "absolute",
    top: 75,
    right: 40,
    zIndex: -1,
  },
});
