import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { TabOptions, Tag } from "@/components/ui/Tag";
import { ButtonSF } from "@/components/form/ButtonSF";
import { ProgressBar } from "@/components/layout/FundCard/ProgressBar";

interface FundCardProps {
  title: string;
  closeDate: string;
  tags: TabOptions[];
  minDonation: number;
  percentageRaised: number;
}

export const FundCard: React.FC<FundCardProps> = ({
  title,
  closeDate,
  tags,
  minDonation,
  percentageRaised,
}) => {
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
      padding: Styles.spacing.xxxl,
      borderWidth: 1,
      borderColor: Colors.neutrals.black,
      borderRadius: Styles.borderRadius.md,
      backgroundColor: Colors.neutrals.light,
    },

    tagsContainer: {
      flexDirection: "row",
      gap: Styles.spacing.sm,
    },

    dateText: {
      marginTop: Styles.spacing.xxxl,
      fontSize: Styles.typography.fontSize.xs,
      fontWeight: Styles.typography.fontWeight.medium,
      color: Colors.neutrals.black,
    },
    fundTitleText: {
      marginTop: Styles.spacing.sm,
      fontWeight: Styles.typography.fontWeight.bold,
      fontSize: Styles.typography.fontSize.xxxl,
      color: Colors.neutrals.black,
      height: 100,
    },

    minDonationText: {
      alignSelf: "flex-start",
      marginTop: Styles.spacing.xl,
      paddingVertical: Styles.spacing.sm,
      paddingHorizontal: Styles.spacing.lg,
      backgroundColor: Colors.principal.default,
      borderRadius: Styles.borderRadius.md,

      fontSize: Styles.typography.fontSize.md,
      fontWeight: Styles.typography.fontWeight.bold,
      color: Colors.neutrals.white,
    },
    footer: {
      marginTop: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: Styles.spacing.md,
      // backgroundColor: "green",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </View>

      <Text style={styles.dateText}>Close Date: {closeDate}</Text>
      <Text style={styles.fundTitleText}>{title}</Text>

      <Text style={styles.minDonationText}>
        Donation starts from USDC {minDonation}
      </Text>
      <View style={styles.footer}>
        <ProgressBar progressPercentage={percentageRaised} />
        <ButtonSF text="See Cause" onPress={() => console.log("Donate")} />
      </View>
    </View>
  );
};
