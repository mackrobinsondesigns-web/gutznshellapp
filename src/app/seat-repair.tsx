import { ScrollView, Text, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";

export default function SeatRepairScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "SEAT REPAIR & UPHOLSTERY",
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.title}>SEAT REPAIR & UPHOLSTERY</Text>

        <Text style={styles.subtitle}>
          REPAIR IT • RESTORE IT • CUSTOMIZE IT
        </Text>

        <Text style={styles.description}>
          Professional automotive seat repair, restoration, custom upholstery
          and premium interior finishes.
        </Text>

        <Text style={styles.sectionTitle}>WHAT WE DO</Text>

        <Text style={styles.sectionText}>
          We repair damaged seats, restore worn interiors and create custom
          upholstery solutions designed around your vehicle and your style.
        </Text>

        <Text style={styles.sectionTitle}>SERVICE LEVELS</Text>

        <Text style={styles.packageTitle}>BASIC — REPAIR IT</Text>

        <Text style={styles.packageText}>
          Minor tears, burns, seam repairs and other targeted seat repairs.
        </Text>

        <Text style={styles.packageTitle}>STANDARD — RESTORE IT</Text>

        <Text style={styles.packageText}>
          Panels, bolsters, foam replacement and partial seat restoration.
        </Text>

        <Text style={styles.packageTitle}>PREMIUM — CUSTOMIZE IT</Text>

        <Text style={styles.packageText}>
          Complete custom reupholstery, premium materials and luxury interior
          finishes.
        </Text>

        <Pressable
          style={styles.estimateButton}
          onPress={() => router.push("/estimate")}
        >
          <Text style={styles.estimateButtonText}>REQUEST AN ESTIMATE</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#000000db",
  },

  contentContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6f90ba",
    marginTop: 30,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6f90ba",
    marginTop: 12,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#b4b9be",
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6f90ba",
    marginTop: 35,
  },

  sectionText: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    color: "#b4b9be",
    marginTop: 12,
  },

  packageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6f90ba",
    marginTop: 25,
  },

  packageText: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: "#b4b9be",
    marginTop: 8,
  },

  estimateButton: {
    marginTop: 35,
    marginBottom: 60,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#b4b9be",
    borderRadius: 10,
  },

  estimateButtonText: {
    color: "#6f90ba",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
