import { StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface ProgressBarProps {
  progressPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercentage,
}) => {
  const clampedPercentage = Math.max(0, Math.min(progressPercentage, 100));

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${clampedPercentage}%` }]} />
      <Text style={styles.progressBarText}>{progressPercentage}% Raised</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingLeft: Styles.spacing.xl,

    borderWidth: 1,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.md,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.principal.light,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderColor: Colors.neutrals.black,
    borderTopLeftRadius: Styles.borderRadius.md,
    borderBottomLeftRadius: Styles.borderRadius.md,
  },

  progressBarText: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.semiBold,
    color: Colors.neutrals.black,
    zIndex: 2,
    position: "relative",
  },
});
