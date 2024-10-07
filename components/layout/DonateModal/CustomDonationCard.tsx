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
          copyText="0x8DD8cC8D942C40679D84A6C0476279DB0d12016a"
        />
        <CopyableText text="Sendafund.eth" />
      </View>
      <View style={styles.acceptedTokensField}>
        <TextSF style={styles.subTitle}>Please consider sending only</TextSF>
        <View style={styles.tokenContainer}>
          <Image
            style={styles.tokenIcon}
            source={require("@/assets/images/networks/ethereum-chain-logo.png")}
          />
        </View>
        <View style={styles.tokenContainer}>
          <Image
            style={styles.tokenIcon}
            source={require("@/assets/images/coins/usdc-coin-logo.png")}
          />
        </View>
        <View style={styles.tokenContainer}>
          <Image
            style={styles.tokenIcon}
            source={require("@/assets/images/coins/tether-coin-logo.png")}
          />
        </View>
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: Styles.typography.fontSize.xs,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.dark,
    marginRight: Styles.spacing.xxs,
  },
  addressesField: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  acceptedTokensField: {
    flexDirection: "row",
    alignItems: "center",
    gap: Styles.spacing.sm,
  },
  tokenContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: Colors.neutrals.default,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tokenIcon: {
    height: 12,
    resizeMode: "center",
  },
});
