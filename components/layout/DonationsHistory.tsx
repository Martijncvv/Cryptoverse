import { StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface DonationsHistoryProps {
  // TODO
}

export const DonationsHistory: React.FC<DonationsHistoryProps> = () => {
  return (
    <View>
      <Text style={styles.title}>Donations History</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
    color: Colors.neutrals.black,
  },
});
