import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React, { useEffect } from "react";
import { Platform } from "react-native";

// Define your master color variable here so everything syncs perfectly
const THEME_COLOR = "#6f90ba";

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: THEME_COLOR,
    card: THEME_COLOR,
  },
};

export default function RootLayout(): React.JSX.Element {
  // Use an effect block so native system hooks only run safely on phones
  useEffect(() => {
    if (Platform.OS !== "web") {
      SystemUI.setBackgroundColorAsync(THEME_COLOR).catch((err) =>
        console.log("SystemUI not supported on this platform context", err),
      );
    }
  }, []);

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          animationDuration: 250,
          contentStyle: { backgroundColor: THEME_COLOR },
          headerStyle: {
            backgroundColor: THEME_COLOR,
          },
          headerTintColor: "#b4b9be",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "GUTZ N SHELL" }} />

        <Stack.Screen
          name="seat-repair"
          options={{
            title: "Seat Repair",
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="estimate"
          options={{
            title: "Estimate",
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="services"
          options={{
            title: "Our Services",
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="website"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: THEME_COLOR },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
