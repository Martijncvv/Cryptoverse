import { ScreenWrapper } from "@/components/wrapper/ScreenWrapper";
import { StyleSheet, View } from "react-native";
import { WalletComponents } from "@/components/onchain/WalletWrapper";
import { OnchainProviders } from "@/components/onchain/OnchainProviders";
import "@coinbase/onchainkit/src/styles.css";

const debugPremintProps = {
  contractName: "Pixel Seasons",
  contractURI: "ipfs://QmYjwarNweXhQAfu3phirz8vwnwFEqo5t8m3xt3HWpFd8N",
  tokenURI: "ipfs://QmXr9NuvX9afZhHTpd2jRgFHbVnaWPKD315AtnTT6H67hz",
  maxSupply: 1000n,
  maxTokensPerAddress: 5n,
  mintStart: 0n,
  mintDuration: 0n,
  pricePerToken: 0n,
};

const COLLECTION_ADDRESS: string = "0x772e26af969ccfc761dceb72aec7a5dde6ead081";
const uid: number = 2;

export default function MinterScreen() {
  return (
    <OnchainProviders>
      <ScreenWrapper>
        <View style={styles.container}></View>
        <WalletComponents />
      </ScreenWrapper>
    </OnchainProviders>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "blue",
  },
});
