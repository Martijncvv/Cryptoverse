import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { MenuItem } from "@/components/layout/HeaderMenu/MenuItem";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";
import { WalletComponents } from "@/components/onchain/WalletWrapper";

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
    },

    sendaLogo: {
      flexBasis: windowWidth > 600 ? 50 : "100%",
      height: 50,
      marginRight: "auto",
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
      <WalletComponents />
    </View>
  );
};
