import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE, Token, User } from "../constants/constants";
import { formatError } from "../helpers/helpers";

export async function login(username: string, email: string): Promise<Token> {
  // Dummy boolean if you ever wanted to check when a login fails
  const isFailure: boolean = false;

  if (isFailure) {
    // Because function is in a promise, the promise will fail and will go into the
    // catch block that this function got called in. Formaterror is just a helper
    // function to create an Error object.
    throw formatError("Login error", "Login failed. Please try again later.");
  }
}

export async function logout(): Promise<void> {}

async function writeToken(newToken: Token): Promise<Token> {
  console.log("Writing token " + newToken);
  await AsyncStorage.setItem(STORAGE.TokenUser, JSON.stringify(newToken.User));
  await AsyncStorage.setItem(
    STORAGE.TokenLogins,
    JSON.stringify(newToken.Logins)
  );
  return Promise.resolve(newToken);
}

async function getToken(): Promise<Token> {
  const pulledUser: User = JSON.parse(
    await AsyncStorage.getItem(STORAGE.TokenUser)
  );
  const pulledLogins: [Date] = JSON.parse(
    await AsyncStorage.getItem(STORAGE.TokenLogins)
  );

  const pulledToken: Token = {
    User: pulledUser,
    Logins: pulledLogins,
  };

  return pulledToken;
}

export async function deleteUserToken(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE.TokenUser);
}
