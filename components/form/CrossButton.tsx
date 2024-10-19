import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface CrossButtonProps {
  onPress: () => void;
}

export const CrossButton: React.FC<CrossButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.closeButton} hitSlop={20}>
      <Ionicons
        name={"close"}
        size={Styles.typography.fontSize.xl}
        color={Colors.principal.dark}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: Styles.borderRadius.xs,
    backgroundColor: Colors.neutrals.light,
  },
  backText: {
    paddingTop: 1,
    color: Colors.principal.default,
  },
});
