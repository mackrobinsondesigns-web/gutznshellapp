import { useState } from "react";
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

export default function PristineLeatherCardHub() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300)); // Hidden off-screen by default

  const handlePressOverlay = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleCall = () => {
    handleCloseMenu();
    Linking.openURL("tel:+14054584176");
  };

  const handleSaveContact = () => {
    handleCloseMenu();

    // 1. Build the robust vCard structure layout with finalized corporate metadata
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Robinson;Mack;;;",
      "FN:Mack Robinson",
      "ORG:Gutz N Shell",
      "TITLE:Owner and Designer",
      "TEL;TYPE=CELL:+14054584176",
      "EMAIL;TYPE=PREF,INTERNET:mackrobinson@gutznshell.com",
      "URL:https://gutznshell.com",
      "PHOTO;VALUE=URI:https://gutznshell.com",
      "END:VCARD",
    ].join("\n");

    // 2. Safely encode into a base64 Data URI schema for browser/mobile interpretation
    const base64Vcard = btoa(unescape(encodeURIComponent(vcard)));
    const vcardUrl = `data:text/vcard;base64,${base64Vcard}`;

    // 3. Command the native OS engine to handle the download file layout
    Linking.openURL(vcardUrl).catch((err) =>
      console.error("Failed to parse and open vCard file scheme", err),
    );
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
          {/* Triggers the interactive menu layer upon press */}
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

      {/* Dimmed backdrop background cover when menu is active */}
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
  /* Action Sheet Styling matched to your sleek dark layout palette */
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
    backgroundColor: "#161514", // Leather dark background core panel
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    borderTopWidth: 1,
    borderColor: "rgba(235, 220, 208, 0.15)", // Premium subtle copper dividing trim
  },
  sheetTitleText: {
    color: "#b4b9be", // Slate header typography style
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
    color: "#ebdcd0", // Soft warm copper font color accents
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
