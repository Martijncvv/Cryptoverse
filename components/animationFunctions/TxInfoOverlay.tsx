// TxInfoOverlay.js

import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { addressFormatter } from "@/utils/addressFormatter";

const TxInfoOverlay = ({ clickedStar }) => {
  if (!clickedStar?.userData?.txValue)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click on star for more info</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        From: {addressFormatter(clickedStar.userData.from)}
      </Text>
      <Text style={styles.text}>
        To: {addressFormatter(clickedStar.userData.to)}
      </Text>
      <Text style={styles.text}>
        ${clickedStar.userData.txValue.toLocaleString()}
      </Text>
      <Pressable
        onPress={() => {
          const txHash = clickedStar?.userData?.hash;
          if (txHash) {
            const url = `https://basescan.org/tx/${txHash}`;
            if (Platform.OS === "web") {
              window.open(url, "_blank", "noreferrer");
            } else {
              Linking.openURL(url).catch((err) =>
                console.error("Failed to open URL:", err),
              );
            }
          }
        }}
      >
        <Text style={styles.linkText}>Open Explorer</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  linkText: {
    color: "#ffffff", // Dodger blue for link color
    fontSize: 16,
    textDecorationLine: "underline", // Underline to indicate it's a link
    marginTop: 5,
  },
});

export default TxInfoOverlay;
