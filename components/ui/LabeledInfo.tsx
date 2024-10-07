import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface LabeledInfoProps {
  label?: string;
  text: string;
  backgroundColor?: string;
}

export const LabeledInfo: React.FC<LabeledInfoProps> = ({
  label,
  text,
  backgroundColor = Colors.principal.light,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Styles.spacing.xs,
      paddingHorizontal: Styles.spacing.xl,
      paddingVertical: Styles.spacing.sm,
      borderRadius: Styles.borderRadius.md,
      backgroundColor: backgroundColor,
    },

    label: {
      fontWeight: Styles.typography.fontWeight.extraBold,
      color: Colors.neutrals.dark,
    },
    text: { display: "flex", flexWrap: "nowrap" },
  });

  return (
    <View style={styles.container}>
      <TextSF style={styles.label}>{label}</TextSF>
      <TextSF style={styles.text}>{text}</TextSF>
    </View>
  );
};
