import { createContext, useState, useEffect } from "react";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase";

export const UserContext = createContext({
  currentUser: {
    displayName: "Suraj Prajapati",
    email: "suraj79572@gmail.com",
  },
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  console.log(currentUser);

  useEffect(() => {
    const unsubscribe = async () => {
      await onAuthStateChangedListener((user) => {
        if (user) createUserDocFromAuth(user);
        setCurrentUser(user);
      });
    };
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
