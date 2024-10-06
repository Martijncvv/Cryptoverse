import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { TextSF } from "@/components/ui/TextSF";

export const FooterMenu = () => {
  const styles = StyleSheet.create({
    container: {
      marginTop: Styles.spacing.xxl,
      height: 70,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.principal.dark,
    },

    linkText: {
      color: Colors.neutrals.white,
      fontWeight: Styles.typography.fontWeight.semiBold,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable>
        <TextSF style={styles.linkText}>Sendafund.xyz</TextSF>
      </Pressable>
    </View>
  );
};
