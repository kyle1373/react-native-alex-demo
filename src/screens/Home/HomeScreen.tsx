import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../services/AuthService";
import { COLORS } from "../../constants/constants";
import { displayError } from "../../helpers/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const { currentToken, setCurrentToken } = useContext(UserContext);
  const { setLoading } = useContext(ScreenContext);

  const onDeleteToken = async () => {
    setLoading(true);
    AsyncStorage.clear()
      .then(() => {
        setLoading(false);
        setCurrentToken(undefined);
        Alert.alert("Success", "Cleared token from device");
      })
      .catch((error: Error) => {
        setLoading(false);
        Alert.alert("Error", "Token has already been deleted");
      });
  };

  const onClickLogout = () => {
    setLoading(true);
    logout()
      .then(() => {
        setLoading(false);
        setCurrentToken(undefined);
      })
      .catch((error: Error) => {
        setLoading(false);
        displayError(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.title}>Login</Text>
      </View>
      <View
        style={{ marginHorizontal: 30, flex: 2, justifyContent: "flex-start" }}
      >
        <Text style={styles.description}>
          Hello {currentToken.User.Name}, you have logged in{" "}
          {currentToken.Logins.length} time
          {currentToken.Logins.length !== 1 && <Text>s</Text>}.
        </Text>
        <ScrollView
          style={styles.scrollviewContainer}
          contentContainerStyle={styles.scrollviewContent}
          showsVerticalScrollIndicator={true}
        >
          {currentToken && currentToken.Logins.map((date) => (
            <View style={styles.loginContainer} key={"Login " + date.toString()}>
              <Text style={styles.loginText}>Logged in at: {date.toString()}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          onPress={onClickLogout}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteToken}>
          <Text style={styles.deleteTokenText}>
            Delete storage token (demonstration)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollviewContainer: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
  scrollviewContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loginContainer: {
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: COLORS.login,
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: "center"
  },
  loginText: {
    fontSize: 17,
  },
  title: {
    fontSize: 40,
  },
  description: {
    fontSize: 26,
    marginTop: 20,
    marginBottom: 10,
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
