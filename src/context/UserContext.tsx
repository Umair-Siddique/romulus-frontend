import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { UserContextType } from "#types";

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("romulus-user");
    const storedProfile = localStorage.getItem("romulus-user-profile");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
