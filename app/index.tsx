import { StyleSheet, useWindowDimensions, View } from "react-native";
import { HeroContainer } from "@/components/layout/HeroContainer";
import { FundCardsWrapper } from "@/components/wrapper/FundCardsWrapper";
import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";
import { Cloud } from "@/components/ui/Cloud";

export default function Index() {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const width = windowWidth * 0.2;
  console.log("width", width);
  return (
    <ScreenWrapper
      customStyles={{
        contentContainer: isMobileView
          ? {}
          : {
              paddingBottom: 0,
              paddingHorizontal: 0,
              paddingTop: 0,
            },
      }}
    >
      <View style={styles.outerContainer}>
        <HeroContainer />
        <FundCardsWrapper />

        <Cloud
          size={windowWidth * 0.2}
          speed={15}
          startPosition={0}
          topOffset={"0%"}
          direction="right"
        />
        <Cloud
          size={windowWidth * 0.2}
          speed={10}
          startPosition={-200}
          topOffset={"40%"}
          direction="right"
        />
        <Cloud
          size={windowWidth * 0.4}
          speed={15}
          startPosition={windowWidth * 0.8}
          topOffset={"20%"}
          direction="left"
        />
        <Cloud
          size={windowWidth * 0.5}
          speed={15}
          startPosition={windowWidth * 0.3}
          topOffset={"80%"}
          direction="left"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
  },
  cloudContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});
