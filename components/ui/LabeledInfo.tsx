import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface LabeledInfoProps {
  label: string;
  text: string;
}

export const LabeledInfo: React.FC<LabeledInfoProps> = ({ label, text }) => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      width: windowWidth < 724 ? "100%" : "48%",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Styles.spacing.xs,
      paddingHorizontal: Styles.spacing.xl,
      paddingVertical: Styles.spacing.sm,

      borderRadius: Styles.borderRadius.md,

      backgroundColor: Colors.neutrals.light, // todo
    },

    label: {
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.extraBold,
      color: Colors.neutrals.dark,
    },
    text: {
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.normal,
      color: Colors.neutrals.black,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
