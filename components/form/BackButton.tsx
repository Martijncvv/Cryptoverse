import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Ionicons
        name={"chevron-back-outline"}
        size={Styles.typography.fontSize.md}
        color={Colors.principal.default}
      />
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: Styles.spacing.xxs,
  },
  backText: {
    fontSize: Styles.typography.fontSize.sm,
    color: Colors.principal.default,
  },
});
