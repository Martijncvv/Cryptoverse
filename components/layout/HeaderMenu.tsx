import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { MenuItem } from "@/components/layout/HeaderMenu/MenuItem";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/esm/wallet";
import {
  Address,
  Avatar,
  Badge,
  Identity,
  Name,
} from "@coinbase/onchainkit/esm/identity";
import { base } from "viem/chains";

export const HeaderMenu = () => {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  if (windowWidth < 724) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      height: 50,
      paddingHorizontal: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: Styles.spacing.xxxxl,
      backgroundColor: "red",
    },

    sendaLogo: {
      flexBasis: windowWidth > 600 ? 50 : "100%",
      height: 50,
      marginRight: "auto",
    },
    walletField: {
      height: 50,
      flexShrink: 1,
      borderRadius: 20,
    },
    avatarLarge: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    avatarSmall: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    walletContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 25,
      padding: 5,
    },
    walletText: {
      marginLeft: 10,
      fontSize: 14,
      color: "#333",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.sendaLogo}
      />
      <MenuItem
        text="Fundraisings Results"
        onPress={() => router.push("FundingDetailsScreen")}
      />
      <MenuItem text="About Us" onPress={() => router.push("MinterScreen")} />
      <MenuItem
        text="MinterScreen"
        onPress={() => router.push("MinterScreen")}
      />
      <View style={styles.walletField}>
        <Wallet style={{ width: 30, backgroundColor: "green" }}>
          <ConnectWallet>
            <Avatar chain={base} style={styles.avatarLarge} />
            <Name style={styles.walletText} />
          </ConnectWallet>

          <WalletDropdown style={{ width: 30, backgroundColor: "green" }}>
            <Identity hasCopyAddressOnClick>
              <Badge />
              <Address />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </View>
    </View>
  );
};
