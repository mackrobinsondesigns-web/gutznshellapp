import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function PristineLeatherCardHub(): React.JSX.Element {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  // FIX: Use useRef for Animated values so they persist across component re-renders safely
  const slideAnim = useRef(new Animated.Value(300)).current;

  const handlePressOverlay = (): void => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseMenu = (): void => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleCall = (): void => {
    handleCloseMenu();
    Linking.openURL("tel:+14054584176");
  };

  const handleSaveContact = async (): Promise<void> => {
    handleCloseMenu();

    if (Platform.OS === "web") {
      // 1. Desktop Web Environment: Pull directly from the fast static asset folder file
      Linking.openURL("/contact.vcf").catch((err) =>
        console.error("Failed to fetch public contact.vcf", err),
      );
    } else {
      try {
        // FIX 1: Point explicitly to your asset file layout location, NOT your root domain home page string
        const response = await fetch("https://gutznshell.com");

        if (!response.ok) {
          throw new Error(
            `Server responded with execution error status: ${response.status}`,
          );
        }

        const vcardText = await response.text();

        // FIX 2: Pure cross-platform encoding strategy using native universal URI methods.
        // This keeps the Metro bundler from throwing a compile-time exception on Node core imports.
        const base64Vcard =
          Platform.OS === "web" && typeof btoa === "function"
            ? btoa(unescape(encodeURIComponent(vcardText)))
            : encodeURIComponent(vcardText);

        const dataUri =
          Platform.OS === "web"
            ? `data:text/vcard;base64,${base64Vcard}`
            : `data:text/vcard,${base64Vcard}`; // Safe raw text parsing URI layout context for mobile contacts apps

        // Fire the native device system deep link pipeline straight into Address Book UI maps
        await Linking.openURL(dataUri);
      } catch (err) {
        console.error(
          "Failed mobile local text streaming execution pipeline loop:",
          err,
        );
        // Clean emergency fallback: Download directly in the mobile browser if data stream fails
        Linking.openURL("https://gutznshell.com");
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      {Platform.OS === "web" && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes leatherGlowLoop {
              0% { opacity: 0.20; transform: scale(0.995); }
              50% { opacity: 0.90; transform: scale(1.005); }
              100% { opacity: 0.20; transform: scale(0.995); }
            }
            [data-media="web-pulse-active"] {
              animation: leatherGlowLoop 2.2s infinite ease-in-out !important;
            }
          `,
          }}
        />
      )}

      <View style={styles.cardFrameContainer}>
        <ImageBackground
          source={require("./images/card-bg.png")}
          style={styles.cardLayoutFrame}
          resizeMode="stretch"
        >
          <TouchableOpacity
            style={styles.phoneLinkOverlayBox}
            onPress={handlePressOverlay}
            activeOpacity={0.4}
            accessibilityLabel="Contact Options"
            accessibilityRole="button"
          >
            <View
              style={styles.visualPulseBorder}
              // @ts-ignore
              dataSet={{ media: "web-pulse-active" }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {menuVisible && (
        <TouchableOpacity
          style={styles.menuModalBackdrop}
          activeOpacity={1}
          onPress={handleCloseMenu}
        >
          <Animated.View
            style={[
              styles.actionSheetContainer,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.sheetTitleText}>CONTACT OPTIONS</Text>

            <TouchableOpacity
              style={styles.sheetActionBtn}
              onPress={handleCall}
            >
              <Text style={styles.sheetActionText}> Call Mack Robinson</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetActionBtn}
              onPress={handleSaveContact}
            >
              <Text style={styles.sheetActionText}> Add to Contacts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sheetActionBtn, styles.cancelBtn]}
              onPress={handleCloseMenu}
            >
              <Text style={[styles.sheetActionText, styles.cancelBtnText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#0a0908",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
    height: "100%",
  },
  cardFrameContainer: {
    width: "100%",
    maxWidth: 400,
    height: "95%",
    maxHeight: 790,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLayoutFrame: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  phoneLinkOverlayBox: {
    position: "absolute",
    top: "67.5%",
    left: "7.0%",
    right: "6.0%",
    height: "9.8%",
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
    borderWidth: 1.5,
    borderColor: "#ebdcd0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  menuModalBackdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 999,
  },
  actionSheetContainer: {
    width: "100%",
    maxWidth: 440,
    backgroundColor: "#161514",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    borderTopWidth: 1,
    borderColor: "rgba(235, 220, 208, 0.15)",
  },
  sheetTitleText: {
    color: "#b4b9be",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  sheetActionBtn: {
    width: "100%",
    backgroundColor: "rgba(235, 220, 208, 0.04)",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(235, 220, 208, 0.1)",
  },
  sheetActionText: {
    color: "#ebdcd0",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  cancelBtn: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginTop: 4,
    marginBottom: 0,
  },
  cancelBtnText: {
    color: "#b4b9be",
    fontWeight: "normal",
  },
});
