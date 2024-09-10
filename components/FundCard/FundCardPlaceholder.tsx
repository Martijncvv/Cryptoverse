import { StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

export const FundCardPlaceholder = ({}) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 400,

    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.md,
    backgroundColor: Colors.neutrals.light,
  },
});
