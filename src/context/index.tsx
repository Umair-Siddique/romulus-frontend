import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type UserContextType = {
  user: any;
  setUser: (user: any) => void;
  role: string;
  setRole: (role: string) => void;
  hasProfile: boolean | null;
  setHasProfile: (hasProfile: boolean | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState("");
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("romulus-user");
    const storedToken = localStorage.getItem("romulus-auth");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
        hasProfile,
        setHasProfile,
        accessToken,
        setAccessToken,
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
