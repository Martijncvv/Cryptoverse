import React from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export const BottomCenterInfo = ({ text, token }) => {
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;

  const handleOpenURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
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
      marginTop: 4,
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
      fontSize: isMobileView ? 14 : 16,
      fontWeight: "bold",
    },
    infoText: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 14,
    },
    linkText: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 14,
      fontStyle: "italic",
      textDecorationLine: "underline",
    },
    footerText: {
      color: "#ffffff",
      fontSize: isMobileView ? 12 : 14,
      fontStyle: "italic",
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>
        {text ? text : `${token} Txs Explorer`}
      </Text>
      <View style={styles.extensions}>
        <Text style={styles.infoText}>Check out my chrome extensions</Text>
        <Pressable
          onPress={() =>
            handleOpenURL(
              "https://chromewebstore.google.com/detail/crypto-portfolio-blockcha/pkaheoacmbdgnemgmcdbekniooabcnmc?hl=en&authuser=0",
            )
          }
        >
          <Text style={styles.linkText}>Crypto Explorer Extension</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            handleOpenURL(
              "https://chromewebstore.google.com/detail/crypto-eth-networks-gas-a/kfjlhggepmmogkekamknhcnkpphafklp?hl=en&authuser=0",
            )
          }
        >
          <Text style={styles.linkText}>Network Gas Fee Tracker</Text>
        </Pressable>
      </View>
      <Text style={styles.footerText}>
        Big thanks to Etherscan for the free API
      </Text>
      <View style={styles.socials}>
        <Pressable
          onPress={() => handleOpenURL("https://twitter.com/Marty_cfly")}
        >
          <Text style={styles.infoText}>X: @Marty_cfly</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpenURL("https://warpcast.com/martycfly")}
        >
          <Text style={styles.infoText}>W: @Martycfly</Text>
        </Pressable>
        <Pressable
          onPress={() => handleOpenURL("https://www.base.org/name/martijn")}
        >
          <Text style={styles.infoText}>Ξ Martijn.Base.ETH</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BottomCenterInfo;
