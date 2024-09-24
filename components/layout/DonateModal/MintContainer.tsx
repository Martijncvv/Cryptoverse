import { Pressable, StyleSheet, Text, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { CardContainer } from "@/components/layout/CardContainer";
import { SubTitle } from "@/components/ui/SubTitle";
import { ButtonSF } from "@/components/form/ButtonSF";
import { TextSF } from "@/components/ui/TextSF";

interface MintContainerProps {}

export const MintContainer: React.FC<MintContainerProps> = ({}) => {
  return (
    <CardContainer gap={Styles.spacing.xl}>
      <View>
        <SubTitle text={"Select amount of donation package"} />
        <Text style={styles.subTitle}>Total includes transaction fees</Text>
      </View>
      <View style={styles.donationOptionsField}>
        <Pressable style={styles.donationOptionBox}>
          <TextSF style={styles.donationOptionText}>1</TextSF>
        </Pressable>
        <Pressable style={styles.donationOptionBox}>
          <TextSF style={styles.donationOptionText}>2</TextSF>
        </Pressable>
        <Pressable style={styles.donationOptionBox}>
          <TextSF style={styles.donationOptionText}>3</TextSF>
        </Pressable>
      </View>
      <View style={styles.totalField}>
        <TextSF style={styles.totalLabel}>Total value</TextSF>
        <TextSF style={styles.totalValue}>0.012 ETH</TextSF>
      </View>
      <ButtonSF text="Mint" onPress={() => console.log("Mint")} />
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: Styles.typography.fontSize.xs,
    color: Colors.neutrals.dark,
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
});
