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

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { width: windowWidth } = useWindowDimensions();

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

  if (windowWidth > 100 && windowWidth < 724) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
              drawerContent={() => <CustomDrawerContent />}
              screenOptions={{
                drawerType: "front",
                drawerStyle: {
                  maxWidth: 300,
                },
                drawerPosition: "right",
                headerShown: true,
                header: ({ navigation }) => {
                  return (
                    <View style={styles.header}>
                      <View style={styles.headerLeft}>
                        <Image
                          source={require("@/assets/images/senda-logo.png")}
                          style={styles.logo}
                        />
                      </View>
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
                name=""
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
    );
  }

  return (
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
          <Stack.Screen
            name="FundingDetailsScreen"
            options={{
              title: "FundingDetailsScreen",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </WagmiProvider>
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
        {["HomeScreen", "FundingDetailsScreen"].map((screen, index) => (
          <Pressable
            key={index}
            style={styles.drawerItem}
            onPress={() => router.push(screen)}
          >
            <Ionicons
              name={getIconName(screen)}
              size={24}
              color={Colors.principal.default}
            />
            <TextSF style={styles.drawerItemText}>{screen}</TextSF>
          </Pressable>
        ))}
        <AccountField />
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
    flex: 1,
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
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
  drawerBody: {
    flex: 1,
    gap: Styles.spacing.md,
    paddingTop: Styles.spacing.lg,
    paddingHorizontal: Styles.spacing.md,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemText: {
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
