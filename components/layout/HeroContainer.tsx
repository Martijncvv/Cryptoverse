import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

export const HeroContainer = () => {
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      marginBottom: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    headerText: {
      width: "90%",
      textAlign: "center",
      marginBottom: Styles.typography.fontSize.xl,

      fontSize:
        windowWidth > 600
          ? Styles.typography.fontSize.hero
          : Styles.typography.fontSize.title,
      fontWeight: Styles.typography.fontWeight.extraBold,
      color: Colors.principal.dark,
    },
    subText: {
      width: windowWidth > 600 ? "60%" : "90%",
      marginTop: Styles.spacing.md,

      textAlign: "center",
      fontSize:
        windowWidth > 600
          ? Styles.typography.fontSize.xxxl
          : Styles.typography.fontSize.xl,
      fontWeight: Styles.typography.fontWeight.medium,
      color: Colors.principal.dark,
    },

    heroImage: {
      width: 400,
      height: 200,
    },
  });

  return (
    <View style={styles.container}>
      <TextSF style={styles.headerText}>Small donations, big impacts</TextSF>
      <TextSF style={styles.subText}>
        Sharing the economy and knowledge of the Chain with our communities.
      </TextSF>
    </View>
  );
};
