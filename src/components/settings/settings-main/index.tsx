import { Box } from "@mui/material";

import { Profile } from "./Profile";
import { Password } from "./Password";
import { Notification } from "./Notification";
import { useUserContext } from "#context";

export const SettingsMain = ({
  selectedSettings,
}: {
  selectedSettings: string;
}) => {
  const { userProfile } = useUserContext();

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {selectedSettings === "profile" && <Profile profileData={userProfile} />}
      {selectedSettings === "password" && <Password />}
      {selectedSettings === "notifications" && <Notification />}
    </Box>
  );
};
