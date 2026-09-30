import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerTintColor: "#b4b9be",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* 1. Home Screen (Matches your index file) */}
      <Stack.Screen name="index" options={{ title: "GUTZ N SHELL" }} />

      {/* 2. Services Screen - Custom Fade */}
      <Stack.Screen
        name="services"
        options={{
          title: "../../assets/images/our-services.png",
          animation: "fade", // Smooth opacity transition
        }}
      />

      {/* 3. Estimate Request Screen - Custom Flip */}
      <Stack.Screen
        name="estimate"
        options={{
          title: "estimate",
          animation: "fade", // Smooth opacity transition
        }}
      />
    </Stack>
  );
}
