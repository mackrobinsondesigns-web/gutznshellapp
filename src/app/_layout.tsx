import React from "react";
import { Stack, ThemeProvider, DarkTheme } from "expo-router";
// 1. IMPORT THE NATIVE SYSTEM ENGINE TOOL
import * as SystemUI from "expo-system-ui";

// 2. RUN THIS IMMEDIATELY OUTSIDE THE COMPONENT (Forces Android/iOS window frame to black)
SystemUI.setBackgroundColorAsync("#000000");

const CustomBlackTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#000000",
  },
};

export default function RootLayout(): React.JSX.Element {
  return (
    <ThemeProvider value={CustomBlackTheme}>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          animationDuration: 250,
          contentStyle: { backgroundColor: "#000000" },
          headerStyle: {
            backgroundColor: "#000000",
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
            contentStyle: { backgroundColor: "#000000" },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
