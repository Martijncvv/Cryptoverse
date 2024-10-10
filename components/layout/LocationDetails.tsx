import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface LocationDetailsProps {
  imageSource?: string;
  locationName?: string;
  cityName?: string;
  locationDescription?: string;
}

export const LocationDetails: React.FC<LocationDetailsProps> = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Styles.spacing.xxxl,
    },
    map: {
      width: isMobileView ? "100%" : "40%",
      height: "auto",
      aspectRatio: 1,
      borderRadius: Styles.borderRadius.md,
      borderWidth: 1,
      borderColor: Colors.base.black,
    },
    locationDetails: {
      width: isMobileView ? "100%" : "50%",
      flexDirection: "column",
    },
    locationName: {
      marginBottom: Styles.spacing.xs,

      fontSize: Styles.typography.fontSize.xxl,
      fontWeight: Styles.typography.fontWeight.extraBold,
    },
    cityName: {
      marginBottom: Styles.spacing.xl,
      color: Colors.principal.default,
      fontWeight: Styles.typography.fontWeight.bold,
    },
    description: {
      flex: 1,
      flexShrink: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/guatemala-happy-kids.jpg")}
        style={styles.map}
      />

      <View style={styles.locationDetails}>
        <TextSF style={styles.locationName}>San Lucas Toliman</TextSF>
        <TextSF style={styles.cityName}>Sololam Guatemala</TextSF>
        <TextSF
          style={styles.description}
        >{`The school is located in San Pedro La Laguna, it hosts over 500 kids from all around Lake Atitlán. Most of the parents are farmers and don’t have a monthly payment.`}</TextSF>
      </View>
    </View>
  );
};
