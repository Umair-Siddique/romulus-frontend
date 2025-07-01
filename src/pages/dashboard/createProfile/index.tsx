import { Box } from "@mui/material";

import { PageHeader, PageBody } from "../../../components/createProfile";
import { useUserContext } from "../../../context";

export const CreateProfile = () => {
  const { user } = useUserContext();
  console.log("User in CreateProfile:", user);

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
