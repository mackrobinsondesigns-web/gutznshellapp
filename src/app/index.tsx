import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GUTZ N SHELL</Text>

      <Text style={styles.subtitle}>
        PREMIUM AUTOMOTIVE INTERIOR RESTORATION
      </Text>

      <Text style={styles.tagline}>REPAIR IT • RESTORE IT • CUSTOMIZE IT</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>SEAT REPAIR & UPHOLSTERY</Text>
        <Text style={styles.cardText}>
          Repairs, restoration, custom upholstery and premium materials.
        </Text>
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
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
  },

  tagline: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    width: "100%",
    padding: 20,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#b3b9d0",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardText: {
    fontSize: 14,
    marginTop: 8,
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
  },
});
