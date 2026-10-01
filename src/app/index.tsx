import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {
  View,
  Text, // Added missing import
  Pressable, // Added missing import
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function HomeScreen(): React.JSX.Element {
  const handlePress = (): void => {
    // Navigates to your internal app window containing the website
    router.push("/website");
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.tagline}>REPAIR IT • RESTORE IT • CUSTOMIZE IT</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 180,
    height: 180,
    marginTop: -60,
    marginBottom: 20,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000db",
  },
  title: {
    fontSize: 36,
    marginTop: -30,
    fontWeight: "bold",
    color: "#b4b9be",
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
