import { router, useLocalSearchParams } from "expo-router";
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
} from "react-native";
import { useState } from "react";

export default function EstimateScreen() {
  const { service: selectedService } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [service, setService] = useState(
    typeof selectedService === "string" ? selectedService : "",
  );
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  return (
    // KeyboardAvoidingView automatically pushes inputs up when the virtual keyboard appears
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      {/* TouchableWithoutFeedback allows the user to dismiss the keyboard by tapping an empty space */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled" // Allows tapping the submit button while keyboard is open
        >
          {submitted ? (
            <View style={styles.successContainer}>
              <Text style={styles.successMessage}>
                ESTIMATE REQUEST RECEIVED{"\n"}
                THANK YOU, {submittedName}!
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

              {service && (
                <Text style={styles.selectedService}>
                  SELECTED SERVICE: {service}
                </Text>
              )}

              <TextInput
                placeholder="ENTER YOUR NAME"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <TextInput
                placeholder="VEHICLE YEAR"
                style={styles.input}
                value={year}
                onChangeText={setYear}
                keyboardType="numeric" // Better UX for typing years
              />

              <TextInput
                placeholder="VEHICLE MAKE"
                style={styles.input}
                value={make}
                onChangeText={setMake}
              />

              <TextInput
                placeholder="VEHICLE MODEL"
                style={styles.input}
                value={model}
                onChangeText={setModel}
              />

              <TextInput
                placeholder="SERVICE NEEDED"
                style={styles.selectedServiceInput}
                value={service}
                onChangeText={setService}
                editable={false}
              />

              <TextInput
                placeholder="PHONE NUMBER"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <TextInput
                placeholder="EMAIL ADDRESS"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none" // Stops keyboard from forcing uppercase on email
              />

              <TextInput
                placeholder="DESCRIBE THE WORK NEEDED"
                style={styles.messageInput}
                value={details}
                onChangeText={setDetails}
                multiline
              />

              <Pressable
                style={styles.submitButton}
                onPress={() => {
                  if (!name) {
                    alert("Please enter your name.");
                    return;
                  }

                  if (!year || !make || !model) {
                    alert("Please enter your complete vehicle information.");
                    return;
                  }

                  const estimateRequest = {
                    name,
                    year,
                    make,
                    model,
                    service,
                    phone,
                    email,
                    details,
                    submittedAt: new Date().toISOString(),
                  };

                  alert(
                    `ESTIMATE REQUEST RECEIVED\n\n` +
                      `Customer: ${estimateRequest.name}\n` +
                      `Vehicle: ${estimateRequest.year} ${estimateRequest.make} ${estimateRequest.model}\n` +
                      `Service: ${estimateRequest.service}`,
                  );

                  setSubmittedName(name);
                  setSubmitted(true);

                  setName("");
                  setYear("");
                  setMake("");
                  setModel("");
                  setService("");
                  setPhone("");
                  setEmail("");
                  setDetails("");
                }}
              >
                <Text style={styles.submitButtonText}>
                  SUBMIT ESTIMATE REQUEST
                </Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 80,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#6da1cb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 12,
    padding: 10,
  },
  messageInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 12,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    width: "100%",
    padding: 14,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#adc2ac",
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  successMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  homeButton: {
    width: "55%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#b3b9d0",
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  selectedService: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },

  selectedServiceInput: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    marginTop: 12,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#e6e6e6",
  },
});
