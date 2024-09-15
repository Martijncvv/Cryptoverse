import { Styles } from "@/assets/constants/Styles";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";

interface SpendingDetailsProps {
  spendingName?: string;
  spendingAmount?: string;
  spendingCategory?: string;
}

export const SpendingDetails: React.FC<SpendingDetailsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Plan</Text>
      <View>
        <Text>72%</Text>
        <Text>Straight to purchases</Text>
        <Text>18%</Text>
        <Text>operational costs*</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: Styles.spacing.xl,

    backgroundColor: Colors.neutrals.light,
    borderRadius: Styles.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.neutrals.black,
  },
  title: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
});
