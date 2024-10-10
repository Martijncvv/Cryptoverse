import { Image, Platform, Share, StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { ProgressBar } from "@/components/layout/FundCard/ProgressBar";
import { ButtonSF } from "@/components/form/ButtonSF";
import { TabOptions, Tag } from "@/components/ui/Tag";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { MoreDetailsButton } from "@/components/form/MoreDetailsButton";
import { TextSF } from "@/components/ui/TextSF";
import { useModal } from "@/hooks/ModalProvider";

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
  const { openModal } = useModal();

  const handleShare = async () => {
    const shareData = {
      title: `Share: ${title}`,
      text: `Check out this onchain fundraising: ${title}\n\nDonate now to support this cause!`,
      url: window.location.href,
    };

    if (Platform.OS === "web") {
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          console.log("Shared successfully");
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(shareUrl, "_blank");
      }
    } else {
      try {
        const result = await Share.share({
          message: `Check out this fundraising cause: ${title}\n\nClose Date: ${closeDate}\n\n${description}\n\nDonate now to support this cause!`,
          title: `Share: ${title}`,
        });
        if (result.action === Share.sharedAction) {
          console.log(
            result.activityType
              ? `Shared with activity type: ${result.activityType}`
              : "Shared successfully",
          );
        } else if (result.action === Share.dismissedAction) {
          console.log("Share dismissed");
        }
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
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
      <MoreDetailsButton onPress={() => openModal("projectDetails")} />
      <View style={styles.footerButtons}>
        <ButtonSF text="Donate Now" onPress={() => openModal("donateModal")} />
        <ButtonSF
          text="Share"
          color={"whiteOutlined"}
          onPress={handleShare}
          icon={"share-social-outline"}
          iconPosition={"pre"}
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
