import { Styles } from "@/assets/constants/Styles";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { TextSF } from "@/components/ui/TextSF";

interface SpendingDetailsProps {
  spendingName?: string;
  spendingAmount?: string;
  spendingCategory?: string;
}

export const SpendingDetails: React.FC<SpendingDetailsProps> = () => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: Styles.spacing.xxxl,

      backgroundColor: Colors.neutrals.light,
      borderRadius: Styles.borderRadius.lg,
      borderWidth: 1,
      borderColor: Colors.neutrals.black,
    },
    title: {
      fontSize: Styles.typography.fontSize.xxl,
      fontWeight: Styles.typography.fontWeight.bold,
      color: Colors.neutrals.black,

      marginBottom: Styles.spacing.xl,
    },
    infoContainerWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },

    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Styles.spacing.xl,
    },
    number: {
      fontSize: 64,
      fontWeight: Styles.typography.fontWeight.normal,
      color: Colors.principal.default,
    },
    label: {
      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.normal,
      color: Colors.neutrals.black,
    },
    footerText: {
      paddingHorizontal: Styles.spacing.sm,
      marginTop: Styles.spacing.sm,

      textAlign: "center",
      fontSize: Styles.typography.fontSize.xxs,
      fontWeight: Styles.typography.fontWeight.normal,
      color: Colors.neutrals.black,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <TextSF style={styles.title}>Spending Plan</TextSF>

        <View style={styles.infoContainerWrapper}>
          <View style={styles.infoContainer}>
            <TextSF style={styles.number}>72%</TextSF>
            <TextSF style={styles.label}>Straight to purchases</TextSF>
          </View>
          <View style={styles.infoContainer}>
            <TextSF style={styles.number}>18%</TextSF>
            <TextSF style={styles.label}>operational costs*</TextSF>
          </View>
        </View>
      </View>
      <TextSF style={styles.footerText}>
        Operational cost consist on paying gasoline, food and other needs for
        the people purchasing and delivering the assets.*
      </TextSF>
    </View>
  );
};
