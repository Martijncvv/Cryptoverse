import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";

export const MenuItem = ({ text, onPress }: { text: string; onPress: any }) => {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuText}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  menuItem: {},
  menuText: {
    fontSize: Styles.typography.fontSize.md,
  },
});
