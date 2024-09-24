import { Image, StyleSheet, View } from "react-native";
import { Styles } from "@/assets/constants/Styles";
import { Colors } from "@/assets/constants/Colors";
import { SubTitle } from "@/components/ui/SubTitle";
import { CopyableText } from "@/components/ui/CopyableText";
import { CardContainer } from "@/components/layout/CardContainer";
import { TextSF } from "@/components/ui/TextSF";

interface CustomDonationCardProps {}

export const CustomDonationCard: React.FC<CustomDonationCardProps> = ({}) => {
  const formatAddress = (text: string) => {
    return text.slice(0, 4) + "...." + text.slice(-4);
  };

  return (
    <CardContainer gap={Styles.spacing.xl}>
      <View>
        <SubTitle text={"Direct deposit"} />
        <TextSF style={styles.subTitle}>Want to give your own amount?</TextSF>
      </View>
      <View style={styles.addressesField}>
        <CopyableText
          text={formatAddress("0x8DD8cC8D942C40679D84A6C0476279DB0d12016a")}
        />
        <CopyableText text="Sendafund.eth" />
      </View>
      <View style={styles.acceptedTokensField}>
        <TextSF style={styles.subTitle}>Please consider sending only</TextSF>
        <Image
          style={styles.tokenIcon}
          source={require("@/assets/images/ethereum-eth-logo.png")}
        />
        <Image
          style={styles.tokenIcon}
          source={require("@/assets/images/usd-coin-usdc-logo.png")}
        />
        <Image
          style={styles.tokenIcon}
          source={require("@/assets/images/tether-usdt-logo.png")}
        />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: Styles.typography.fontSize.xs,
    color: Colors.neutrals.dark,
  },
  addressesField: {
    flexDirection: "row",
    gap: Styles.spacing.xxxl,
  },
  acceptedTokensField: {
    flexDirection: "row",
    alignItems: "center",
    gap: Styles.spacing.sm,
  },
  tokenIcon: {
    height: 16,
  },
});
