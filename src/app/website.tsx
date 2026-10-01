import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, Platform } from "react-native"; // Added Platform
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";

export default function WebsiteScreen(): React.JSX.Element {
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

      {/* Conditionally renders an iframe on Web browsers or a WebView on Native Devices */}
      {Platform.OS === "web" ? (
        <View style={styles.webviewContainer}>
          <iframe
            src="https://gutznshell.com"
            style={{
              flex: 1,
              border: "none",
              width: "100%",
              height: "100%",
              backgroundColor: "#000000",
            }}
            onLoad={() => setIsLoaded(true)}
          />
        </View>
      ) : (
        <WebView
          source={{ uri: "https://gutznshell.com" }}
          originWhitelist={["*"]}
          style={[styles.webview, { opacity: isLoaded ? 1 : 0 }]}
          containerStyle={styles.webviewContainer}
          startInLoadingState={true}
          renderLoading={LoadingIndicatorView}
          onLoadEnd={() => setIsLoaded(true)}
        />
      )}
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
    backgroundColor: "#000000",
  },
  webviewContainer: {
    flex: 1, // Ensures the iframe wrapper dynamically captures full height on web targets
    backgroundColor: "#000000",
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
