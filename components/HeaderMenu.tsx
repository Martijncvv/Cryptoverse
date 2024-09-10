import { Image, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { MenuItem } from "@/components/HeaderMenu/MenuItem";

export const HeaderMenu = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.sendaLogo}
      />
      <View style={styles.menuContainer}>
        <MenuItem text="Fundraisings Results" />
        <MenuItem text="About Us" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  menuContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: Styles.spacing.md,
  },
  sendaLogo: {
    width: 50,
    height: 50,
  },
});
