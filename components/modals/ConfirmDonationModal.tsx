import { Image, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { TextSF } from "@/components/ui/TextSF";

interface ModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onClose: () => void;
}

export const ConfirmDonationModal: React.FC<ModalProps> = ({
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
        <Image
          style={styles.image}
          source={require("@/assets/images/color-gears-gop.png")}
        />
        <TextSF style={styles.modalTitle}>Thanks for your donation!</TextSF>
        <TextSF style={styles.description}>
          You will receive an NFT in appreciation of your donation, and a new
          NFT will be dropped in you wallet once the project has been completed
          so you can see the results.
        </TextSF>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexShrink: 1,
    gap: Styles.spacing.md,
    alignItems: "center",
    marginBottom: Styles.spacing.xxxxl,
  },
  image: {
    width: 400,
    // height: 200,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: Styles.typography.fontSize.xxl,
    fontWeight: Styles.typography.fontWeight.extraBold,
  },
  description: {
    maxWidth: 370,
    fontSize: Styles.typography.fontSize.md,
    textAlign: "center",
  },
});
