import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

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
      <TextSF style={styles.progressBarText}>
        {progressPercentage}% Raised
      </TextSF>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 40,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingLeft: Styles.spacing.xl,

    backgroundColor: Colors.base.white,

    borderWidth: 1,
    borderColor: Colors.base.black,
    borderRadius: Styles.borderRadius.md,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.principal.medium,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    borderColor: Colors.base.black,
    borderTopLeftRadius: Styles.borderRadius.md,
    borderBottomLeftRadius: Styles.borderRadius.md,
  },

  progressBarText: {
    zIndex: 2,
    position: "relative",
    marginTop: 6,
    fontWeight: Styles.typography.fontWeight.medium,
  },
});
