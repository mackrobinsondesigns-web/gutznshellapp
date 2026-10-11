import { useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function PristineLeatherCardHub() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));

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

    // 1. Direct the app context straight to your static public directory file asset
    const vcardUrl =
      Platform.OS === "web" ? "/contact.vcf" : "https://gutznshell.com"; // Complete destination path for phone setups

    // 2. Clear out the btoa compiler string work and run the URL command natively
    Linking.openURL(vcardUrl).catch((err) =>
      console.error("Failed to parse and open static public asset vCard", err),
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

// ... Keep your identical StyleSheet definitions down here ...
