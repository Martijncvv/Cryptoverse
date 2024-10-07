import { Pressable, StyleSheet } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { TextSF } from "@/components/ui/TextSF";

export const MenuItem = ({ text, onPress }: { text: string; onPress: any }) => {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <TextSF style={styles.menuText}>{text}</TextSF>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  menuItem: {},
  menuText: {
    fontWeight: Styles.typography.fontWeight.medium,
  },
});
