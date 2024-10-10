import { StyleSheet, useWindowDimensions, View } from "react-native";
import { FundCard } from "@/components/layout/FundCard/FundCard";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";

export const FundCardsWrapper = () => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: isMobileView ? 0 : 72,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: Styles.spacing.xxxl,
    },
  });
  return (
    <View style={styles.container}>
      <FundCard
        title={"Help Build a Community Playground"}
        closeDate={"10th July 2024"}
        tags={["funding now", "guatemala"]}
        minDonation={25}
        percentageRaised={50}
        onPress={() => router.push("FundingDetailsScreen")}
      />

      <FundCard
        title={"Aid for Earthquake Victims in the City"}
        closeDate={"5th August 2024"}
        tags={["funding now", "guatemala"]}
        minDonation={30}
        percentageRaised={80}
        onPress={() => router.push("FundingDetailsScreen")}
      />

      {/*<FundCardPlaceholder />*/}
    </View>
  );
};
