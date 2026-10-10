import {
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function PristineLeatherCardHub() {
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
            onPress={() => Linking.openURL("tel:+14054584176")}
            activeOpacity={0.4}
            accessibilityLabel="Call Mack Robinson Designs"
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
    // FIXED COORDINATES: Shifted 1 click left (left/right balanced) and shortened slightly at the bottom (height: 9.8%)
    top: "67.5%",
    left: "7.0%", // Shifted slightly left from 8%
    right: "6.0%", // Adjusted from 5% to maintain correct grid width symmetry
    height: "9.8%", // Shaved down slightly from 10.5% to clean up the lower margin
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
});
