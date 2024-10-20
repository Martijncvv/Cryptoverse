import { ErrorBoundaryProps, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http } from "@wagmi/core";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { WagmiProvider } from "wagmi";
import { base } from "viem/chains";
import { Manrope_400Regular, useFonts } from "@expo-google-fonts/manrope";
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
import { AccountField } from "@/components/onchain/AccountField";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TextSF } from "@/components/ui/TextSF";
import { ToastProvider } from "@/hooks/ToastProvider";
import { ModalProvider } from "@/hooks/ModalProvider";

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

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
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
  const queryClient = new QueryClient();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const isMobileView = windowWidth < 724;
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const NavigationWrapper = ({ children }: { children: any }) => (
    <ToastProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>{children}</ModalProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ToastProvider>
  );

  const CustomDrawerContent = (props: any) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props} scrollEnabled={false}>
          <View style={styles.drawerHeader}>
            <TextSF style={styles.drawerTitle}>SendaFund</TextSF>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  };

  const CustomHeader = ({ navigation }: { navigation: any }) => (
    <View style={styles.header}>
      <Pressable
        style={styles.headerLeft}
        onPress={() => router.push("")}
        hitSlop={20}
      >
        <Image
          source={require("@/assets/images/senda-logo.png")}
          style={styles.logo}
        />
      </Pressable>
      <AccountField />
      <Pressable
        style={styles.hamburgerButton}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons name="menu" size={24} color={Colors.base.black} />
      </Pressable>
    </View>
  );

  if (isMobileView) {
    return (
      <NavigationWrapper>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={CustomDrawerContent}
            screenOptions={{
              drawerType: "front",
              // drawerPosition: "right",
              headerShown: true,
              drawerHideStatusBarOnOpen: true,
              drawerLabelStyle: { marginLeft: -10 },
              header: CustomHeader,
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                title: "Home",
                drawerLabel: "Home",
                drawerIcon: () => (
                  <Ionicons
                    name={"home-outline"}
                    size={24}
                    color={Colors.principal.default}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="FundingDetailsScreen"
              options={{
                title: "Funding Details",
                drawerLabel: "Funding Details",
                drawerIcon: () => (
                  <Ionicons
                    name={"cash-outline"}
                    size={24}
                    color={Colors.principal.default}
                  />
                ),
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </NavigationWrapper>
    );
  }

  return (
    <NavigationWrapper>
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
            title: "Fundings",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </NavigationWrapper>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: Styles.spacing.md,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Styles.spacing.md,
    backgroundColor: Colors.base.white,
  },
  headerLeft: {
    flex: 1,
  },
  hamburgerButton: {
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Styles.spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutrals.medium,
    borderRadius: Styles.borderRadius.md,
  },

  drawerHeader: {
    padding: Styles.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.base.white,
  },
  drawerTitle: {
    flexShrink: 1,
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
});
