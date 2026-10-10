import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(): React.JSX.Element {
  const handlePress = (): void => {
    router.push("/website");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Structural desktop wrapper to keep layout centered, crisp, and beautifully aligned on wider displays */}
      <View style={styles.appShell}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
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

          <Pressable onPress={() => router.push("/seat-repair")}>
            <Image
              source={require("../../src/app/images/seat-repair.png")}
              style={styles.repairButtonImage}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable onPress={() => router.push("/estimate")}>
            <Image
              source={require("../../src/app/images/request-estimate.png")}
              style={styles.estimateButtonImage}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable onPress={() => router.push("/services")}>
            <Image
              source={require("../../src/app/images/our-services.png")}
              style={styles.servicesButtonImage}
              resizeMode="contain"
            />
          </Pressable>

          {/* Premium Digital Business Card Portal Shortcut */}
          <Pressable
            onPress={() => router.push("/card")}
            style={({ pressed }) => [
              styles.cardPortalBtn,
              pressed && styles.cardPortalBtnPressed,
            ]}
          >
            <Text style={styles.cardPortalBtnText}>
              VIEW DIGITAL BUSINESS CARD
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#000000", // FIXED: Changed from #000000db to true solid pitch black to prevent browser viewport bleed-through
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
        maxWidth: 550, // Restricts screen stretch on computer monitors
        alignSelf: "center", // Centers the entire mobile application viewport on desktop browsers
        boxShadow: "0 0 40px rgba(0,0,0,0.8)", // Adds a subtle deep premium fade outline on desktop views
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
        overflowX: "hidden",
        WebkitTouchCallout: "none",
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
  /* Added Premium Card Button Rules mapped seamlessly to your graphic buttons size */
  cardPortalBtn: {
    width: 320,
    height: 54,
    backgroundColor: "rgba(235, 220, 208, 0.06)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(235, 220, 208, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 10,
    ...Platform.select({
      web: {
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      },
    }),
  },
  cardPortalBtnPressed: {
    backgroundColor: "rgba(235, 220, 208, 0.15)",
    borderColor: "rgba(235, 220, 208, 0.6)",
    transform: [{ scale: 0.98 }],
  },
  cardPortalBtnText: {
    color: "#ebdcd0", // Soft warm copper tint matching your leather stitch elements
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
});
