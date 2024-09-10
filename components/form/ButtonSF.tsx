import { Pressable, StyleSheet, Text } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface ButtonSFProps {
  text: string;
  onPress: () => void;
}

export const ButtonSF: React.FC<ButtonSFProps> = ({ text, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.md,
    backgroundColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.md,
  },
  text: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.white,
  },
});
