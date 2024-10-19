import React, { useEffect } from "react";

import { Image, Pressable, StyleSheet, View } from "react-native";
import { TextSF } from "@/components/ui/TextSF";
import { ButtonSF } from "@/components/form/ButtonSF";
import { Styles } from "@/assets/constants/Styles";
import { base } from "viem/chains";
import { addressFormatter } from "@/utils/addressFormatter";
import { Colors } from "@/assets/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getChainLogo } from "@/utils/getChainLogo";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSwitchChain,
} from "wagmi";
import { useToast } from "@/hooks/ToastProvider";
import { ConnectAccountField } from "@/components/onchain/ConnectAccountField";
import { Address } from "viem";
import { getAccountName } from "@/utils/getAccountName";

interface AccountFieldProps {
  hasLogoutIcon?: boolean;
}

export const AccountField: React.FC<AccountFieldProps> = ({
  hasLogoutIcon = true,
}) => {
  const [basename, setBasename] = React.useState<string | null>(null);
  const { switchChain } = useSwitchChain();
  const { address, chainId } = useAccount();
  const { displayToast } = useToast();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address, chainId: base.id });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName!,
    chainId: base.id,
  });

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

  const getBaseEnsName = async (address: Address) => {
    const baseName = await getAccountName({ address, chain: base });
    setBasename(baseName);
  };

  useEffect(() => {
    if (address) {
      getBaseEnsName(address);
    }
  }, [address]);

  if (!address) {
    return <ConnectAccountField />;
  }

  if (address && chainId) {
    return (
      <>
        <View style={styles.container}>
          <Pressable onPress={handleDisconnect} style={styles.accountInfo}>
            {ensAvatar ? (
              <Image
                style={styles.tokenIcon}
                alt="ENS Avatar"
                src={ensAvatar}
              />
            ) : (
              <Image style={styles.tokenIcon} source={getChainLogo(chainId)} />
            )}
            <TextSF style={styles.accountText}>
              {basename ? `${basename}` : addressFormatter(address)}
            </TextSF>
            {hasLogoutIcon ? (
              <Ionicons
                name={"log-out-outline"}
                size={22}
                color={Colors.neutrals.dark}
              />
            ) : null}
          </Pressable>

          {chainId !== base?.id ? ( // todo set to BAASE
            <View
              style={{
                position: "absolute",
                top: "120%",
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <ButtonSF
                onPress={handleSwitchChain}
                text={"Switch To Base Network"}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  }

  return null;
};

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
