import { Box } from "@mui/material";

import { PageHeader, PageBody } from "../../components/create-profile";
import { useEffect, useState } from "react";

export const CreateProfile = () => {
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

  console.log("CreateProfile -> User:", user);

  return (
    <Box>
      {/* Page Header */}
      {user && (
        <>
          <PageHeader />

          {/* Page Body */}
          <PageBody user={user} />
        </>
      )}
    </Box>
  );
};
