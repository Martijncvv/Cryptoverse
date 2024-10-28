import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import "react-native-reanimated";
import { Text, View } from "react-native";
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

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
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
