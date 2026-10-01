import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";

export default function WebsiteScreen(): React.JSX.Element {
  // State to track if the web view has completed its initial render paint
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const LoadingIndicatorView = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="#fff" size="large" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "gutznshell.com",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 16,
          },
        }}
      />

      <WebView
        source={{ uri: "https://gutznshell.com" }}
        originWhitelist={["*"]}
        // FIX 1: Keeps the webview invisible (opacity 0) while it boots up,
        // preventing the white rendering engine canvas from ever flashing on screen.
        style={[styles.webview, { opacity: isLoaded ? 1 : 0 }]}
        // FIX 2: Forces the immediate underlying wrapper frame layer to stay pitch black
        containerStyle={styles.webviewContainer}
        startInLoadingState={true}
        renderLoading={LoadingIndicatorView}
        // Triggers once the first layout page finishes painting pixels
        onLoadEnd={() => setIsLoaded(true)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000000", // Forces the internal browser engine canvas black
  },
  webviewContainer: {
    backgroundColor: "#000000", // Forces the external native layout box black
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
});
