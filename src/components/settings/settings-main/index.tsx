import { Box } from "@mui/material";

import { Profile } from "./Profile";
import { Password } from "./Password";
import { Notification } from "./Notification";

export const SettingsMain = ({
  selectedSettings,
}: {
  selectedSettings: string;
}) => {
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
      {selectedSettings === "profile" && <Profile />}
      {selectedSettings === "password" && <Password />}
      {selectedSettings === "notifications" && <Notification />}
    </Box>
  );
};
