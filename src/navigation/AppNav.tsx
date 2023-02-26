import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from "../contexts/UserContext";
import { SCREENS } from "../constants/constants";
import LoginScreen from "../screens/Login/LoginScreen";
import HomeScreen from "../screens/Home/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  const { currentToken } = useContext(UserContext);
  return (
    <NavigationContainer>
      {currentToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  console.log("Loading AuthStack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.Login}
    >
      <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  console.log("Loading AppStack");
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREENS.Home}
    >
      <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
