import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import React from "react";

// Define your uniform color theme
const THEME_COLOR = "#000000";

const CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: THEME_COLOR,
    card: THEME_COLOR,
  },
};

export default function RootLayout(): React.JSX.Element {
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
          name="card"
          options={{
            title: "BUSINESS CARD",
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="seat-repair"
          options={{
            title: "Seat Repair",
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#000000" },
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
