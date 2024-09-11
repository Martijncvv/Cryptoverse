import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";

export const MenuItem = ({ text }: { text: string }) => {
  return (
    <Pressable style={styles.menuItem}>
      <Text style={styles.menuText}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  menuItem: {
    height: 36,
    marginLeft: 20,
    justifyContent: "center",
  },
  menuText: {
    fontSize: Styles.typography.fontSize.md,
  },
});
