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

  // FIX 1: Turn off Safe Area constraints on the web to stop empty bottom padding injection
  const safeEdges = Platform.OS === "web" ? [] : ["bottom", "left", "right"];

  return (
    <SafeAreaView
      style={styles.container}
      // @ts-ignore - Dynamic edges are safe here
      edges={safeEdges}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "gutznshell.com",
          headerTitleAlign: "center",
          headerTintColor: "#b4b9be", // FIX 2: Changed from #000000 to white/gray text so it's visible on the black header
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
              // FIX 3: Ensure iframe renders cleanly as a block asset to eliminate inline baseline gaps
              display: isLoaded ? "block" : "none",
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
    height: "100%",
    width: "100%",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000000",
  },
  webviewContainer: {
    flex: 1,
    position: "relative", // Required to absolute position the loading indicator properly on top
    backgroundColor: "#000000",
    width: "100%",
    height: "100%", // FIX 4: Explicitly force full layout box height coverage
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
