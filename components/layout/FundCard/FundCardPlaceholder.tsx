import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";

export const FundCardPlaceholder = ({}) => {
  const { width: windowWidth } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flexBasis:
        windowWidth < 600
          ? "100%"
          : windowWidth < 724
            ? "50%"
            : windowWidth < 1024
              ? "33%"
              : "25%",
      maxWidth: 400,
      flex: 1,
      height: 350,

      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: Colors.neutrals.black,
      borderRadius: Styles.borderRadius.md,
      backgroundColor: Colors.neutrals.light,
    },
  });

  return <View style={styles.container}></View>;
};
