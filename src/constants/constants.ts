export interface User {
  Name: string;
  Email: string;
}

export interface Token {
  User: User;
  Logins: [Date];
}

export const STORAGE = {
  TokenUser: "TokenUser",
  TokenLogins: "TokenLogins",
};

export const SCREENS = {
  Login: "LoginScreen",
  Home: "HomeScreen",
};

export const COLORS = {
    background: "#DDDDDD",
    button: "#063A75",
    login: "#6082A8"
}