import { StyleSheet, View } from "react-native";
import { Colors } from "@/assets/constants/Colors";
import { HeaderMenu } from "@/components/HeaderMenu";
import { HeroContainer } from "@/components/HeroContainer";
import { FundCardsWrapper } from "@/components/wrapper/FundCardsWrapper";

export default function Index() {
  return (
    <View style={styles.container}>
      <HeaderMenu />
      <HeroContainer />
      <FundCardsWrapper />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: Colors.neutrals.white,
  },
});
