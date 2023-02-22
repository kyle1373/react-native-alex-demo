/* 
This file contains the variables used to determine what user we really
are using a context hook in react.
*/
import React, { useState, useEffect, createContext } from "react";
import { Token, User } from "../constants/constants";

type UserContextType = {
  user: User;
  token: Token;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  token: undefined,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentToken, setCurrentToken] = useState<Token>();
  useEffect(() => {}, []);

  return (
    <UserContext.Provider
      value={{
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
