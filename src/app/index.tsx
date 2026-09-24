import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

const stitchBorderText = "-".repeat(200);

export default function HomeScreen() {
  // A long string of dashes to act as our sewing thread loop
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GUTZ N SHELL</Text>

      <Text style={styles.subtitle}>
        PREMIUM AUTOMOTIVE INTERIOR RESTORATION
      </Text>

      <Text style={styles.tagline}>REPAIR IT • RESTORE IT • CUSTOMIZE IT</Text>

      {/* 🟦 Outer Card Container */}
      <View style={styles.card}>
        {/* 🧵 Pure Text Stitch Tracks (Zero Packages Required) */}
        {/* Top Stitch */}
        <View style={[styles.stitchBorder, { left: 1, right: 1 }]}></View>

        {/* 🛠️ Inner Card Content Layer */}
        <View style={styles.contentContainer}>
          <Text style={styles.cardTitle}>SEAT REPAIR & UPHOLSTERY</Text>
          <Text style={styles.cardText}>
            Repairs, restoration, custom upholstery and premium materials.
          </Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={() => router.push("/estimate")}>
        <Text style={styles.buttonText}>REQUEST AN ESTIMATE</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/services")}>
        <Text style={styles.buttonText}>VIEW OUR SERVICES</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000db",
  },
  title: {
    fontSize: 36,
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
  card: {
    width: "100%",
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#6f90ba",
    position: "relative",
    overflow: "hidden", // Important: cuts off excess dash tracking lines cleanly
  },

  stitchBorder: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 4, // Insets the stitch line exactly 4px from the main border
    borderWidth: 3.2, // Your preferred heavy upholstery thread thickness
    borderColor: "#000000db", // Deep contrast charcoal/black thread
    borderStyle: "dashed", // Enables standard dashboard rendering paths
    borderRadius: 12, // Your exact preferred inner curvature radius
  },

  contentContainer: {
    width: "100%",
    padding: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  cardText: {
    fontSize: 14,
    marginTop: 8,
    color: "#000000",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 18,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#6f90ba",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
});
