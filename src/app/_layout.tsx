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
    />
  );
}
