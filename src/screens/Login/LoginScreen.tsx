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

const LoginScreen = () => {
  const { setCurrentToken } = useContext(UserContext);
  const { setLoading } = useContext(ScreenContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onDeleteToken = async () => {
    setLoading(true);
    AsyncStorage.clear()
      .then(() => {
        setLoading(false);
        Alert.alert("Success", "Cleared token from device");
      })
      .catch((error: Error) => {
        setLoading(false);
        Alert.alert("Error", "Token has already been deleted");
      });
  };

  const onClickLogin = () => {
    // Input checks. We can do more here (such as regex
    // expressions or external libraries). For now, we'll
    // just have empty checks.
    if (name === "" || email === "") {
      Alert.alert("Input error", "Make sure all fields are visible");
      return;
    }
    setLoading(true);
    login(name, email)
      .then((token: Token) => {
        setLoading(false);
        setCurrentToken(token);
      })
      .catch((error: Error) => {
        setLoading(false);
        displayError(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollviewContainer}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={styles.textInputTitle}>Name</Text>
          <TextInput style={styles.textInputContainer} onChangeText={setName} />
          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInputContainer}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={onClickLogin}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteToken}>
            <Text style={styles.deleteTokenText}>
              Delete storage token (demonstration)
            </Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 40,
  },
  textInputTitle: {
    fontSize: 26,
    paddingLeft: 10,
    marginTop: 20,
  },
  textInputContainer: {
    width: SIZES.width - 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 7,
    fontSize: 25,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: "center",
    backgroundColor: COLORS.button,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
  deleteTokenText: {
    marginTop: 10,
    textAlign: "center",
  },
});
