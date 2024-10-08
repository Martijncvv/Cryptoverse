import { useFonts } from "expo-font";
import { ErrorBoundaryProps, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http } from "@wagmi/core";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { WagmiProvider } from "wagmi";
import { base } from "viem/chains";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/assets/constants/Colors";
import { Styles } from "@/assets/constants/Styles";
import { TextSF } from "@/components/ui/TextSF";
import { ToastProvider } from "@/hooks/ToastProvider";
import { AccountField } from "@/components/onchain/AccountField";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{error.message}</Text>
      <Text onPress={retry}>Try Again?</Text>
    </View>
  );
}

// TODO BE ABLE TO SEND NOTIFICATIONS TO THE NFT
export const unstable_settings = {
  initialRouteName: "index",
};

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    coinbaseWallet({ appName: "SendaFund", preference: "smartWalletOnly" }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

// TODO: if on wrong network, header gets reakt

export default function RootLayout() {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const isBurgerMenu = windowWidth < 724;
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

  if (isBurgerMenu) {
    return (
      <ToastProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer
                drawerContent={() => <CustomDrawerContent />}
                screenOptions={{
                  drawerType: "front",
                  drawerPosition: "right",
                  headerShown: true,
                  header: ({ navigation }) => {
                    return (
                      <View style={styles.header}>
                        <Pressable
                          style={styles.headerLeft}
                          onPress={() => router.push("")}
                        >
                          <Image
                            source={require("@/assets/images/senda-logo.png")}
                            style={styles.logo}
                          />
                        </Pressable>
                        <AccountField />
                        <View style={styles.headerRight}>
                          <Pressable onPress={() => navigation.toggleDrawer()}>
                            <Ionicons
                              name="menu"
                              size={24}
                              color={Colors.base.black}
                            />
                          </Pressable>
                        </View>
                      </View>
                    );
                  },
                }}
              >
                <Drawer.Screen
                  name="HomeScreen"
                  options={{
                    title: "Home",
                  }}
                />
                <Drawer.Screen
                  name="FundingDetailsScreen"
                  options={{
                    title: "Funding Details",
                  }}
                />
              </Drawer>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </WagmiProvider>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
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
            <Stack.Screen
              name="FundingDetailsScreen"
              options={{
                title: "FundingDetailsScreen",
              }}
            />
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
    </ToastProvider>
  );
}

const CustomDrawerContent = () => {
  const router = useRouter();
  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <TextSF style={styles.drawerTitle}>SendaFund</TextSF>
      </View>
      <View style={styles.drawerBody}>
        <Pressable style={styles.drawerItem} onPress={() => router.push("")}>
          <Ionicons
            name={getIconName("HomeScreen")}
            size={24}
            color={Colors.principal.default}
          />
          <TextSF style={styles.drawerItemText}>{"HomeScreen"}</TextSF>
        </Pressable>
        <Pressable
          style={styles.drawerItem}
          onPress={() => router.push("FundingDetailsScreen")}
        >
          <Ionicons
            name={getIconName("FundingDetailsScreen")}
            size={24}
            color={Colors.principal.default}
          />
          <TextSF style={styles.drawerItemText}>
            {"FundingDetailsScreen"}
          </TextSF>
        </Pressable>
      </View>
    </View>
  );
};

const getIconName = (screenName: string) => {
  switch (screenName) {
    case "HomeScreen":
      return "home-outline";
    case "FundingDetailsScreen":
      return "cash-outline";
    default:
      return "document-outline";
  }
};

const styles = StyleSheet.create({
  drawerContent: {
    alignSelf: "flex-start",
    backgroundColor: Colors.base.white,
  },
  drawerHeader: {
    padding: Styles.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.base.white,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: Styles.spacing.md,
  },
  drawerTitle: {
    flexShrink: 1,
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
  drawerBody: {
    flexShrink: 1,
    gap: Styles.spacing.md,
    paddingTop: Styles.spacing.lg,
    paddingHorizontal: Styles.spacing.md,
  },
  drawerItem: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemText: {
    flexShrink: 1,
    marginLeft: Styles.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Styles.spacing.md,
    backgroundColor: Colors.base.white,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Styles.spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.medium,
    borderRadius: Styles.borderRadius.md,
  },
});
