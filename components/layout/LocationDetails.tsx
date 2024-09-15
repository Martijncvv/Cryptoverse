import { Image, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";

interface LocationDetailsProps {
  imageSource?: string;
  locationName?: string;
  cityName?: string;
  locationDescription?: string;
}

export const LocationDetails: React.FC<LocationDetailsProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/guatemala-happy-kids.jpg")}
        style={styles.map}
      />

      <View style={styles.locationDetails}>
        <Text style={styles.locationName}>San Lucas Toliman</Text>
        <Text style={styles.cityName}>Sololam Guatemala</Text>
        <Text
          style={styles.description}
        >{`The school is located in San Pedro La Laguna, it hosts over 500 kids from all around Lake Atitlán. Most of the parents are farmers and don’t have a monthly payment.`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Styles.spacing.xxxl,
  },
  map: {
    width: "40%",
    height: "auto",
    aspectRatio: 1,
    borderRadius: Styles.borderRadius.md,
  },
  locationDetails: {
    width: "50%",
    flexDirection: "column",
  },
  locationName: {
    marginBottom: Styles.spacing.xs,

    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.semiBold,
  },
  cityName: {
    marginBottom: Styles.spacing.xl,

    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.principal.default,
  },
  description: {
    flex: 1,
    flexShrink: 1,
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.neutrals.black,
  },
});
