/* 
Main will wrap all of our context providers. More information about contexts is documented in the context
*/

import { StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import { UserProvider } from "./contexts/UserContext";
import { ScreenProvider } from "./contexts/ScreenContext";

const Main = () => {
  // Disable font scaling
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  return (
    <UserProvider>
      <ScreenProvider>
        <Text>Main</Text>
      </ScreenProvider>
    </UserProvider>
  );
};

export default Main;

const styles = StyleSheet.create({});
