import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { MIN_WIDTH } from "@/assets/constants/Constants";
import { ModalWrapper } from "@/components/wrapper/ModalWrapper";
import { BoxedText } from "@/components/ui/BoxedText";
import { SubTitle } from "@/components/ui/SubTitle";
import { ButtonSF } from "@/components/form/ButtonSF";

export default function DonateModal() {
  const { width: windowWidth } = useWindowDimensions();

  const closeModal = () => {
    router.back();
  };

  return (
    <ModalWrapper onBackPress={closeModal}>
      <View style={styles.contentContainer}>
        <Text style={styles.modalTitle}>Choose your preferred method</Text>
        <BoxedText text="1 Backpack = $20.00 - 0.012 ETH" />

        <View style={styles.cardContainer}>
          <SubTitle text={"Select amount of donation package"} />
          <Text>Total includes transaction fees</Text>
          <View style={styles.donationOptionsField}>
            <Pressable style={styles.donationOptionBox}>
              <Text style={styles.donationOptionText}>1</Text>
            </Pressable>
            <Pressable style={styles.donationOptionBox}>
              <Text style={styles.donationOptionText}>2</Text>
            </Pressable>
            <Pressable style={styles.donationOptionBox}>
              <Text style={styles.donationOptionText}>3</Text>
            </Pressable>
          </View>
          <View style={styles.totalField}>
            <Text style={styles.totalLabel}>Total value</Text>
            <Text style={styles.totalValue}>0.012 ETH</Text>
          </View>
          <ButtonSF text="Mint" onPress={() => console.log("Mint")} />
        </View>
        <View style={styles.cardContainer}>
          <SubTitle text={"Direct deposit"} />
          <Text>Want to give your own amount?</Text>
        </View>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  totalField: {
    paddingVertical: Styles.spacing.xxs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.dark,
  },
  totalValue: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
  cardContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.neutrals.black,
    borderRadius: Styles.borderRadius.lg,
    padding: Styles.spacing.xl,
  },

  donationOptionsField: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Styles.spacing.sm,
  },

  donationOptionBox: {
    flexBasis: "30%",
    paddingVertical: Styles.spacing.xl,

    borderRadius: Styles.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.principal.light,
    backgroundColor: "#E6F1FC", // todo
  },
  donationOptionText: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    textAlign: "center",
  },

  ///
  modalTitle: {
    fontSize: Styles.typography.fontSize.title,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.neutrals.black,
  },
  contentContainer: {
    flex: 1,
    // gap: Styles.spacing.xxl,
  },
  column: {
    flex: 1,
    minWidth: MIN_WIDTH,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: Styles.spacing.xxl,
  },
  labelsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Styles.spacing.xl,
  },
  projectDescription: {
    width: "100%",
    flexWrap: "wrap",
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
  },
});
