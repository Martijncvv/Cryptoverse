import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

export const HeroContainer = () => {
  const { width } = Dimensions.get("window");

  console.log("width: ", width);
  const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      marginBottom: 100,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerContainer: {
      width: "50%",
    },
    headerText: {
      fontSize:
        width > 600
          ? Styles.typography.fontSize.hero
          : Styles.typography.fontSize.title,
      fontWeight: Styles.typography.fontWeight.extraBold,
      color: Colors.principal.dark,
    },
    subText: {
      width: "80%",
      marginTop: Styles.spacing.md,
      fontSize: Styles.typography.fontSize.xl,
      color: Colors.principal.dark,
    },

    heroImage: {
      width: 400,
      height: 200,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Small donations</Text>
        <Text style={styles.headerText}>Big Impacts</Text>
        <Text style={styles.subText}>
          Sharing the economy and knowledge of the Chain with our communities.
        </Text>
      </View>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.heroImage}
      />
    </View>
  );
};
