import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export const BottomCenterInfo = ({ text }) => {
  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{text ? text : "Built by"}</Text>
      <View style={styles.socials}>
        <Pressable
          onPress={() => handleOpenURL("https://twitter.com/Marty_cfly")}
        >
          <Text style={styles.tagText}>X: @Marty_cfly</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpenURL("https://twitter.com/Martycfly")}
        >
          <Text style={styles.tagText}>F: @Martycfly</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpenURL("https://www.base.org/name/martijn")}
        >
          <Text style={styles.tagText}>Ξ Martijn.Base.ETH</Text>
        </Pressable>
      </View>
      <View style={styles.extensions}>
        <Text style={styles.tagText}>Check out my crypto extensions:</Text>
        <Pressable
          onPress={() =>
            handleOpenURL(
              "https://chromewebstore.google.com/detail/crypto-portfolio-blockcha/pkaheoacmbdgnemgmcdbekniooabcnmc?hl=en&authuser=0",
            )
          }
        >
          <Text style={styles.tagText}>Crypto Explorer Chrome Extension,</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            handleOpenURL(
              "https://chromewebstore.google.com/detail/crypto-eth-networks-gas-a/kfjlhggepmmogkekamknhcnkpphafklp?hl=en&authuser=0",
            )
          }
        >
          <Text style={styles.tagText}>Network Gas Fee Tracker</Text>
        </Pressable>
      </View>
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
  socials: {
    flexDirection: "row",
    gap: 14,
  },
  extensions: {
    flexDirection: "row",
    gap: 14,
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
