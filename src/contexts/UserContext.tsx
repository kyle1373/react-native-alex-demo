/* 
UserContext.tsx

This file contains the variables used to determine what user we really
are using a context hook in react. We have 3 parameters in our context
that are exposed to other components. currentToken contains the current
user and the number of logins. setCurrentUser sets that token, which can
be changed in other components for user login and logout. isUserContextLoaded
is set to true when the system finished retrieving the token from the device.
while false, ScreenContext will show a loading state, because we are still
trying to get the token from the device. This is triggered by a one-time
useEffect hook once the context is rendered.
*/
import React, { useState, useEffect, createContext } from "react";
import { Token, User } from "../constants/constants";
import { getToken } from "../services/AuthService";

type UserContextType = {
  currentToken: Token;
  setCurrentToken: React.Dispatch<React.SetStateAction<Token>>;
  isUserContextLoaded: boolean;
};

export const UserContext = createContext<UserContextType>({
  currentToken: undefined,
  setCurrentToken: undefined,
  isUserContextLoaded: false,
});

export const UserProvider = ({ children }) => {
  const [currentToken, setCurrentToken] = useState<Token>();
  const [isUserContextLoaded, setIsUserContextLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    getToken().then((token: Token) => {
      if (token.User) {
        setCurrentToken(token);
      }
      setIsUserContextLoaded(true);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ currentToken, setCurrentToken, isUserContextLoaded }}
    >
      {children}
    </UserContext.Provider>
  );
};
