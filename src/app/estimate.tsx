import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

const serviceOptions = [
  "SEAT REPAIR & UPHOLSTERY",
  "HEADLINERS & ROOF INTERIORS",
  "DOOR PANELS & ARMRESTS",
  "CARPET & FLOORING",
  "DASH, CONSOLE & TRIM",
  "CONVERTIBLE TOP SERVICES",
  "CUSTOM UPGRADES",
  "CLASSIC & CUSTOM RESTORATION",
  "OTHER",
];

const themes = {
  CARBON_DARK: {
    name: "CARBON DARK",
    background: "#0a0a0a",
    surface: "#141414",
    border: "#262626",
    textPrimary: "#ffffff",
    textSecondary: "#a3a3a3",
    placeholder: "#6f90ba",
    accent: "#007bff",
    modalBackground: "rgba(0, 0, 0, 0.85)",
  },
  CRIMSON_CARBON: {
    name: "CRIMSON CARBON",
    background: "#0a0a0a",
    surface: "#141414",
    border: "#262626",
    textPrimary: "#ffffff",
    textSecondary: "#a3a3a3",
    placeholder: "#ba6f6f",
    accent: "#ff3b30",
    modalBackground: "rgba(0, 0, 0, 0.85)",
  },

  PLATINUM_LIGHT: {
    name: "PLATINUM LIGHT",
    background: "#f4f6f9",
    surface: "#ffffff",
    border: "#dcdfe6",
    textPrimary: "#1a1a1a",
    textSecondary: "#606266",
    placeholder: "#909399",
    accent: "#007bff",
    modalBackground: "rgba(0, 0, 0, 0.5)",
  },
  NEON_CYBER: {
    name: "NEON CYBER",
    background: "#03000a",
    surface: "#0d0214",
    border: "#39005c",
    textPrimary: "#00ffcccc",
    textSecondary: "#ff007f",
    placeholder: "#bc00dd",
    accent: "#00ffccc3",
    modalBackground: "rgba(3, 0, 10, 0.9)",
  },
  WARM_VINTAGE: {
    name: "WARM VINTAGE",
    background: "#fdf6e3",
    surface: "#eee8d5",
    border: "#93a1a1",
    textPrimary: "#586e75",
    textSecondary: "#657b83",
    placeholder: "#b58900",
    accent: "#cb4b16",
    modalBackground: "rgba(0, 0, 0, 0.4)",
  },
  MIDNIGHT_SPACE: {
    name: "MIDNIGHT SPACE",
    background: "#020c1b",
    surface: "#0a192f",
    border: "#172a45",
    textPrimary: "#64ffdbd8",
    textSecondary: "#8892b0",
    placeholder: "#4c5c75",
    accent: "#64ffdbc0",
    modalBackground: "rgba(2, 12, 27, 0.85)",
  },
};

type ThemeKeys = keyof typeof themes;

