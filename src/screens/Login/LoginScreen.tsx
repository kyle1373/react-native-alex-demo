import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text>Name</Text>
            <TextInput
              style={styles.textInputContainer}
              onChangeText={setName}
            />
          </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  textInputContainer: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "white",
    paddingVertical: 10,
    marginTop: 20,
  },
});
