import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Image, Pressable, StyleSheet, View } from "react-native";
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

interface AccountFieldProps {}

export const AccountField: React.FC<AccountFieldProps> = () => {
  const [baseEnsName, setBaseEnsName] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { address } = useAccount();
  const { connectors, connect } = useConnect(config);
  const { disconnect } = useDisconnect();

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

  if (!address && connectors.length > 0) {
    return (
      <>
        <Pressable onPress={toggleExpand} style={styles.accountInfo}>
          <TextSF>Connect Wallet</TextSF>
        </Pressable>
        {isExpanded ? (
          <View style={styles.connectorsField}>
            {connectors.map((connector) => (
              <View>
                <ButtonSF
                  key={connector.uid}
                  onPress={() => connect({ connector })}
                  text={
                    connector.id === "coinbaseWalletSDK"
                      ? "CB SmartWallet"
                      : connector.name
                  }
                />
              </View>
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
          <Image
            style={styles.tokenIcon}
            source={require("@/assets/images/base-chain-logo.png")}
          />
          <TextSF>
            {baseEnsName ? `${baseEnsName}` : addressFormatter(address)}
          </TextSF>
        </Pressable>
        {isExpanded && (
          <View style={styles.menuFieldContainer}>
            <View style={styles.menuField}>
              <ButtonSF onPress={() => disconnect()} text={"Disconnect"} />
            </View>
          </View>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    gap: Styles.spacing.md,
  },
  connectorsField: {
    position: "absolute",
    top: "100%",
    gap: Styles.spacing.sm,
    // left: 0,
    right: Styles.spacing.sm,
    zIndex: 1000,
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
    height: 16,
    width: 16,
  },
  menuFieldContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  menuField: {
    backgroundColor: "white",
  },
});

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
