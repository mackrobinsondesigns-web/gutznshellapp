import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.JSX.Element {
  const handlePress = (): void => {
    if (Platform.OS === "web") {
      const newTab = window.open("about:blank", "_blank");

      if (newTab) {
        newTab.document.write(`
          <html style="background-color: #000000; height: 100%; width: 100%;">
            <head><title>Loading Gutz N Shell...</title></head>
            <body style="margin: 0; background-color: #000000; display: flex; justify-content: center; align-items: center;">
            </body>
          </html>
        `);
        newTab.document.close();
        newTab.location.href = "https://gutznshell.com";
      }
    } else {
      router.push("/website");
    }
  };

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.appShell}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Brand Identity Branding Header Header Section */}
          <View style={styles.headerSection}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
              <Image
                source={require("../../src/app/images/gutz-n-shell-logo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>

            <Text style={styles.title}>GUTZ N SHELL</Text>

            <Text style={styles.subtitle}>
              PREMIUM AUTOMOTIVE INTERIOR RESTORATION
            </Text>

            <Text style={styles.tagline}>
              REPAIR IT • RESTORE IT • CUSTOMIZE IT
            </Text>
          </View>

          {/* Navigation Action Buttons Section */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => router.push("/seat-repair")}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../src/app/images/seat-repair.png")}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => router.push("/estimate")}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../src/app/images/request-estimate.png")}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => router.push("/services")}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../src/app/images/our-services.png")}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => router.push("/card")}
              activeOpacity={0.8}
            >
              <Image
                source={require("../../src/app/images/card.png")}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#000000",
    width: "100%",
    ...Platform.select({
      web: {
        overflowX: "hidden",
      },
    }),
  },
  appShell: {
    flex: 1,
    width: "100%",
    ...Platform.select({
      web: {
        maxWidth: 550,
        alignSelf: "center",
        boxShadow: "0 0 40px rgba(0,0,0,0.8)",
      },
    }),
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    flexGrow: 1,
    width: "100%",
    ...Platform.select({
      web: {
        overflowX: "hidden",
        WebkitTouchCallout: "none",
      },
    }),
  },
  headerSection: {
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 15,
    borderRadius: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#b4b9be",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "#b4b9be",
    paddingHorizontal: 10,
  },
  tagline: {
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "bold",
    color: "#8f4a24",
  },
  menuSection: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    gap: 15,
  },
  buttonWrapper: {
    width: "100%",
    aspectRatio: 320 / 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
});
