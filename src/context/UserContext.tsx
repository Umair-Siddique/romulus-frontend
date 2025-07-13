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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("romulus-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const storedProfile = localStorage.getItem("romulus-user-profile");
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const [refetchUserProfile, setRefetchUserProfile] = useState();

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("romulus-user", JSON.stringify(user));
    }

    if (userProfile !== null) {
      localStorage.setItem("romulus-user-profile", JSON.stringify(userProfile));
    }
  }, [user, userProfile]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        userProfile,
        setUserProfile,
        refetchUserProfile,
        setRefetchUserProfile,
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
