import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";

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
      <Text style={styles.packageText}>
        {name} — {price}
      </Text>
      {description ? (
        <Text style={styles.packageDescription}>{description}</Text>
      ) : null}
    </Pressable>
  );
}

export default function ServicesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        Minor upholstery repairs, panel restoration, inserts, padding and custom
        door panels.
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
        description="Basic convertible top service."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CONVERTIBLE TOP SERVICES — BASIC",
            },
          })
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$750+"
        description="Full convertible top service, custom finishes."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CONVERTIBLE TOP SERVICES — STANDARD",
            },
          })
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$1,500+"
        description="Complete custom convertible top service & premium materials."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CONVERTIBLE TOP SERVICES — PREMIUM",
            },
          })
        }
      />

      <Text style={styles.serviceTitle}>CUSTOM UPGRADES</Text>

      <Text style={styles.serviceText}>
        Personalize your interior with premium custom upgrades and finishes.
      </Text>

      <ServicePackage
        name="DIAMOND STITCHING"
        price="$500+"
        description="Custom diamond stitching for a luxurious look."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — DIAMOND STITCHING",
            },
          })
        }
      />

      <ServicePackage
        name="TWO-TONE UPHOLSTERY"
        price="$750+"
        description="Custom two-tone upholstery for a unique look."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — TWO-TONE UPHOLSTERY",
            },
          })
        }
      />

      <ServicePackage
        name="PREMIUM LEATHER"
        price="$1,000+"
        description="Premium leather seating for a luxurious feel."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — PREMIUM LEATHER",
            },
          })
        }
      />

      <ServicePackage
        name="CUSTOM EMBROIDERY"
        price="$75+"
        description="Custom embroidery for a personalized touch."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — CUSTOM EMBROIDERY",
            },
          })
        }
      />

      <ServicePackage
        name="CUSTOM TRUNK UPHOLSTERY"
        price="$750+"
        description="Custom trunk upholstery for a cohesive look."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — CUSTOM TRUNK UPHOLSTERY",
            },
          })
        }
      />

      <ServicePackage
        name="SOUND DEADENING"
        price="$500+"
        description="Complete sound deadening for a quieter ride."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CUSTOM UPGRADES — SOUND DEADENING",
            },
          })
        }
      />

      <Text style={styles.serviceTitle}>CLASSIC & CUSTOM RESTORATION</Text>

      <Text style={styles.serviceText}>
        Full interior restoration for classic vehicles, custom builds and
        premium projects.
      </Text>

      <ServicePackage
        name="STANDARD RESTORATION"
        price="$3,000+"
        description="Complete interior restoration for classic vehicles."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service: "CLASSIC & CUSTOM RESTORATION — STANDARD RESTORATION",
            },
          })
        }
      />

      <ServicePackage
        name="PREMIUM COMPLETE INTERIOR"
        price="$10,000+"
        description="Complete premium interior restoration for a luxurious feel."
        onPress={() =>
          router.push({
            pathname: "/estimate",
            params: {
              service:
                "CLASSIC & CUSTOM RESTORATION — PREMIUM COMPLETE INTERIOR",
            },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#000000db",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#b4b9be",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 15,
    color: "#b4b9be",
    textAlign: "center",
  },

  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    color: "#b4b9be",
  },

  serviceText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
    color: "#b4b9be",
  },

  packageCard: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#6f90ba",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  packageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  packageDescription: {
    marginTop: 5,
    textAlign: "center",
  },
});
