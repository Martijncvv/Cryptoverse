import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Ionicons
        name={"chevron-back-outline"}
        size={Styles.typography.fontSize.lg}
        color={Colors.principal.default}
      />
      <TextSF style={styles.backText}>BACK</TextSF>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: Styles.spacing.xs,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Styles.spacing.xs,
    alignSelf: "flex-start",
  },
  backText: {
    paddingTop: 1,
    color: Colors.principal.default,
  },
});
