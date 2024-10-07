import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Styles } from "@/assets/constants/Styles";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { BoxedText } from "@/components/ui/BoxedText";
import { CustomDonationCard } from "@/components/layout/DonateModal/CustomDonationCard";
import { MintContainer } from "@/components/layout/DonateModal/MintContainer";
import { TextSF } from "@/components/ui/TextSF";

export default function DonateModal() {
  const closeModal = () => {
    router.back();
  };

  return (
    <ModalWrapper onBackPress={closeModal}>
      <View style={styles.contentContainer}>
        <TextSF style={styles.modalTitle}>Choose your preferred method</TextSF>
        <BoxedText text="1 Backpack = $20.00" />

        <MintContainer />
        <CustomDonationCard />
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
  },
  contentContainer: {
    flexShrink: 1,
    gap: Styles.spacing.lg,
  },
});
