import { useEffect, useState } from "react";

export const Home = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check if user is already set in context
    const storedUser = localStorage.getItem("romulus-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If not, reset user to null
      setUser(null);
    }
  }, []);

  console.log("Home -> User:", user);
  return <div>Hey, {user?.role}</div>;
};
