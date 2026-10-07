import { Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

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

      <View style={styles.webviewContainer}>
        {/* Manually render the loading spinner for Web users until onLoad triggers */}
        {!isLoaded && <LoadingIndicatorView />}

        {Platform.OS === "web" ? (
          <iframe
            src="https://gutznshell.com"
            style={{
              border: "none",
              width: "100%",
              height: "100%",
              backgroundColor: "#000000",
              display: isLoaded ? "block" : "none", // Keeps hidden while loading to prevent flashes
            }}
            onLoad={() => setIsLoaded(true)}
          />
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
      </View>
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
    flex: 1,
    position: "relative", // Required to absolute position the loading indicator properly on top
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
    zIndex: 1, // Ensures it stays stacked directly over the web iframe
  },
});
