import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

export const FooterMenu = () => {
  const { height, width: windowWidth } = useWindowDimensions();

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
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.semiBold,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.linkText}>Sendafund.xyz</Text>
      </Pressable>
    </View>
  );
};
