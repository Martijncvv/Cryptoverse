import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { ProgressBar } from "@/components/layout/FundCard/ProgressBar";
import { ButtonSF } from "@/components/form/ButtonSF";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabOptions, Tag } from "@/components/ui/Tag";

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
      <Text style={styles.fundTitleText}>{title}</Text>
      <Text style={styles.dateText}>Close Date: {closeDate}</Text>
      <View style={styles.progressBarWrapper}>
        <ProgressBar progressPercentage={percentageRaised} />
      </View>
      <Text style={styles.subtitle}>About the cause</Text>
      <Text style={styles.description}>{description}</Text>
      <Pressable style={styles.moreDetailsButton}>
        <Text style={styles.moreDetailsText}>More details</Text>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={16}
          color={Colors.neutrals.black}
        />
      </Pressable>
      <View style={styles.footerButtons}>
        <ButtonSF text="See Cause" onPress={() => console.log("Donate")} />
        <ButtonSF
          text="Share"
          color={"whiteOutlined"}
          onPress={() => console.log("Donate")}
          icon={"share-social-outline"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 500,
    padding: Styles.spacing.xl,

    borderWidth: 1,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
    backgroundColor: Colors.neutrals.light,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    overflow: "hidden",
    borderRadius: Styles.borderRadius.xs,
    borderWidth: 1,
    borderColor: Colors.neutrals.black,

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
    fontSize: Styles.typography.fontSize.xxxl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
    marginBottom: Styles.spacing.xl,
  },
  dateText: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.black,
    marginBottom: Styles.spacing.xs,
  },
  progressBarWrapper: {
    height: 40,
    marginBottom: Styles.spacing.xl,
  },
  subtitle: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
    marginBottom: Styles.spacing.lg,
  },
  description: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.neutrals.black,
    marginBottom: Styles.spacing.sm,
  },
  moreDetailsButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Styles.spacing.xs,
    marginBottom: Styles.spacing.xxxl,
  },
  moreDetailsText: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  footerButtons: {
    flexDirection: "row",
    gap: Styles.spacing.xl,
  },
});
