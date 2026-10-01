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
} from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function EstimateScreen() {
  const { service: selectedService, from } = useLocalSearchParams();
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [service, setService] = useState(
    typeof selectedService === "string" ? selectedService : "",
  );
  const [customService, setCustomService] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

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

  return (
    <>
      <Stack.Screen
        options={{
          title: "REQUEST AN ESTIMATE",
          gestureEnabled: from === "services",
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {submitted ? (
              <View style={styles.successContainer}>
                <Text style={styles.successMessage}>
                  ESTIMATE REQUEST RECEIVED{"\n\n"}
                  THANK YOU, {submittedName}!
                </Text>
                <Text style={styles.successSubtext}>
                  Your request has been successfully submitted to GUTZ N SHELL.
                  {"\n\n"}
                  We’ll review your vehicle and service details and get back to
                  you soon.
                </Text>
                <Pressable
                  style={styles.homeButton}
                  onPress={() => router.replace("/")}
                >
                  <Text style={styles.homeButtonText}>BACK TO HOME</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.title}>REQUEST AN ESTIMATE</Text>
                <Text style={styles.subtitle}>
                  Tell us about your vehicle and the interior work you need.
                </Text>

                <TextInput
                  placeholder="ENTER YOUR NAME"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  placeholder="VEHICLE YEAR"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                  keyboardType="numeric"
                />

                <TextInput
                  placeholder="VEHICLE MAKE"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={make}
                  onChangeText={setMake}
                />

                <TextInput
                  placeholder="VEHICLE MODEL"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={model}
                  onChangeText={setModel}
                />

                {service ? (
                  <Text style={styles.selectedServiceLabel}>
                    SELECTED SERVICE:{" "}
                    {service === "OTHER" && customService
                      ? customService
                      : service}
                  </Text>
                ) : null}

                <Pressable
                  style={styles.selectedServiceInput}
                  onPress={() => setServiceMenuOpen(!serviceMenuOpen)}
                >
                  <Text
                    style={
                      service
                        ? styles.typedInputText
                        : styles.placeholderServiceText
                    }
                  >
                    {service || "SERVICE NEEDED"}
                  </Text>
                </Pressable>

                {service === "OTHER" && (
                  <TextInput
                    placeholder="SPECIFY SERVICE NEEDED"
                    placeholderTextColor="#6f90ba"
                    style={styles.input}
                    value={customService}
                    onChangeText={setCustomService}
                    autoFocus={true}
                  />
                )}

                <TextInput
                  placeholder="PHONE NUMBER"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />

                <TextInput
                  placeholder="EMAIL ADDRESS"
                  placeholderTextColor="#6f90ba"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TextInput
                  placeholder="DESCRIBE THE WORK NEEDED"
                  placeholderTextColor="#6f90ba"
                  style={styles.messageInput}
                  value={details}
                  onChangeText={setDetails}
                  multiline={true}
                  blurOnSubmit={true}
                  returnKeyType="done"
                />

                <Pressable
                  style={styles.submitButton}
                  onPress={async () => {
                    if (!name) {
                      alert("Please enter your name.");
                      return;
                    }
                    if (!year || !make || !model) {
                      alert("Please enter your complete vehicle information.");
                      return;
                    }

                    const finalService =
                      service === "OTHER" ? `OTHER: ${customService}` : service;

                    try {
                      // Standard insertion (This works perfectly on mobile AND web browsers automatically)
                      const { error } = await supabase
                        .from("estimate_requests")
                        .insert({
                          name,
                          year,
                          make,
                          model,
                          service: finalService,
                          phone,
                          email,
                          details,
                          submitted_at: new Date().toISOString(),
                        });

                      if (error) throw error;

                      setSubmittedName(name);
                      setSubmitted(true);
                    } catch (error: any) {
                      console.error(error);

                      // Web browsers handle native alerts perfectly, but you can also log them cleanly:
                      alert(
                        "Submission failed. Please check your connection and try again.",
                      );
                    }
                  }}
                >
                  <Text style={styles.submitButtonText}>SUBMIT REQUEST</Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Modal
        visible={serviceMenuOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setServiceMenuOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setServiceMenuOpen(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.dropdownModalContainer}>
              <View style={styles.dragIndicator} />
              <ScrollView
                style={styles.serviceDropdown}
                bounces={false}
                showsVerticalScrollIndicator={false}
              >
                {serviceOptions.map((option) => (
                  <Pressable
                    key={option}
                    style={styles.serviceOption}
                    onPress={() => {
                      setService(option);
                      setServiceMenuOpen(false);
                      if (option !== "OTHER") {
                        setCustomService("");
                      }
                    }}
                  >
                    <Text style={styles.serviceOptionText}>{option}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#000",
    // Centering alignment forces desktop viewports to stay centered
    alignItems: "center",
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: "#000",
    flexGrow: 1,
    width: "100%",
    ...Platform.select({
      web: {
        maxWidth: 500,
        alignSelf: "center",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    }),
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#b4b9be",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#6f90ba",
    textAlign: "center",
    marginBottom: 25,
  },
  selectedServiceLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#b4b9be",
    marginBottom: 5,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    color: "#f3f5f7",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 14,
  },
  selectedServiceInput: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  placeholderServiceText: {
    color: "#6f90ba",
    fontSize: 14,
    fontWeight: "600",
  },
  typedInputText: {
    color: "#f3f5f7",
    fontSize: 14,
    fontWeight: "600",
  },
  messageInput: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 10,
    color: "#f3f5f7",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 18,
  },
  submitButton: {
    backgroundColor: "#6f90ba",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 28,
  },
  submitButtonText: {
    color: "#0d1320",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  successMessage: {
    color: "#f3f5f7",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 30,
  },
  successSubtext: {
    color: "#a9b5c2",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 22,
  },
  homeButton: {
    backgroundColor: "#6f90ba",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 28,
    alignItems: "center",
  },
  homeButtonText: {
    color: "#0d1320",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownModalContainer: {
    backgroundColor: "#111",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
    maxHeight: "70%",
    ...Platform.select({
      web: {
        maxWidth: 500,
        alignSelf: "center",
      },
    }),
  },
  dragIndicator: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#6f90ba",
    alignSelf: "center",
    marginBottom: 10,
  },
  serviceDropdown: {
    maxHeight: 360,
  },
  serviceOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f2d3d",
  },
  serviceOptionText: {
    color: "#f3f5f7",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
