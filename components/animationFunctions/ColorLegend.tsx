import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { COLOR_RANGES } from "@/components/animationFunctions/getColorByTxValue";

const ColorLegend = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: isMobileView ? 4 : 10,
      left: isMobileView ? 4 : 10,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      padding: 10,
      borderRadius: 8,
    },
    legendTitle: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    colorBox: {
      width: isMobileView ? 16 : 20,
      height: isMobileView ? 16 : 20,
      borderRadius: 4,
      marginRight: 8,
    },
    legendText: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 14,
    },
  });

  return (
    <View style={styles.container}>
      {COLOR_RANGES.map((range, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: range.color }]} />
          <Text style={styles.legendText}>{range.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default ColorLegend;
