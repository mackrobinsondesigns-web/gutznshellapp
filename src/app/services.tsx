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
          alert(
            "SEAT REPAIR — STANDARD\n\n" +
              "Starting at $500+\n\n" +
              "Panels, bolsters, foam & partial restoration.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$1,500+"
        description="Complete custom reupholstery & premium materials."
        onPress={() =>
          alert(
            "SEAT REPAIR — PREMIUM\n\n" +
              "Starting at $1,500+\n\n" +
              "Complete custom reupholstery & premium materials.",
          )
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
          alert(
            "HEADLINERS & ROOF INTERIORS — BASIC\n\n" +
              "Starting at $250+\n\n" +
              "OEM-style replacement & basic headliner service.",
          )
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$450+"
        description="Full headliner service, pillars and custom finishes."
        onPress={() =>
          alert(
            "HEADLINERS & ROOF INTERIORS — STANDARD\n\n" +
              "Starting at $450+\n\n" +
              "Full headliner service, pillars and custom finishes.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$900+"
        description="Full headliner service, pillars and custom finishes."
        onPress={() =>
          alert(
            "HEADLINERS & ROOF INTERIORS — PREMIUM\n\n" +
              "Starting at $900+\n\n" +
              "Full headliner service, pillars and custom finishes.",
          )
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
          alert(
            "DOOR PANELS & ARMRESTS — BASIC\n\n" +
              "Starting at $150+\n\n" +
              "Minor upholstery repairs & basic door panel service.",
          )
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$500+"
        description="Full door panel service, inserts and custom finishes."
        onPress={() =>
          alert(
            "DOOR PANELS & ARMRESTS — STANDARD\n\n" +
              "Starting at $500+\n\n" +
              "Full door panel service, inserts and custom finishes.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$1,500+"
        description="Complete custom door panel service & premium materials."
        onPress={() =>
          alert(
            "DOOR PANELS & ARMRESTS — PREMIUM\n\n" +
              "Starting at $1,500+\n\n" +
              "Complete custom door panel service & premium materials.",
          )
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
          alert(
            "CARPET & FLOORING — BASIC\n\n" +
              "Starting at $150+\n\n" +
              "Basic carpet and flooring service.",
          )
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$800+"
        description="Full carpet and flooring service, custom finishes."
        onPress={() =>
          alert(
            "CARPET & FLOORING — STANDARD\n\n" +
              "Starting at $800+\n\n" +
              "Full carpet and flooring service, custom finishes.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$2,000+"
        description="Complete custom carpet and flooring service & premium materials."
        onPress={() =>
          alert(
            "CARPET & FLOORING — PREMIUM\n\n" +
              "Starting at $2,000+\n\n" +
              "Complete custom carpet and flooring service & premium materials.",
          )
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
          alert(
            "DASH, CONSOLE & TRIM — BASIC\n\n" +
              "Starting at $100+\n\n" +
              "Basic dash, console and trim service.",
          )
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$500+"
        description="Full dash, console and trim service, custom finishes."
        onPress={() =>
          alert(
            "DASH, CONSOLE & TRIM — STANDARD\n\n" +
              "Starting at $500+\n\n" +
              "Full dash, console and trim service, custom finishes.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$2,000+"
        description="Complete custom dash, console and trim service & premium materials."
        onPress={() =>
          alert(
            "DASH, CONSOLE & TRIM — PREMIUM\n\n" +
              "Starting at $2,000+\n\n" +
              "Complete custom dash, console and trim service & premium materials.",
          )
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
          alert(
            "CONVERTIBLE TOP SERVICES — BASIC\n\n" +
              "Starting at $200+\n\n" +
              "Basic convertible top service.",
          )
        }
      />

      <ServicePackage
        name="STANDARD"
        price="$750+"
        description="Full convertible top service, custom finishes."
        onPress={() =>
          alert(
            "CONVERTIBLE TOP SERVICES — STANDARD\n\n" +
              "Starting at $750+\n\n" +
              "Full convertible top service, custom finishes.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM"
        price="$1,500+"
        description="Complete custom convertible top service & premium materials."
        onPress={() =>
          alert(
            "CONVERTIBLE TOP SERVICES — PREMIUM\n\n" +
              "Starting at $1,500+\n\n" +
              "Complete custom convertible top service & premium materials.",
          )
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
          alert(
            "CUSTOM UPGRADES — DIAMOND STITCHING\n\n" +
              "Starting at $500+\n\n" +
              "Custom diamond stitching for a luxurious look.",
          )
        }
      />

      <ServicePackage
        name="TWO-TONE UPHOLSTERY"
        price="$750+"
        description="Custom two-tone upholstery for a unique look."
        onPress={() =>
          alert(
            "CUSTOM UPGRADES — TWO-TONE UPHOLSTERY\n\n" +
              "Starting at $750+\n\n" +
              "Custom two-tone upholstery for a unique look.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM LEATHER"
        price="$1,000+"
        description="Premium leather seating for a luxurious feel."
        onPress={() =>
          alert(
            "CUSTOM UPGRADES — PREMIUM LEATHER\n\n" +
              "Starting at $1,000+\n\n" +
              "Premium leather seating for a luxurious feel.",
          )
        }
      />

      <ServicePackage
        name="CUSTOM EMBROIDERY"
        price="$75+"
        description="Custom embroidery for a personalized touch."
        onPress={() =>
          alert(
            "CUSTOM UPGRADES — CUSTOM EMBROIDERY\n\n" +
              "Starting at $75+\n\n" +
              "Custom embroidery for a personalized touch.",
          )
        }
      />

      <ServicePackage
        name="CUSTOM TRUNK UPHOLSTERY"
        price="$750+"
        description="Custom trunk upholstery for a cohesive look."
        onPress={() =>
          alert(
            "CUSTOM UPGRADES — CUSTOM TRUNK UPHOLSTERY\n\n" +
              "Starting at $750+\n\n" +
              "Custom trunk upholstery for a cohesive look.",
          )
        }
      />

      <ServicePackage
        name="SOUND DEADENING"
        price="$500+"
        description="Complete sound deadening for a quieter ride."
        onPress={() =>
          alert(
            "CUSTOM UPGRADES — SOUND DEADENING\n\n" +
              "Starting at $500+\n\n" +
              "Complete sound deadening for a quieter ride.",
          )
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
          alert(
            "CLASSIC & CUSTOM RESTORATION — STANDARD RESTORATION\n\n" +
              "Starting at $3,000+\n\n" +
              "Complete interior restoration for classic vehicles.",
          )
        }
      />

      <ServicePackage
        name="PREMIUM COMPLETE INTERIOR"
        price="$10,000+"
        description="Complete premium interior restoration for a luxurious feel."
        onPress={() =>
          alert(
            "CLASSIC & CUSTOM RESTORATION — PREMIUM COMPLETE INTERIOR\n\n" +
              "Starting at $10,000+\n\n" +
              "Complete premium interior restoration for a luxurious feel.",
          )
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
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
  },

  serviceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },

  serviceText: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
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
