// TxInfoOverlay.js

import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { addressFormatter } from "@/utils/addressFormatter";

const TxInfoOverlay = ({ clickedStar }) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: isMobileView ? 4 : 10,
      right: isMobileView ? 4 : 10,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      padding: 10,
      borderRadius: 8,
    },
    text: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 16,
      textAlign: "right",
    },
    linkText: {
      color: "#ffffff", // Dodger blue for link color
      fontSize: isMobileView ? 12 : 16,
      textDecorationLine: "underline",
      marginTop: 5,
    },
  });

  if (!clickedStar?.userData?.txValue)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click on star for details</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {new Date(parseInt(clickedStar.userData.timeStamp) * 1000)
          .toLocaleString("en-US", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "")}
      </Text>
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
        <Text style={styles.linkText}>Open BaseScan</Text>
      </Pressable>
    </View>
  );
};

export default TxInfoOverlay;
