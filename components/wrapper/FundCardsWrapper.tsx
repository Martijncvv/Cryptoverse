import { StyleSheet, View } from "react-native";
import { FundCard } from "@/components/layout/FundCard/FundCard";
import { Styles } from "@/assets/constants/Styles";
import { FundCardPlaceholder } from "@/components/layout/FundCard/FundCardPlaceholder";

export const FundCardsWrapper = () => {
  return (
    <View style={styles.container}>
      <FundCard
        title={"Help Build a Community Playground for Children"}
        closeDate={"10th July 2024"}
        tags={["Funding Now", "Guatemala"]}
        minDonation={25}
        percentageRaised={50}
      />

      <FundCard
        title={"Aid for Earthquake Victims in the City"}
        closeDate={"5th August 2024"}
        tags={["Funding Now", "Guatemala"]}
        minDonation={30}
        percentageRaised={80}
      />

      <FundCard
        title={"Support Mental Health Awareness Programs"}
        closeDate={"1st September 2024"}
        tags={["Funding Now", "Guatemala"]}
        minDonation={40}
        percentageRaised={70}
      />

      <FundCard
        title={"Fund Scholarships for Underprivileged Students"}
        closeDate={"20th October 2024"}
        tags={["Funding Now", "Guatemala"]}
        minDonation={50}
        percentageRaised={90}
      />
      <FundCardPlaceholder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    gap: Styles.spacing.xxxl,
  },
});
