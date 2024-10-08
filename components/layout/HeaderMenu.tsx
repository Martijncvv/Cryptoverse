import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { MenuItem } from "@/components/layout/HeaderMenu/MenuItem";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";
import { AccountField } from "@/components/onchain/AccountField";
import { Colors } from "@/assets/constants/Colors";

export const HeaderMenu = () => {
  const { width: windowWidth } = useWindowDimensions();
  if (windowWidth < 724) {
    return null;
  }

  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      height: 72,
      paddingHorizontal: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: Styles.spacing.xxxxl,

      borderBottomWidth: 0.5,
      borderColor: Colors.base.black,
      backgroundColor: Colors.base.white,
    },

    sendaLogo: {
      flexBasis: windowWidth > 600 ? 50 : "100%",
      resizeMode: "contain",
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
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("")} style={styles.sendaLogo}>
        <Image source={require("@/assets/images/senda-logo.png")} />
      </Pressable>

      <MenuItem
        text="Fundraisings Results"
        onPress={() => router.push("FundingDetailsScreen")}
      />
      <MenuItem
        text="About Us"
        onPress={() => router.push("FundingDetailsScreen")}
      />

      <AccountField />
    </View>
  );
};
