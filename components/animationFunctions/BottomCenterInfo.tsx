import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const BottomCenterInfo = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{text ? text : "Built by"}</Text>
      <Text style={styles.tagText}>
        X: @Marty_cfly F @Martycfly Ξ Martijn.Base.ETH
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  nameText: {
    color: "#656363",
    fontSize: 18,
    fontWeight: "bold",
  },
  tagText: {
    color: "#656363",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default BottomCenterInfo;
