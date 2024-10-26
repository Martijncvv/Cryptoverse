import { Styles } from "@/assets/constants/Styles";
import { StyleSheet } from "react-native";
import React from "react";
import { FadeInView } from "@/components/TestComponent";

export default function TestScreen() {
  return (
    // <ScreenWrapper>
    <FadeInView />
    // </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: Styles.spacing.xxxxl,
    flexWrap: "wrap",
  },
});
