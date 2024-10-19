import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { MenuItem } from "@/components/layout/HeaderMenu/MenuItem";
import { Styles } from "@/assets/constants/Styles";
import { useRouter } from "expo-router";
import { AccountField } from "@/components/onchain/AccountField";
import { Colors } from "@/assets/constants/Colors";
import { useEffect, useRef } from "react";

export const HeaderMenu = () => {
  const { width: windowWidth } = useWindowDimensions();
  const flickerAnimation = useRef(new Animated.Value(1)).current;

  const isMobileView = windowWidth < 724;
  if (isMobileView) {
    return null;
  }

  useEffect(() => {
    const flickerSequence = Animated.sequence([
      Animated.timing(flickerAnimation, {
        toValue: 0.1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(flickerAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(flickerSequence).start();

    return () => flickerAnimation.stopAnimation();
  }, []);

  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      height: 72,
      paddingHorizontal: 40,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: Styles.spacing.xxxxl,

      borderBottomWidth: 0.5,
      borderColor: Colors.base.black,
      backgroundColor: Colors.base.white,
    },

    sendaLogo: {
      flexDirection: "row",
      flexBasis: isMobileView ? "100%" : 50,
      resizeMode: "contain",
    },
    donateNowField: {
      flexDirection: "row",
      marginLeft: Styles.spacing.xl,
      marginRight: "auto",
      flexBasis: isMobileView ? "100%" : 50,
      resizeMode: "contain",
    },
    walletField: {
      height: 50,
      width: 50,
      flexShrink: 1,
      borderRadius: 20,
    },
    avatar: {
      width: 20,
      height: 20,
      borderRadius: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("")} style={styles.sendaLogo}>
        <Image source={require("@/assets/images/senda-logo.png")} />
      </Pressable>
      <Animated.View
        style={[styles.donateNowField, { opacity: flickerAnimation }]}
      >
        <Image source={require("@/assets/images/donate-now-label.png")} />
      </Animated.View>
      <MenuItem
        text="Fundraisings Results"
        onPress={() => router.push("FundingDetailsScreen")}
      />
      <MenuItem
        text="About Us"
        onPress={() => router.push("FundingDetailsScreen")}
      />

      <AccountField />
    </View>
  );
};
