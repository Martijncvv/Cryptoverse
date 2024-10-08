import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

export const HeroContainer = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;
  const styles = StyleSheet.create({
    container: {
      marginTop: 85,
      marginBottom: 85,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    headerText: {
      textAlign: "center",
      marginBottom: Styles.typography.fontSize.xl,

      fontSize: isMobileView
        ? Styles.typography.fontSize.title
        : Styles.typography.fontSize.hero,
      fontWeight: Styles.typography.fontWeight.extraBold,
      color: Colors.principal.dark,
    },
    subText: {
      width: isMobileView ? "90%" : "60%",
      marginTop: Styles.spacing.md,

      textAlign: "center",
      fontSize: isMobileView
        ? Styles.typography.fontSize.xl
        : Styles.typography.fontSize.xxxl,
      fontWeight: Styles.typography.fontWeight.medium,
      color: Colors.neutrals.dark,
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
