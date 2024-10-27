import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ColorLegend = ({ colorRanges }) => {
  return (
    <View style={styles.container}>
      {colorRanges.map((range, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: range.color }]} />
          <Text style={styles.legendText}>
            ${range.range[0]?.toLocaleString()}+
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 10,
    borderRadius: 8,
  },
  legendTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: "#ffffff",
    fontSize: 14,
  },
});

export default ColorLegend;
