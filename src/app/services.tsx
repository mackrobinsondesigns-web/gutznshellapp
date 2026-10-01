import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { router, Stack } from "expo-router";

type ServicePackageProps = {
  name: string;
  price: string;
  description?: string;
  onPress: () => void;
};

function ServicePackage({
  name,
  price,
  description,
  onPress,
}: ServicePackageProps) {
  return (
    <Pressable style={styles.packageCard} onPress={onPress}>
      {/* Centered header package text */}
      <Text style={styles.packageText}>
        {name} — {price}
      </Text>
      {description ? (
        /* Centered package description text */
        <Text style={styles.packageDescription}>{description}</Text>
      ) : null}
    </Pressable>
  );
}

export default function ServicesScreen() {
  return (
    <View style={styles.mainWrapper}>
      <Stack.Screen
        options={{
          title: "OUR SERVICES",
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>OUR SERVICES</Text>

        <Text style={styles.subtitle}>
          Premium automotive interior restoration and customization.
        </Text>

        <Text style={styles.serviceTitle}>SEAT REPAIR & UPHOLSTERY</Text>

        <Text style={styles.serviceText}>
          Repairs, restoration, custom upholstery and premium materials.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$100+"
          description="Minor tears, burns, seams & repairs."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "SEAT REPAIR — BASIC",
                from: "services",
              },
            })
          }
        />

        <ServicePackage
          name="STANDARD"
          price="$500+"
          description="Panels, bolsters, foam & partial restoration."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "SEAT REPAIR — STANDARD",
              },
            })
          }
        />

        <ServicePackage
          name="PREMIUM"
          price="$1,500+"
          description="Complete custom reupholstery & premium materials."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "SEAT REPAIR — PREMIUM",
              },
            })
          }
        />

        <Text style={styles.serviceTitle}>HEADLINERS & ROOF INTERIORS</Text>

        <Text style={styles.serviceText}>
          OEM-style replacement, full headliner service, pillars and custom
          finishes.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$250+"
          description="OEM-style replacement & basic headliner service."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "HEADLINERS & ROOF INTERIORS — BASIC",
              },
            })
          }
        />

        <ServicePackage
          name="STANDARD"
          price="$450+"
          description="Full headliner service, pillars and custom finishes."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "HEADLINERS & ROOF INTERIORS — STANDARD",
              },
            })
          }
        />

        <ServicePackage
          name="PREMIUM"
          price="$900+"
          description="Full headliner service, pillars and custom finishes."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "HEADLINERS & ROOF INTERIORS — PREMIUM",
              },
            })
          }
        />

        <Text style={styles.serviceTitle}>DOOR PANELS & ARMRESTS</Text>

        <Text style={styles.serviceText}>
          Minor upholstery repairs, panel restoration, inserts, padding and
          custom door panels.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$150+"
          description="Minor upholstery repairs & basic door panel service."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DOOR PANELS & ARMRESTS — BASIC",
              },
            })
          }
        />

        <ServicePackage
          name="STANDARD"
          price="$500+"
          description="Full door panel service, inserts and custom finishes."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DOOR PANELS & ARMRESTS — STANDARD",
              },
            })
          }
        />

        <ServicePackage
          name="PREMIUM"
          price="$1,500+"
          description="Complete custom door panel service & premium materials."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DOOR PANELS & ARMRESTS — PREMIUM",
              },
            })
          }
        />

        <Text style={styles.serviceTitle}>CARPET & FLOORING</Text>

        <Text style={styles.serviceText}>
          Patches, repairs, complete carpet replacement, custom flooring,
          insulation and sound deadening.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$150+"
          description="Basic carpet and flooring service."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "CARPET & FLOORING — BASIC",
              },
            })
          }
        />

        <ServicePackage
          name="STANDARD"
          price="$800+"
          description="Full carpet and flooring service, custom finishes."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "CARPET & FLOORING — STANDARD",
              },
            })
          }
        />

        <ServicePackage
          name="PREMIUM"
          price="$2,000+"
          description="Complete custom carpet and flooring service & premium materials."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "CARPET & FLOORING — PREMIUM",
              },
            })
          }
        />

        <Text style={styles.serviceTitle}>DASH, CONSOLE & TRIM</Text>

        <Text style={styles.serviceText}>
          Vinyl, trim and console repairs, interior restoration and complete
          custom interior work.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$100+"
          description="Basic dash, console and trim service."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DASH, CONSOLE & TRIM — BASIC",
              },
            })
          }
        />

        <ServicePackage
          name="STANDARD"
          price="$500+"
          description="Full dash, console and trim service, custom finishes."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DASH, CONSOLE & TRIM — STANDARD",
              },
            })
          }
        />

        <ServicePackage
          name="PREMIUM"
          price="$2,000+"
          description="Complete custom dash, console and trim service & premium materials."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "DASH, CONSOLE & TRIM — PREMIUM",
              },
            })
          }
        />

        <Text style={styles.serviceTitle}>CONVERTIBLE TOP SERVICES</Text>

        <Text style={styles.serviceText}>
          Small tears, seam repairs, major repairs, component work and complete
          top replacement.
        </Text>

        <ServicePackage
          name="BASIC"
          price="$200+"
          description="Basic convertible top inspection and minor adjustments."
          onPress={() =>
            router.push({
              pathname: "/estimate",
              params: {
                service: "CONVERTIBLE TOP SERVICES — BASIC",
              },
            })
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#000000",
    flexGrow: 1,
    width: "100%",
    ...Platform.select({
      web: {
        maxWidth: 500,
        alignSelf: "center",
      },
    }),
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#b4b9be",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f90ba",
    textAlign: "center",
    marginBottom: 25,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b4b9be",
    marginTop: 20,
    marginBottom: 4,
    letterSpacing: 0.5,
    textAlign: "center", // Centered category titles
  },
  serviceText: {
    fontSize: 13,
    color: "#6f90ba",
    marginBottom: 12,
    lineHeight: 18,
    textAlign: "center", // Centered category subtitles
  },
  packageCard: {
    backgroundColor: "#111111",
    borderRadius: 6,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222222",
    alignItems: "center", // Align items horizontally centered inside the card pressable
    justifyContent: "center",
  },
  packageText: {
    color: "#b4b9be",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  packageDescription: {
    color: "#6f90ba",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
    textAlign: "center",
  },
});
