import { Tabs, useRouter } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Styles } from "@/assets/constants/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/assets/constants/Colors";

const CustomDrawerContent = () => {
  const router = useRouter();
  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>SendaFund</Text>
      </View>
      <View style={styles.drawerBody}>
        {["index", "FundingDetailsScreen", "MinterScreen"].map(
          (screen, index, drawerLabel) => (
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
              <Text style={styles.drawerItemText}>{screen}</Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
};

const getIconName = (screenName: string) => {
  switch (screenName) {
    case "index":
      return "home-outline";
    case "FundingDetailsScreen":
      return "cash-outline";
    case "MinterScreen":
      return "wallet-outline";
    default:
      return "document-outline";
  }
};

export default function TabLayout() {
  const { width: windowWidth } = useWindowDimensions();

  if (windowWidth < 724) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent />}
          screenOptions={{
            drawerType: "front",
            drawerStyle: {
              maxWidth: 300,
            },
            drawerPosition: "right",
            headerShown: true,
            header: ({ navigation, route, options }) => {
              return (
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Image
                      source={require("@/assets/images/react-logo.png")}
                      style={styles.logo}
                    />
                  </View>
                  <View style={styles.headerRight}>
                    <Pressable onPress={() => navigation.toggleDrawer()}>
                      <Ionicons
                        name="menu"
                        size={24}
                        color={Colors.neutrals.black}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="FundingDetailsScreen"
            options={{
              drawerLabel: "Funding Details",
              title: "Funding Details",
            }}
          />
          <Drawer.Screen
            name="MinterPageScreen"
            options={{
              drawerLabel: "Minter Page",
              title: "Minter Page",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HomeScreen",
        }}
      />
      <Tabs.Screen
        name="FundingDetailsScreen"
        options={{
          title: "FundingDetailsScreen",
        }}
      />
      <Tabs.Screen
        name="MinterScreen"
        options={{
          title: "MinterScreen",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: Colors.neutrals.white,
  },
  drawerHeader: {
    padding: Styles.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals.white,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: Styles.spacing.md,
  },
  drawerTitle: {
    fontSize: Styles.typography.fontSize.xl,
    fontWeight: Styles.typography.fontWeight.bold,
    color: Colors.principal.default,
  },
  drawerBody: {
    flex: 1,
    paddingTop: Styles.spacing.lg,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Styles.spacing.md,
  },
  drawerItemText: {
    marginLeft: Styles.spacing.md,
    fontSize: Styles.typography.fontSize.md,
    color: Colors.neutrals.black,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Styles.spacing.md,
    backgroundColor: Colors.neutrals.white,
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
