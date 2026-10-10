import { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function PristineLeatherCardHub() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      const handlePrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener("beforeinstallprompt", handlePrompt);
      return () =>
        window.removeEventListener("beforeinstallprompt", handlePrompt);
    }
  }, []);

  const handleCall = () => {
    Linking.openURL("tel:+14054584176");
  };

  return (
    <View style={styles.screenContainer}>
      {/* Dynamic Image Wrapper loading your custom text art card design natively */}
      <ImageBackground
        // FIXED: Universal relative mapping path that lets Expo find and extract the card asset cleanly on compile
        source={require("./images/card-bg.png")}
        style={styles.cardLayoutFrame}
        resizeMode="contain"
      >
        {/* Invisible Hot-Link Bounding Box mapped precisely over your (405) 458-4176 graphic panel */}
        <TouchableOpacity
          style={styles.phoneLinkOverlayBox}
          onPress={handleCall}
          activeOpacity={0.3}
          accessibilityLabel="Call Mack Robinson Designs"
          accessibilityRole="button"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#0a0908", // True deep leather dark theme environment background
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  cardLayoutFrame: {
    width: width > 450 ? 420 : "100%",
    aspectRatio: 0.457, // Matches the exact tall dimensions of your Gutz N Shell stitched leather canvas
    position: "relative",
    height: "100%", // FIXED: Provides explicit height parameters to prevent web browser container collapse
  },
  phoneLinkOverlayBox: {
    position: "absolute",
    top: "67.8%",
    left: "8%",
    right: "8%",
    height: "9.2%",
    backgroundColor: "transparent",
    borderRadius: 8,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
});
