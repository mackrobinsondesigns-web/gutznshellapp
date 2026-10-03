import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen(): React.JSX.Element {
  const handlePress = (): void => {
    router.push("/website");
  };

  return (
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
    backgroundColor: "#000000db",
    width: "100%",
    ...Platform.select({
      web: {
        overflowX: "hidden", // FIX: Kills horizontal scrollbars at the structural container level
      },
    }),
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    width: "100%",
    ...Platform.select({
      web: {
        overflowX: "hidden", // FIX: Prevents layout bleeding on desktop width changes
        WebkitTouchCallout: "none",
        // Note: Removed userSelect: "none" globally from the wrapper here because it can cross-contaminate
        // secondary pages like your Estimate form, causing text input elements to become unclickable/unselectable.
      },
    }),
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 10,
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
