import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export const BottomCenterInfo = ({ text, token }) => {
  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>
        {text ? text : `${token} Txs Explorer`}
      </Text>
      <View style={styles.socials}>
        <Pressable
          onPress={() => handleOpenURL("https://twitter.com/Marty_cfly")}
        >
          <Text style={styles.tagText}>X: @Marty_cfly</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpenURL("https://warpcast.com/martycfly")}
        >
          <Text style={styles.tagText}>W: @Martycfly</Text>
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
          <Text style={styles.tagText}>- Crypto Explorer Chrome Extension</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            handleOpenURL(
              "https://chromewebstore.google.com/detail/crypto-eth-networks-gas-a/kfjlhggepmmogkekamknhcnkpphafklp?hl=en&authuser=0",
            )
          }
        >
          <Text style={styles.tagText}>- Network Gas Fee Tracker</Text>
        </Pressable>
      </View>
      <Text style={styles.footerText}>
        Big thanks to Etherscan for the free API
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    gap: 4,
  },
  socials: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  extensions: {
    flex: 1,
    marginTop: 4,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
  },
  nameText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tagText: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  footerText: {
    color: "#ffffff",
    fontStyle: "italic",
    marginTop: 4,
  },
});

export default BottomCenterInfo;
