import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES, Token } from "../../constants/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { login } from "../../services/AuthService";
import { displayError } from "../../helpers/helpers";
import { UserContext } from "../../contexts/UserContext";
import { ScreenContext } from "../../contexts/ScreenContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleSection from "./components/TitleSection";
import TextFieldsSection from "./components/TextFieldsSection";
import LoginSection from "./components/LoginSection";

const LoginScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TitleSection/>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <TextFieldsSection setName={setName} setEmail={setEmail}/>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <LoginSection name={name} email={email}/>
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
  scrollviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: SIZES.width,
  }
});
