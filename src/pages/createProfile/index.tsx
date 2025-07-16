import { Box } from "@mui/material";

import { PageHeader, PageBody } from "../../components/create-profile";
import { useUserContext } from "#context";

export const CreateProfile = () => {
  const userContext = useUserContext();
  const user = userContext?.user;

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
