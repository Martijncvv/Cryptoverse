import { Image, StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { ProgressBar } from "@/components/layout/FundCard/ProgressBar";
import { ButtonSF } from "@/components/form/ButtonSF";
import { TabOptions, Tag } from "@/components/ui/Tag";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { router } from "expo-router";
import { MoreDetailsButton } from "@/components/form/MoreDetailsButton";
import { TextSF } from "@/components/ui/TextSF";

interface FundingInfoCardProps {
  title: string;
  closeDate: string;
  tags: TabOptions[];
  percentageRaised: number;
  description: string;
}

export const FundingInfoCard: React.FC<FundingInfoCardProps> = ({
  title,
  closeDate,
  tags,
  percentageRaised,
  description,
}) => {
  const handlePressDetails = () => {
    router.push("ProjectDetailsModal");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageContainerTags}>
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </View>
        <Image
          source={require("@/assets/images/guatemala-happy-kids.jpg")}
          style={styles.fundingPicture}
        />
      </View>
      <TextSF style={styles.fundTitleText}>{title}</TextSF>
      <TextSF style={styles.dateText}>Close Date: {closeDate}</TextSF>
      <View style={styles.progressBarWrapper}>
        <ProgressBar progressPercentage={percentageRaised} />
      </View>
      <TextSF style={styles.subtitle}>About the cause</TextSF>
      <TextSF style={styles.description}>{description}</TextSF>
      <MoreDetailsButton onPress={handlePressDetails} />
      <View style={styles.footerButtons}>
        <ButtonSF
          text="Donate Now"
          onPress={() => router.push("DonateModal")}
        />
        <ButtonSF
          text="Share"
          color={"whiteOutlined"}
          onPress={() => console.log("Donate")}
          icon={"share-social-outline"}
          iconPosition={"post"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    minWidth: MIN_WIDTH,
    maxWidth: 600,
    padding: Styles.spacing.xl,
    flexWrap: "wrap",

    borderWidth: 1,
    borderColor: Colors.base.black,
    borderRadius: Styles.borderRadius.lg,
    backgroundColor: Colors.neutrals.light,
  },
  imageContainer: {
    flexShrink: 1,
    width: "100%",
    aspectRatio: 16 / 9,
    overflow: "hidden",
    borderRadius: Styles.borderRadius.xs,
    borderWidth: 1,
    borderColor: Colors.base.black,

    marginBottom: Styles.spacing.xxl,
  },
  fundingPicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageContainerTags: {
    position: "absolute",
    top: Styles.spacing.xl,
    left: Styles.spacing.xl,
    flexDirection: "row",
    gap: Styles.spacing.sm,
    zIndex: 2,
  },
  fundTitleText: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.bold,
    marginBottom: Styles.spacing.xl,
  },
  dateText: {
    fontSize: Styles.typography.fontSize.xs,
    marginBottom: Styles.spacing.xs,
  },
  progressBarWrapper: {
    height: 40,
    marginBottom: Styles.spacing.xl,
  },
  subtitle: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    marginBottom: Styles.spacing.lg,
  },
  description: {
    marginBottom: Styles.spacing.sm,
  },
  moreDetailsButton: {
    paddingVertical: Styles.spacing.xs,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Styles.spacing.xs,
    marginBottom: Styles.spacing.xxxl,
  },
  moreDetailsText: {
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.dark,
  },
  footerButtons: {
    flexDirection: "row",
    gap: Styles.spacing.xl,
  },
});
