import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";
import { FundingInfoCard } from "@/components/layout/FundingInfoCard";
import { InfoContainer } from "@/components/layout/InfoContainer";
import { Styles } from "@/assets/constants/Styles";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { DonationsHistory } from "@/components/layout/DonationHistory/DonationsHistory";
import { MIN_WIDTH } from "@/assets/constants/Constants";

export default function FundingDetailsScreen() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FundingInfoCard
          title={"Help Build a Community Playground for Children"}
          closeDate={"10th July 2024"}
          tags={["funding now", "guatemala"]}
          percentageRaised={50}
          description={
            "Join us in empowering the young minds of Panajachel, Guatemala! We're raising funds to provide 200 school backpacks, filled with essential supplies, to support the education and dreams of these vibrant children."
          }
        />

        <View style={styles.rightColumn}>
          <View style={styles.infoContainers}>
            <InfoContainer
              title={"How to support"}
              image={require("@/assets/images/backpack-green.png")}
              children={<Text style={styles.textOne}>1 Backpack = $20.00</Text>}
            />
            <InfoContainer
              title={"How it works"}
              image={require("@/assets/images/guatemala-happy-kids.jpg")}
              children={
                <Text style={styles.textTwo}>
                  Choose your favorite NFT Market Place (Zora or Solanart)
                </Text>
              }
            />
          </View>
          <DonationsHistory />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: Styles.spacing.xxxxl,
    flexWrap: "wrap",
  },
  rightColumn: {
    flex: 1,
    width: "60%",
    minWidth: MIN_WIDTH,
    justifyContent: "flex-start",
    gap: Styles.spacing.xxxxl,
  },
  infoContainers: {
    minWidth: MIN_WIDTH,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Styles.spacing.xxxl,
    // flex: 1,
    flexWrap: "wrap",
    // backgroundColor: "green",
  },
  textOne: {
    paddingHorizontal: Styles.spacing.xl,
    paddingVertical: Styles.spacing.xs,
    backgroundColor: Colors.principal.light,
    borderRadius: Styles.borderRadius.sm,

    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.medium,
    color: Colors.neutrals.black,
  },
  textTwo: {
    fontSize: Styles.typography.fontSize.md,
    fontWeight: Styles.typography.fontWeight.normal,
    color: Colors.neutrals.black,
    flexWrap: "wrap",
    textAlign: "left",
  },
});
