import { router, useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ActivityIndicator,
  FlatList,
  Animated,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
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
    textPrimary: "#00ffccd4",
    textSecondary: "#ff007f",
    placeholder: "#bc00dd",
    accent: "#00ffccc6",
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
    textPrimary: "#64ffdbe1",
    textSecondary: "#8892b0",
    placeholder: "#4c5c75",
    accent: "#64ffdbaf",
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

  // UX State variables
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showLoadingAnimation, setShowLoadingAnimation] =
    useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedName, setSubmittedName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Animation values
  const logoOpacity = useRef(new Animated.Value(0.3)).current;

  const activeColors = themes[activeThemeKey];

  useEffect(() => {
    if (showLoadingAnimation) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 0.3,
            duration: 2000,
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
    // 1. Force the phone typing display completely out of view immediately
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

      setSubmittedName(name);

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
              source={require("../../assets/images/seat-logo.png")}
              style={styles.loadingLogo}
              resizeMode="contain"
            />
          </Animated.View>
          <Text style={styles.loadingText}>PROCESSING REQUEST...</Text>
          <ActivityIndicator
            size="small"
            color="#ffffff"
            style={{ marginTop: 20 }}
          />
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 24}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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
                        style={[
                          styles.themeChip,
                          {
                            backgroundColor: themes[key].surface,
                            borderColor: themes[key].border,
                          },
                          activeThemeKey === key && {
                            borderColor: activeColors.accent,
                            borderWidth: 2,
                          },
                        ]}
                        onPress={() => setActiveThemeKey(key)}
                      >
                        <Text
                          style={[
                            styles.themeChipText,
                            { color: themes[key].textPrimary },
                          ]}
                        >
                          {themes[key].name}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>

                <Text
                  style={[styles.title, { color: activeColors.textPrimary }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  REQUEST AN ESTIMATE
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    { color: activeColors.textSecondary },
                  ]}
                >
                  Tell us about your vehicle and the interior work you need.
                </Text>

                {errorMessage ? (
                  <Text
                    style={[
                      styles.errorText,
                      { color: activeColors.textPrimary },
                    ]}
                  >
                    {errorMessage}
                  </Text>
                ) : null}

                <View style={styles.formCard}>
                  <View style={styles.fieldGroup}>
                    <Text
                      style={[
                        styles.label,
                        { color: activeColors.textSecondary },
                      ]}
                    >
                      NAME
                    </Text>
                    <TextInput
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        clearError();
                      }}
                      placeholder="Your Name"
                      placeholderTextColor={activeColors.placeholder}
                      style={[
                        styles.input,
                        {
                          backgroundColor: activeColors.surface,
                          borderColor: activeColors.border,
                          color: activeColors.textPrimary,
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.fieldRow}>
                    <View style={styles.inputHalf}>
                      <Text
                        style={[
                          styles.label,
                          { color: activeColors.textSecondary },
                        ]}
                      >
                        YEAR
                      </Text>
                      <TextInput
                        value={year}
                        onChangeText={(text) => {
                          setYear(text);
                          clearError();
                        }}
                        placeholder="2024"
                        keyboardType="numeric"
                        placeholderTextColor={activeColors.placeholder}
                        style={[
                          styles.input,
                          {
                            backgroundColor: activeColors.surface,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.inputHalf}>
                      <Text
                        style={[
                          styles.label,
                          { color: activeColors.textSecondary },
                        ]}
                      >
                        MAKE
                      </Text>
                      <TextInput
                        value={make}
                        onChangeText={(text) => {
                          setMake(text);
                          clearError();
                        }}
                        placeholder="Chevy"
                        placeholderTextColor={activeColors.placeholder}
                        style={[
                          styles.input,
                          {
                            backgroundColor: activeColors.surface,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text
                      style={[
                        styles.label,
                        { color: activeColors.textSecondary },
                      ]}
                    >
                      MODEL
                    </Text>
                    <TextInput
                      value={model}
                      onChangeText={(text) => {
                        setModel(text);
                        clearError();
                      }}
                      placeholder="Impala"
                      placeholderTextColor={activeColors.placeholder}
                      style={[
                        styles.input,
                        {
                          backgroundColor: activeColors.surface,
                          borderColor: activeColors.border,
                          color: activeColors.textPrimary,
                        },
                      ]}
                    />
                  </View>

                  <Pressable
                    style={[
                      styles.selectBox,
                      {
                        backgroundColor: activeColors.surface,
                        borderColor: activeColors.border,
                      },
                    ]}
                    onPress={() => {
                      clearError();
                      setServiceMenuOpen(true);
                    }}
                  >
                    <Text
                      style={[
                        styles.label,
                        { color: activeColors.textSecondary },
                      ]}
                    >
                      SERVICE
                    </Text>
                    <Text
                      style={[
                        styles.selectValue,
                        { color: activeColors.textPrimary },
                      ]}
                    >
                      {service || "Select service type"}
                    </Text>
                  </Pressable>

                  {service === "OTHER" ? (
                    <View style={styles.fieldGroup}>
                      <Text
                        style={[
                          styles.label,
                          { color: activeColors.textSecondary },
                        ]}
                      >
                        CUSTOM SERVICE DETAILS
                      </Text>
                      <TextInput
                        value={customService}
                        onChangeText={(text) => {
                          setCustomService(text);
                          clearError();
                        }}
                        placeholder="Describe the service you need"
                        placeholderTextColor={activeColors.placeholder}
                        style={[
                          styles.input,
                          {
                            backgroundColor: activeColors.surface,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                      />
                    </View>
                  ) : null}

                  <View style={styles.fieldRow}>
                    <View style={styles.inputHalf}>
                      <Text
                        style={[
                          styles.label,
                          { color: activeColors.textSecondary },
                        ]}
                      >
                        PHONE
                      </Text>
                      <TextInput
                        value={phone}
                        onChangeText={(text) => {
                          setPhone(text);
                          clearError();
                        }}
                        placeholder="(555) 123-4567"
                        keyboardType="phone-pad"
                        placeholderTextColor={activeColors.placeholder}
                        style={[
                          styles.input,
                          {
                            backgroundColor: activeColors.surface,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                      />
                    </View>

                    <View style={styles.inputHalf}>
                      <Text
                        style={[
                          styles.label,
                          { color: activeColors.textSecondary },
                        ]}
                      >
                        EMAIL
                      </Text>
                      <TextInput
                        value={email}
                        onChangeText={(text) => {
                          setEmail(text);
                          clearError();
                        }}
                        placeholder="you@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={activeColors.placeholder}
                        style={[
                          styles.input,
                          {
                            backgroundColor: activeColors.surface,
                            borderColor: activeColors.border,
                            color: activeColors.textPrimary,
                          },
                        ]}
                      />
                    </View>
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text
                      style={[
                        styles.label,
                        { color: activeColors.textSecondary },
                      ]}
                    >
                      DETAILS
                    </Text>
                    <TextInput
                      value={details}
                      onChangeText={(text) => {
                        setDetails(text);
                        clearError();
                      }}
                      placeholder="Tell us about the damage, materials, or work you need."
                      placeholderTextColor={activeColors.placeholder}
                      multiline
                      numberOfLines={5}
                      textAlignVertical="top"
                      style={[
                        styles.textArea,
                        {
                          backgroundColor: activeColors.surface,
                          borderColor: activeColors.border,
                          color: activeColors.textPrimary,
                        },
                      ]}
                    />
                  </View>

                  <Pressable
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor: isSubmitting
                          ? "#4b5563"
                          : activeColors.accent,
                        opacity: isSubmitting ? 0.8 : 1,
                      },
                    ]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
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
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT ESTIMATE"}
                    </Text>
                  </Pressable>
                </View>

                <Modal
                  visible={serviceMenuOpen}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setServiceMenuOpen(false)}
                >
                  <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setServiceMenuOpen(false)}
                  >
                    <Pressable
                      style={[
                        styles.modalCard,
                        {
                          backgroundColor: activeColors.surface,
                          borderColor: activeColors.border,
                        },
                      ]}
                      onPress={() => {}}
                    >
                      <Text
                        style={[
                          styles.modalTitle,
                          { color: activeColors.textPrimary },
                        ]}
                      >
                        CHOOSE A SERVICE
                      </Text>
                      <FlatList
                        data={serviceOptions}
                        keyExtractor={(item) => item}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                          <Pressable
                            style={[
                              styles.serviceOption,
                              {
                                backgroundColor:
                                  service === item
                                    ? activeColors.accent
                                    : activeColors.background,
                                borderColor: activeColors.border,
                              },
                            ]}
                            onPress={() => {
                              setService(item);
                              setServiceMenuOpen(false);
                              if (item !== "OTHER") {
                                setCustomService("");
                              }
                              clearError();
                            }}
                          >
                            <Text
                              style={[
                                styles.serviceOptionText,
                                {
                                  color:
                                    service === item
                                      ? "#fff"
                                      : activeColors.textPrimary,
                                },
                              ]}
                            >
                              {item}
                            </Text>
                          </Pressable>
                        )}
                        contentContainerStyle={styles.serviceListContent}
                        showsVerticalScrollIndicator={false}
                      />
                    </Pressable>
                  </Pressable>
                </Modal>
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    paddingBottom: 32,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingLogo: {
    width: 100,
    height: 100,
  },
  loadingText: {
    marginTop: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  successMessage: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
    lineHeight: 34,
  },
  successSubtext: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 18,
  },
  homeButton: {
    marginTop: 28,
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 28,
    minWidth: 220,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
  formShell: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  themeContainer: {
    marginBottom: 18,
  },
  themeLabelText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  themeRow: {
    gap: 10,
    paddingVertical: 4,
  },
  themeChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  themeChipText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },
  errorText: {
    marginBottom: 14,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.12)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.4)",
    fontSize: 14,
    fontWeight: "600",
  },
  formCard: {
    gap: 16,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputHalf: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 48,
  },
  selectBox: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 62,
  },
  selectValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    fontSize: 15,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: "center",
  },
  serviceListContent: {
    gap: 8,
    paddingBottom: 8,
  },
  serviceOption: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  serviceOptionText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
});
