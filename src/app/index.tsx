import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView, // Added for cross-platform scroll safety
  Platform, // Added for web-specific browser styling
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen(): React.JSX.Element {
  const handlePress = (): void => {
    // Navigates to your internal app window containing the website
    router.push("/website");
  };

  return (
    // SafeAreaView handles device notches/status bars cleanly at the root
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Image
            source={require("../../assets/images/gutz-n-shell-logo.png")}
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

        <Pressable onPress={() => router.push("/seat-repair")}>
          <Image
            source={require("../../assets/images/seat-repair.png")}
            style={styles.repairButtonImage}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable onPress={() => router.push("/estimate")}>
          <Image
            source={require("../../assets/images/request-estimate.png")}
            style={styles.estimateButtonImage}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable onPress={() => router.push("/services")}>
          <Image
            source={require("../../assets/images/our-services.png")}
            style={styles.servicesButtonImage}
            resizeMode="contain"
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#000000db", // Keeps background dark up through structural containers
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40, // Ensures extra clearance for uninstalled web browser tab bars
    flexGrow: 1, // Automatically turns into a normal webpage wrapper if viewing in normal tabs
    ...Platform.select({
      web: {
        // PWA WEB SAFEVIEW EXTENSIONS:
        userSelect: "none", // Prevents ugly blue text highlights when tapping buttons on desktop web
        WebkitTouchCallout: "none", // Disables the phone browser's "Save Image" popups on continuous touches
      },
    }),
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 10, // Adjusted layout spacing to work uniformly within the safe scrolling wrapper
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#b4b9be",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
    color: "#b4b9be",
  },
  tagline: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#b4b9be",
  },
  repairButtonImage: {
    width: 320,
    height: 60,
    marginTop: 20,
  },
  estimateButtonImage: {
    width: 320,
    height: 60,
    marginTop: 20,
  },
  servicesButtonImage: {
    width: 320,
    height: 60,
    marginTop: 20,
  },
});
