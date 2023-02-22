import { Alert } from "react-native";

export function formatError(name: string, message: string): Error {
  const thrownError: Error = new Error(message);
  thrownError.name = name;
  return thrownError;
}

export function displayError(error: Error): boolean {
  Alert.alert(error.name, error.message);
  return true;
}
