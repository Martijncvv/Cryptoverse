import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { ProgressBar } from "@/components/layout/FundCard/ProgressBar";
import { TabOptions } from "@/components/layout/FundCard/FundCard";
import { ButtonSF } from "@/components/form/ButtonSF";

interface FundingInfoCardProps {
  title: string;
  closeDate: string;
  tags: TabOptions[];
  percentageRaised: number;
  description: string;
}

export const FundingInfoCard: React.FC<FundingInfoCardProps> = ({
  title = "Help Build a Community Playground for Children",
  closeDate = "10th July 2024",
  tags = ["Funding Now", "Guatemala"],
  percentageRaised = 50,
  description = "Join us in empowering the young minds of Panajachel, Guatemala! We're raising funds to provide 200 school backpacks, filled with essential supplies, to support the education and dreams of these vibrant children.",
}) => {
  // todo taggs in top left
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.fundingPicture}
      />
      <Text style={styles.fundTitleText}>{title}</Text>
      <Text style={styles.dateText}>Close Date: {closeDate}</Text>
      <ProgressBar progressPercentage={percentageRaised} />
      <Text style={styles.subtitle}>About the cause</Text>
      <Text style={styles.description}>{description}</Text>
      <Pressable>
        <Text style={styles.moreDetails}>More details</Text>
      </Pressable>
      <View style={styles.footerButtons}>
        <ButtonSF text="See Cause" onPress={() => console.log("Donate")} />
        <ButtonSF
          text="Share"
          color={"white"}
          onPress={() => console.log("Donate")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 750,
    padding: Styles.spacing.xl,

    borderWidth: 1,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
    backgroundColor: Colors.neutrals.light,
  },
  fundingPicture: {
    flex: 1,
    height: 300,
    borderRadius: Styles.borderRadius.xs,
    borderWidth: 1,
    borderColor: Colors.neutrals.black,
  },
  fundTitleText: {
    marginTop: Styles.spacing.sm,
    fontSize: Styles.typography.fontSize.xxxl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  dateText: {
    marginTop: Styles.spacing.xxxl,
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.black,
  },
  subtitle: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  description: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.neutrals.black,
  },
  moreDetails: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  footerButtons: {
    flexDirection: "row",
    gap: Styles.spacing.xl,
  },
});
