import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import "react-native-reanimated";
import { createConfig, http } from "@wagmi/core";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { base } from "viem/chains";
import { Text, useWindowDimensions, View } from "react-native";
import * as THREE from "three";

// Ensure THREE is available globally to handle side-effects
global.THREE = global.THREE || THREE;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

// TODO BE ABLE TO SEND NOTIFICATIONS TO THE NFT
export const unstable_settings = {
  initialRouteName: "index",
};

const projectId = "ff8280abe8d88f732eb4946fe6349acc";

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    coinbaseWallet({ appName: "SendaFund", preference: "smartWalletOnly" }),
    walletConnect({ projectId }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

export default function RootLayout() {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        options={{
          title: "HomeScreen",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
