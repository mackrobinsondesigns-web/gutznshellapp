import { Pressable, Text, StyleSheet } from "react-native";

type ServicePackageProps = {
  name: string;
  price: string;
  description: string;
  onPress: () => void;
};

export default function ServicePackage({
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

      <Text style={styles.descriptionText}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  packageCard: {
    width: "100%",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#6f90ba",
    alignItems: "center",
  },

  packageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  descriptionText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
