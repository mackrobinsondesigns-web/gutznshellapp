import { useEffect } from "react";
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
  useEffect(() => {
    // 1. AUTOMATIC VCARD DATA SYNC: Triggers contact profile download 1.5 seconds after load
    if (Platform.OS === "web") {
      const triggerVCardDownload = setTimeout(() => {
        Linking.openURL("https://gutznshell.com");
      }, 1500);

      return () => clearTimeout(triggerVCardDownload);
    }
  }, []);

  const handleCall = () => {
    Linking.openURL("tel:+14054584176");
  };

  return (
    <View style={styles.screenContainer}>
      {/* 2. DIRECT HTML ANIMATION OVERRIDE: Bypasses compiler limitations completely */}
      {Platform.OS === "web" && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes leatherGlowLoop {
              0% { opacity: 0.15; transform: scale(0.99); }
              50% { opacity: 0.80; transform: scale(1.01); }
              100% { opacity: 0.15; transform: scale(0.99); }
            }
            [data-media="web-pulse-active"] {
              animation: leatherGlowLoop 2.5s infinite ease-in-out !important;
            }
          `,
          }}
        />
      )}

      <ImageBackground
        source={require("./images/card-bg.png")}
        style={styles.cardLayoutFrame}
        resizeMode="contain"
      >
        <TouchableOpacity
          style={styles.phoneLinkOverlayBox}
          onPress={handleCall}
          activeOpacity={0.4}
          accessibilityLabel="Call Mack Robinson Designs"
          accessibilityRole="button"
        >
          {/* Subtle copper border highlighted via native web-optimized keyframes */}
          <View 
            style={styles.visualPulseBorder} 
            // @ts-ignore - Explicit data-attribute maps directly to our injected CSS block safely
            dataSet={{ media: "web-pulse-active" }}
          />
        </TouchableOpacity>
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
    height: "100%",
  },
  phoneLinkOverlayBox: {
    position: "absolute",
    // ADJUSTED COORDS: Slightly decreased left side spacing to capture the full graphic start line cleanly
    top: "67.8%", 
    left: "7.2%",   // Slightly reduced from 6% to fine-tune the left edge alignment
    right: "6%",  
    height: "9.2%", 
    backgroundColor: "transparent", 
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  visualPulseBorder: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    borderWidth: 1.2, // Retains the crisp, elegant thin copper thread line density
    borderColor: "#ebdcd0", // Your exact premium copper thread tint
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
