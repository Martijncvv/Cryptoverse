import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { TextSF } from "@/components/ui/TextSF";

interface MoreDetailsButtonProps {
  onPress?: () => void;
}

export const MoreDetailsButton: React.FC<MoreDetailsButtonProps> = ({
  onPress,
}) => {
  return (
    <Pressable style={styles.moreDetailsButton} onPress={onPress} hitSlop={20}>
      <TextSF style={styles.moreDetailsText}>More Details</TextSF>
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
    marginBottom: Styles.spacing.xxl,
  },
  moreDetailsText: {
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.dark,
  },
});
