import { StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { CustomDonationCard } from "@/components/layout/DonateModal/CustomDonationCard";
import { MintContainer } from "@/components/layout/DonateModal/MintContainer";
import { TextSF } from "@/components/ui/TextSF";
import { AccountField } from "@/components/onchain/AccountField";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onClose: () => void;
}

export const DonateModal: React.FC<ModalProps> = ({
  modalVisible,
  setModalVisible,
  onClose,
}) => {
  return (
    <ModalWrapper
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onClose={onClose}
    >
      <View style={styles.contentContainer}>
        <TextSF style={styles.modalTitle}>Choose your preferred method</TextSF>
        <AccountField hasLogoutIcon={false} />
        <MintContainer />
        <CustomDonationCard />
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
  },
  contentContainer: {
    flex: 1,
    gap: Styles.spacing.lg,
  },
});
