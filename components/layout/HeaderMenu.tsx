import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { MenuItem } from "@/components/layout/HeaderMenu/MenuItem";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";
import { AccountField } from "@/components/onchain/AccountField";
// AddressReact

export const HeaderMenu = () => {
  const { width: windowWidth } = useWindowDimensions();
  if (windowWidth < 724) {
    return null;
  }

  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      height: 50,
      paddingHorizontal: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: Styles.spacing.xxxxl,
      // backgroundColor: "yellow",
    },

    sendaLogo: {
      flexBasis: windowWidth > 600 ? 50 : "100%",
      height: 50,
      marginRight: "auto",
    },
    walletField: {
      height: 50,
      width: 50,
      flexShrink: 1,
      borderRadius: 20,
    },
    avatar: {
      width: 20,
      height: 20,
      borderRadius: 15,
    },

    accountField: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Styles.spacing.sm,
      // backgroundColor: "red",
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
      <AccountField />
    </View>
  );
};
