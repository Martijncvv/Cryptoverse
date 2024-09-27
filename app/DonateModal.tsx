import { StyleSheet, useWindowDimensions, View } from "react-native";
import { router } from "expo-router";
import { Styles } from "@/assets/constants/Styles";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { BoxedText } from "@/components/ui/BoxedText";
import { CustomDonationCard } from "@/components/layout/DonateModal/CustomDonationCard";
import { MintContainer } from "@/components/layout/DonateModal/MintContainer";
import { TextSF } from "@/components/ui/TextSF";
import { MIN_WIDTH } from "@/assets/constants/Constants";

export default function DonateModal() {
  const { width: windowWidth } = useWindowDimensions();

  const closeModal = () => {
    router.back();
  };

  return (
    <ModalWrapper
      onBackPress={closeModal}
      style={{ width: windowWidth > 724 ? "30%" : "100%", minWidth: MIN_WIDTH }}
    >
      <View style={styles.contentContainer}>
        <TextSF style={styles.modalTitle}>Choose your preferred method</TextSF>
        <BoxedText text="1 Backpack = $20.00 - 0.012 ETH" />

        <MintContainer />
        <CustomDonationCard />
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: Styles.typography.fontSize.title,
    fontWeight: Styles.typography.fontWeight.bold,
  },
  contentContainer: {
    flex: 1,
    gap: Styles.spacing.lg,
  },
});
