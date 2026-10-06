import { Stack, router } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SeatRepairScreen() {
  const handlePress = () => {
    router.push("/website");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "SEAT REPAIR & UPHOLSTERY",
        }}
      />
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Structural desktop wrapper to keep layout centered, crisp, and beautifully aligned on wider displays */}
          <View style={styles.appShell}>
            <Text style={styles.title}>SEAT REPAIR & UPHOLSTERY</Text>

            <Text style={styles.subtitle}>
              REPAIR IT • RESTORE IT • CUSTOMIZE IT
            </Text>

            <Text style={styles.description}>
              Professional automotive seat repair, restoration, custom
              upholstery and premium interior finishes.
            </Text>

            <Text style={styles.sectionTitle}>WHAT WE DO</Text>

            <Text style={styles.sectionText}>
              We repair damaged seats, restore worn interiors and create custom
              upholstery solutions designed around your vehicle and your style.
            </Text>

            <Text style={styles.sectionTitle}>---SERVICE LEVELS---</Text>

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
              Complete custom reupholstery, premium materials and luxury
              interior finishes.
            </Text>

            <Pressable
              style={styles.estimateButton}
              onPress={() => router.push("/estimate")}
            >
              <Text style={styles.estimateButtonText}>REQUEST AN ESTIMATE</Text>
            </Pressable>

            {/* Centered container for footer information */}
            <View style={styles.footerContainer}>
              <Text style={styles.logoText}>
                To Learn More About Our Services,
                {"\n"}Please Visit Our Website...
              </Text>

              <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
                <Image
                  source={require("../../assets/images/gutz-n-shell-logo.png")}
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    maxWidth: 500,
    alignSelf: "center", // Ensures the SafeArea container itself centers on wide screens
    width: "100%",
  },

  appShell: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20, // Adds breathing room on small phone edges
  },

  container: {
    flex: 1,
    backgroundColor: "#000000db",
    ...Platform.select({
      web: {
        alignSelf: "center",
        overflowX: "hidden",
        maxWidth: 500,
        width: "100%",
      },
    }),
  } as ViewStyle,

  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500,
    width: "100%",
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
    marginBottom: 40,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: "#b4b9be",
    borderRadius: 10,
    alignSelf: "center", // Explicitly centers the pressable block
    width: "80%", // Standardizes width layout across viewports
  },

  estimateButtonText: {
    color: "#6f90ba",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  footerContainer: {
    alignItems: "center", // Keeps children centered vertically
    width: "100%",
  },

  logoText: {
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center", // Switched from left to center
    color: "#6f90ba",
    marginBottom: 16,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 80,
    borderRadius: 20,
    alignSelf: "center", // Clean central alignment overrides previous offsets
  } satisfies ImageStyle,
});
