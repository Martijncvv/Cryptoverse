import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

interface MoreDetailsButtonProps {
  onPress?: () => void;
}

export const MoreDetailsButton: React.FC<MoreDetailsButtonProps> = ({
  onPress,
}) => {
  return (
    <Pressable style={styles.moreDetailsButton} onPress={onPress}>
      <Text style={styles.moreDetailsText}>More details</Text>
      <Ionicons
        name="arrow-forward-circle-outline"
        size={16}
        color={Colors.neutrals.dark}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  moreDetailsButton: {
    paddingVertical: Styles.spacing.xs,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Styles.spacing.xs,
    marginBottom: Styles.spacing.xxxl,
  },
  moreDetailsText: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.dark,
  },
});
