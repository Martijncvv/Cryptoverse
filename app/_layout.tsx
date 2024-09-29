import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http } from "@wagmi/core";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { WagmiProvider } from "wagmi";

const SENDAFUND_PROJECT_ID = "ff8280abe8d88f732eb4946fe6349acc";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [baseSepolia],
  // chains: [base]
  connectors: [
    coinbaseWallet({ appName: "SendaFund", preference: "smartWalletOnly" }),
  ],
  transports: {
    // [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="ProjectDetailsModal"
            options={{
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen
            name="DonateModal"
            options={{
              presentation: "transparentModal",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