export default function EstimateScreen(): React.JSX.Element {
  const { service: selectedService, from } = useLocalSearchParams();
  const [activeThemeKey, setActiveThemeKey] =
    useState<ThemeKeys>("CARBON_DARK");
  const [serviceMenuOpen, setServiceMenuOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [service, setService] = useState<string>(
    typeof selectedService === "string" ? selectedService : "",
  );
  const [customService, setCustomService] = useState<string>(
    typeof selectedService === "string" &&
      !serviceOptions.includes(selectedService)
      ? selectedService
      : "",
  );
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showLoadingAnimation, setShowLoadingAnimation] =
    useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const logoOpacity = useRef(new Animated.Value(0.3)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(40)).current;

  const activeColors = themes[activeThemeKey];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.spring(cardTranslateY, {
        toValue: 0,
        speed: 10,
        bounciness: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (showLoadingAnimation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0.3,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      logoOpacity.setValue(0.3);
    }
  }, [showLoadingAnimation]);

  const clearError = () => {
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!year.trim() || !make.trim() || !model.trim()) {
      setErrorMessage("Please enter complete vehicle information.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setErrorMessage("Please provide either a phone number or email address.");
      return;
    }

    const finalService =
      service === "OTHER" ? `OTHER: ${customService}` : service;

    setIsSubmitting(true);
    setShowLoadingAnimation(true);

    const startTime = Date.now();

    try {
      const { error } = await supabase.from("estimate_requests").insert({
        name: name.trim(),
        year: year.trim(),
        make: make.trim(),
        model: model.trim(),
        service: finalService,
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        details: details.trim(),
        submitted_at: new Date().toISOString(),
      });

      if (error) throw error;

      setSubmittedName(name.trim());

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(5000 - elapsedTime, 0);

      setTimeout(() => {
        setShowLoadingAnimation(false);
        setSubmitted(true);
        setIsSubmitting(false);
      }, remainingTime);
    } catch (err: any) {
      console.error(err);
      setShowLoadingAnimation(false);
      setIsSubmitting(false);
      setErrorMessage(
        "Submission failed. Please check your connection and try again.",
      );
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        { backgroundColor: activeColors.background },
      ]}
    >
      <Stack.Screen
        options={{
          title: "REQUEST AN ESTIMATE",
          headerShown: true,
          headerTintColor: activeColors.textPrimary,
          headerStyle: { backgroundColor: activeColors.background },
          gestureEnabled: from === "services",
        }}
      />

      {showLoadingAnimation && (
        <View style={styles.loadingOverlay}>
          <Animated.View style={{ opacity: logoOpacity }}>
            <Image
              source={require("../../src/app/images/seat-logo.png")}
              style={styles.loadingLogo}
              resizeMode="contain"
            />
          </Animated.View>
          <Text style={styles.loadingText}>PROCESSING REQUEST...</Text>
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{ marginTop: 20 }}
          />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[
          styles.keyboardContainer,
          Platform.OS === "web" && { flex: 1, height: "auto" }, // Forces browser layout to naturally expand
        ]}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 24}
        pointerEvents="box-none" // Bypasses empty structural web node wrappers
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          pointerEvents="auto" // Explicitly grants mouse focus to inner scroll content
        >
          <Animated.View
            style={[
              styles.formCard,
              {
                backgroundColor: activeColors.surface,
                borderColor: activeColors.border,
                opacity: cardOpacity,
                transform: [{ translateY: cardTranslateY }],
                ...Platform.select({
                  web: {
                    userSelect: "text", // Enables native pointer text handling inside the card canvas
                  },
                }),
              },
            ]}
          >
            {submitted ? (
              <View style={styles.successContainer}>
                <Text
                  style={[
                    styles.successMessage,
                    { color: activeColors.textPrimary },
                  ]}
                >
                  ESTIMATE REQUEST RECEIVED{"\n\n"}
                  THANK YOU, {submittedName}!
                </Text>
                <Text
                  style={[
                    styles.successSubtext,
                    { color: activeColors.textSecondary },
                  ]}
                >
                  Your request has been successfully submitted to GUTZ N SHELL.
                  {"\n\n"}
                  We’ll review your vehicle and service details and get back to
                  you soon.
                </Text>
                <Pressable
                  style={[
                    styles.homeButton,
                    { backgroundColor: activeColors.accent },
                  ]}
                  onPress={() => router.replace("/")}
                >
                  <Text
                    style={[
                      styles.homeButtonText,
                      {
                        color:
                          activeThemeKey === "PLATINUM_LIGHT" ||
                          activeThemeKey === "WARM_VINTAGE"
                            ? "#000"
                            : "#fff",
                      },
                    ]}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.formShell}>
                <View style={styles.themeContainer}>
                  <Text
                    style={[
                      styles.themeLabelText,
                      { color: activeColors.textSecondary },
                    ]}
                  >
                    THEME:
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.themeRow}
                  >
                    {(Object.keys(themes) as ThemeKeys[]).map((key) => (
                      <Pressable
                        key={key}
                        onPress={() => setActiveThemeKey(key)}
                        style={[
                          styles.themeChip,
                          {
                            backgroundColor: themes[key].surface,
                            borderColor:
                              activeThemeKey === key
                                ? themes[key].accent
                                : themes[key].border,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.themeChipText,
                            {
                              color:
                                activeThemeKey === key
                                  ? themes[key].textPrimary
                                  : themes[key].textSecondary,
                            },
                          ]}
                        >
                          {themes[key].name}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: activeColors.textSecondary },
                    ]}
                  >
                    CUSTOMER INFO
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: activeColors.background,
                        borderColor: activeColors.border,
                        color: activeColors.textPrimary,
                      },
                    ]}
                    placeholder="Full Name"
                    placeholderTextColor={activeColors.placeholder}
                    value={name}
                    onChangeText={setName}
                    onFocus={clearError}
                  />

                  {/* FIXED: Added explicit layout wrapping to distribute spaces evenly on web targets */}
                  <View style={styles.inlineFields}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.inputHalf,
                          {
                            backgroundColor: activeColors.background,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                        placeholder="Year"
                        placeholderTextColor={activeColors.placeholder}
                        keyboardType="numeric"
                        value={year}
                        onChangeText={setYear}
                        onFocus={clearError}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.inputHalf,
                          {
                            backgroundColor: activeColors.background,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                        placeholder="Make"
                        placeholderTextColor={activeColors.placeholder}
                        value={make}
                        onChangeText={setMake}
                        onFocus={clearError}
                      />
                    </View>
                  </View>

                  {/* FIXED: Changed from inputHalf to input style so Model spans the full width, matching Full Name */}
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: activeColors.background,
                        borderColor: activeColors.border,
                        color: activeColors.textPrimary,
                      },
                    ]}
                    placeholder="Model"
                    placeholderTextColor={activeColors.placeholder}
                    value={model}
                    onChangeText={setModel}
                    onFocus={clearError}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: activeColors.textSecondary },
                    ]}
                  >
                    SERVICE
                  </Text>
                  <Pressable
                    style={[
                      styles.dropdownButton,
                      {
                        backgroundColor: activeColors.background,
                        borderColor: activeColors.border,
                      },
                    ]}
                    onPress={() => setServiceMenuOpen(true)}
                  >
                    <Text
                      style={{
                        color: service
                          ? activeColors.textPrimary
                          : activeColors.placeholder,
                      }}
                    >
                      {service || "Select Service"}
                    </Text>
                    <Text style={{ color: activeColors.textSecondary }}>▾</Text>
                  </Pressable>

                  {service === "OTHER" && (
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: activeColors.background,
                          borderColor: activeColors.border,
                          color: activeColors.textPrimary,
                        },
                      ]}
                      placeholder="Custom service details"
                      placeholderTextColor={activeColors.placeholder}
                      value={customService}
                      onChangeText={setCustomService}
                      onFocus={clearError}
                    />
                  )}
                </View>

                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: activeColors.textSecondary },
                    ]}
                  >
                    CONTACT
                  </Text>

                  {/* FIXED: Wrapped inputs into layout boxes to prevent the Email box from spilling over container edges */}
                  <View style={styles.inlineFields}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.inputHalf,
                          {
                            backgroundColor: activeColors.background,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                        placeholder="Phone"
                        placeholderTextColor={activeColors.placeholder}
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        onFocus={clearError}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[
                          styles.inputHalf,
                          {
                            backgroundColor: activeColors.background,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                        placeholder="Email"
                        placeholderTextColor={activeColors.placeholder}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={clearError}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.fieldGroup}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: activeColors.textSecondary },
                    ]}
                  >
                    VEHICLE DETAILS
                  </Text>
                  <TextInput
                    style={[
                      styles.textArea,
                      {
                        backgroundColor: activeColors.background,
                        borderColor: activeColors.border,
                        color: activeColors.textPrimary,
                      },
                    ]}
                    placeholder="Tell us about the damage, materials, or repairs needed..."
                    placeholderTextColor={activeColors.placeholder}
                    multiline
                    numberOfLines={5}
                    value={details}
                    onChangeText={setDetails}
                    onFocus={clearError}
                  />
                </View>

                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <Pressable
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: activeColors.accent,
                      opacity: isSubmitting ? 0.8 : 1,
                    },
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.submitButtonText,
                        {
                          color:
                            activeThemeKey === "PLATINUM_LIGHT" ||
                            activeThemeKey === "WARM_VINTAGE"
                              ? "#000"
                              : "#fff",
                        },
                      ]}
                    >
                      SUBMIT REQUEST
                    </Text>
                  )}
                </Pressable>
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        transparent
        visible={serviceMenuOpen}
        animationType="fade"
        onRequestClose={() => setServiceMenuOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setServiceMenuOpen(false)}
        >
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: activeColors.surface,
                borderColor: activeColors.border,
              },
            ]}
          >
            <Text
              style={[styles.modalTitle, { color: activeColors.textPrimary }]}
            >
              SELECT SERVICE
            </Text>
            <FlatList
              data={serviceOptions}
              keyExtractor={(item) => item}
              style={styles.optionList}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.optionRow,
                    {
                      borderBottomColor: activeColors.border,
                      backgroundColor:
                        item === service
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                    },
                  ]}
                  onPress={() => {
                    setService(item);
                    setCustomService("");
                    setServiceMenuOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: activeColors.textPrimary },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable
              style={[
                styles.modalCloseButton,
                { backgroundColor: activeColors.accent },
              ]}
              onPress={() => setServiceMenuOpen(false)}
            >
              <Text
                style={[
                  styles.modalCloseText,
                  {
                    color:
                      activeThemeKey === "PLATINUM_LIGHT" ||
                      activeThemeKey === "WARM_VINTAGE"
                        ? "#000"
                        : "#fff",
                  },
                ]}
              >
                CLOSE
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 30,
  },
  formCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
    ...Platform.select({
      web: {
        maxWidth: 800,
        alignSelf: "center",
        width: "100%", // Explicitly handles centering canvas bugs in web browsers
      },
    }),
  },
  formShell: {
    gap: 18,
  },
  themeContainer: {
    gap: 10,
  },
  themeLabelText: {
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  themeRow: {
    paddingVertical: 4,
    gap: 8,
  },
  themeChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  themeChipText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  fieldGroup: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 1.3,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  /* FIXED: Merged duplicate declarations and preserved padding, minHeight, and boundaries */
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 15,
    padding: 10,
    ...Platform.select({
      web: {
        outlineWidth: 0,
        cursor: "text",
        userSelect: "text", // Explicitly forces desktop pointer availability
      },
    }),
  },
  /* FIXED: Added web overrides so clicking Year, Make, and Model elements functions */
  inputHalf: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 15,
    ...Platform.select({
      web: {
        outlineWidth: 0,
        cursor: "text",
        userSelect: "text",
      },
    }),
  },
  inlineFields: {
    flexDirection: "row",
    gap: 10,
  },
  /* FIXED: Added web overrides to details multi-line field */
  textArea: {
    minHeight: 130,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlignVertical: "top",
    fontSize: 15,
    ...Platform.select({
      web: {
        outlineWidth: 0,
        cursor: "text",
        userSelect: "text",
      },
    }),
  },
  dropdownButton: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      web: {
        cursor: "pointer", // Gives web users a visual hand selection indicator
      },
    }),
  },
  errorText: {
    color: "#ff5c5c",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  submitButton: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 40,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  successContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 18,
  },
  successMessage: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
    lineHeight: 32,
    textTransform: "uppercase",
  },
  successSubtext: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
  },
  homeButton: {
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  homeButtonText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 18,
  },
  modalCard: {
    width: "100%",
    maxWidth: 480,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  optionList: {
    maxHeight: 350,
  },
  optionRow: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  optionText: {
    fontSize: 15,
    fontWeight: "600",
  },
  modalCloseButton: {
    marginTop: 14,
    minHeight: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill, // Safe full boundary tracking across platforms
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingLogo: {
    width: 118,
    height: 118,
  },
  loadingText: {
    marginTop: 18,
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
