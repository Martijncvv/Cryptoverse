import { StyleSheet, useWindowDimensions, View } from "react-native";
import { HeroContainer } from "@/components/layout/HeroContainer";
import { FundCardsWrapper } from "@/components/wrapper/FundCardsWrapper";
import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";
import { Cloud } from "@/components/ui/Cloud";

export default function Index() {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const width = windowWidth * 0.2;
  const cloudSize = windowWidth * (1080 / windowWidth);
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
          size={cloudSize * 0.2}
          speed={15}
          startPosition={0}
          topOffset={"0%"}
          direction="right"
        />
        <Cloud
          size={cloudSize * 0.4}
          speed={15}
          startPosition={cloudSize * 0.8}
          topOffset={"5%"}
          direction="left"
        />
        <Cloud
          size={cloudSize * 0.2}
          speed={10}
          startPosition={-200}
          topOffset={"20%"}
          direction="right"
        />
        <Cloud
          size={cloudSize * 0.2}
          speed={12}
          startPosition={200}
          topOffset={"45%"}
          direction="right"
        />
        <Cloud
          size={cloudSize * 0.5}
          speed={15}
          startPosition={cloudSize * 0.3}
          topOffset={"70%"}
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
