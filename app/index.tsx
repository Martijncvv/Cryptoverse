import { StyleSheet, View } from "react-native";
import { Colors } from "@/assets/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}></View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: "50%",
    backgroundColor: Colors.green.medium,
  },
  bottomContainer: {},
});
