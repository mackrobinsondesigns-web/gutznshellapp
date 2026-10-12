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
    // FIX: Specify edges to exclude 'top' so your black stack header meets your layout perfectly
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

          <Pressable onPress={() => router.push("/card")}>
            <Image
              source={require("../../src/app/images/card.png")}
              style={styles.cardPortalBtnPressed}
              resizeMode="contain"
            />
          </Pressable>
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
  cardPortalBtnPressed: {
    width: 320,
    height: 60,
    marginTop: 30,
  },
});
